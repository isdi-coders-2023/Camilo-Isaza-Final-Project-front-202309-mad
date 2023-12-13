import { createAsyncThunk } from '@reduxjs/toolkit';
import { RepoHelmets } from '../../services/helmets/repoHelmets';
import { Helmet } from '../../model/helmet';

export const loadHelmetThunk = createAsyncThunk<Helmet[], RepoHelmets>(
  'helmets/load',
  async (repo) => {
    const Helmets = await repo.getInitialHelmets();
    return Helmets;
  }
);

type Params = {
  repo: RepoHelmets;
  newHelmet: FormData;
};

export const createHelmetThunk = createAsyncThunk<Helmet, Params>(
  'helmets/create',
  async ({ repo, newHelmet }) => {
    const finalHelmet = await repo.createHelmet(newHelmet);
    return finalHelmet;
  }
);

export const updateHelmetThunk = createAsyncThunk<
  Helmet,
  {
    repo: RepoHelmets;
    id: Helmet['id'];
    updatedHelmet: FormData;
  }
>('helmets/update', async ({ repo, id, updatedHelmet }) => {
  const finalHelmet = await repo.updateHelmet(id, updatedHelmet);
  return finalHelmet;
});

export const deletHelmetThunk = createAsyncThunk<
  Helmet['id'],
  {
    repo: RepoHelmets;
    id: Helmet['id'];
  }
>('helmets/delete', async ({ repo, id }) => {
  await repo.deleteHelmet(id);
  return id;
});
