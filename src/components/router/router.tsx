import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('../../pages/home/homePage'));
const ErrorMsg = lazy(() => import('../../pages/error_page/errorpage'));
const UserLogin = lazy(() => import('../../pages/login_user/login_user'));
const UserRegister = lazy(
  () => import('../../pages/register_user/register_user')
);

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/user-login" element={<UserLogin></UserLogin>}></Route>
          <Route
            path="/user-register"
            element={<UserRegister></UserRegister>}
          ></Route>
          <Route path="/*" element={<ErrorMsg></ErrorMsg>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
