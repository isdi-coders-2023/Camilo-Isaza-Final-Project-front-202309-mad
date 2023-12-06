import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../slices/users.slice';
import { loginThunk, loginTokenThunk } from '../slices/users.thunks';
import { RepoUsers } from '../services/users/repoUsers';
import { LoginUser } from '../model/user';
import { Storage } from '../services/storage';
import * as ac from '../slices/users.slice';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new RepoUsers();
  const userStore = new Storage<{ token: string }>('user');

  const makeLogOut = () => {
    dispatch(ac.logout());
  };

  const register = (newUser: FormData) => {
    repo.createUser(newUser);
  };

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const loginWithToken = (token: string) => {
    dispatch(loginTokenThunk({ token, repo }));
  };

  const logoutUser = () => {
    dispatch(logout());
    userStore.remove;
  };

  return {
    register,
    login,
    loginWithToken,
    logoutUser,
    makeLogOut,
  };
}
