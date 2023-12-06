import { LoginUser } from '../model/user';
import { RepoUsers } from '../services/users/repoUsers';
import { Storage } from '../services/storage';
import { store } from '../store/store';
import { loginThunk, loginTokenThunk } from './users.thunks';

describe('Given...', () => {
  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as RepoUsers,
      userStore: {
        set: jest.fn(),
      } as unknown as Storage<{
        token: string;
      }>,
    };

    test('Then it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await store.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalled();
      data.repo.login;
    });
    test('Then it should ...', async () => {
      const data = { ...sharedData, token: '' };
      await store.dispatch(loginTokenThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalled();
      data.repo.login;
    });
  });
});
