import { useEffect, useState } from 'react';
import './list.scss';
import { useHelmets } from '../../hooks/useHelmets';
import { Helmet } from '../../model/helmet';
import { Card } from '../card/card';
import { useUsers } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { helmetCategory } from '../../types/helmetCategory';

export function List() {
  const { loadHelmets, helmets, classifyHelmets } = useHelmets();
  const [helmetsClasifications, setHelmetsClassifications] = useState<
    helmetCategory[]
  >([]);
  const { token } = useSelector((state: RootState) => state.usersState);
  const { makeLogOut } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await loadHelmets();
    };

    fetchData();
  }, [loadHelmets]);

  useEffect(() => {
    const classify = async () => {
      const classifications = await classifyHelmets(helmets);
      setHelmetsClassifications(classifications);
    };

    classify();
  }, [helmets]);

  const handleLogOut = () => {
    makeLogOut();
    navigate('/home');
  };

  return (
    <>
      {helmetsClasifications.map((category) =>
        category.helmets.length > 0 ? (
          <div key={category.category} className="category-list">
            <p>{category.category}</p>
            <ul className="halmets-list">
              {category.helmets.map((item: Helmet) => (
                <Card helmet={item} key={item.id}></Card>
              ))}
            </ul>
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
    </>
  );
}
