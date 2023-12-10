import { useCallback, useMemo } from 'react';
import { RepoHelmets } from '../services/helmets/repoHelmets';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHelmetThunk,
  updateHelmetThunk,
  createHelmetThunk,
  deletHelmetThunk,
} from '../slices/helmets/helmetsThunks';
import { AppDispatch, RootState } from '../store/store';
import { Helmet } from '../model/helmet';
import { Category, helmetCategory } from '../types/helmetCategory';

export function useHelmets() {
  const dispatch = useDispatch<AppDispatch>();
  const { helmets, helmetsStateOption } = useSelector(
    (state: RootState) => state.helmetsState
  );
  const { token } = useSelector((state: RootState) => state.usersState);
  const repo = useMemo(() => new RepoHelmets(token), []);

  const loadHelmets = useCallback(async () => {
    try {
      dispatch(loadHelmetThunk(repo));
    } catch (error) {}
  }, [repo]);

  const createHelmet = async (newHelmet: FormData) => {
    try {
      dispatch(
        createHelmetThunk({
          repo,
          newHelmet,
        })
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateHelmet = async (id: Helmet['id'], helmet: FormData) => {
    try {
      dispatch(
        updateHelmetThunk({
          id,
          repo,
          updatedHelmet: helmet,
        })
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteHelmet = async (id: Helmet['id']) => {
    try {
      dispatch(
        deletHelmetThunk({
          id,
          repo,
        })
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const classifyHelmets = async (
    helmetsList: Helmet[]
  ): Promise<helmetCategory[]> => {
    const helmetsDictionary: { [key in Category]: Helmet[] } = {
      SK2: [],
      SK3: [],
      SK4: [],
      SK5: [],
      SK6: [],
      SK7: [],
      SK8: [],
      SK9: [],
      SK10: [],
    };

    helmetsList.forEach((helmet) => {
      const category: Category = helmet.category as Category;
      if (!helmetsDictionary[category]) {
        helmetsDictionary[category] = [];
      }

      helmetsDictionary[category].push(helmet);
    });

    const result: helmetCategory[] = Object.entries(helmetsDictionary).map(
      ([category, helmets]) => ({
        category: category as Category,
        helmets,
      })
    );

    return result;
  };

  return {
    loadHelmets,
    updateHelmet,
    createHelmet,
    deleteHelmet,
    helmets,
    helmetsStateOption,
    classifyHelmets,
  };
}
