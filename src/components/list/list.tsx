import { useEffect, useState, useRef } from 'react';
import './list.scss';
import { useHelmets } from '../../hooks/useHelmets';
import { Helmet } from '../../model/helmet';
import { Card } from '../card/card';
import { useUsers } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Category, helmetCategory } from '../../types/helmetCategory';

export function List() {
  const { helmets, classifyHelmets, loadInitialHelmets, loadNewHelmet, range } =
    useHelmets();
  const [helmetsClasifications, setHelmetsClassifications] = useState<
    helmetCategory[]
  >([]);
  const { token } = useSelector((state: RootState) => state.usersState);
  const { makeLogOut } = useUsers();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedCategories, setLoadedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const initialHelmets = await loadInitialHelmets();
      console.log({ initialHelmets });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const classify = async () => {
      const classifications = await classifyHelmets(helmets);
      setHelmetsClassifications(classifications);
      const loaded = loadCategory(classifications);
      setLoadedCategories(loaded);
    };
    classify();
  }, [helmets]);

  const loadCategory = (classifications: helmetCategory[]) => {
    const categoriesWithHelmets: Category[] = [];
    for (const classification of classifications) {
      if (classification.helmets && classification.helmets.length > 0) {
        categoriesWithHelmets.push(classification.category);
      }
    }
    return categoriesWithHelmets;
  };

  const getMoreCategories = async () => {
    console.log('hola getMoreCategories');
    try {
      console.log(loadedCategories);
      const newCategory = await loadNewHelmet(loadedCategories);
      console.log(newCategory);
      setLoadedCategories([...loadedCategories, newCategory!.category]);
      setHelmetsClassifications([...helmetsClasifications, newCategory!]);
    } catch (error) {
      console.error('Error fetching more helmets:', error);
    }
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight -
        (containerRef.current.scrollTop + containerRef.current.clientHeight) <
        100
    ) {
      getMoreCategories();
    }
  };

  const handleLogOut = () => {
    makeLogOut();
    navigate('/home');
  };
  return (
    <div
      data-testid="list-container"
      ref={containerRef}
      onScroll={handleScroll}
      className="scrollable-container"
    >
      {helmetsClasifications.map((category) =>
        category.helmets.length > 0 ? (
          <div key={category.category} className="category-list">
            <p className="category">{category.category}</p>
            <div className="helmets-list-container">
              <ul className="helmets-list">
                {category.helmets.filter((item: Helmet) => {
                  return (
                    item.price >= range.minValue && item.price <= range.maxValue
                  );
                }).length > 0 ? (
                  category.helmets
                    .filter((item: Helmet) => {
                      return (
                        item.price >= range.minValue &&
                        item.price <= range.maxValue
                      );
                    })
                    .map((item: Helmet) => (
                      <Card helmet={item} key={item.id}></Card>
                    ))
                ) : (
                  <div className="no-helmets">
                    <p>
                      {`No hay cascos disponibles para la categoría ${category.category} a este rango de precios`}
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        ) : (
          ''
        )
      )}

      <div>
        {token ? (
          <button
            className="logout-button"
            role="button"
            onClick={() => handleLogOut()}
          >
            Log Out
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
