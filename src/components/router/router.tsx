import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('../../pages/home/homePage'));
const Helmets = lazy(() => import('../../pages/helmets_page/helmets_page'));
const ErrorMsg = lazy(() => import('../../pages/error_page/errorpage'));
const EditHelmet = lazy(
  () => import('../../pages/edit_formPage/edit_formPage')
);
const UserLogin = lazy(() => import('../../pages/login_user/login_user'));
const UserRegister = lazy(
  () => import('../../pages/register_user/register_user')
);
const Details = lazy(() => import('../../pages/details_page/details_page'));

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/helmets" element={<Helmets></Helmets>}></Route>
          <Route
            path="/helmet-edit-form/:id"
            element={<EditHelmet></EditHelmet>}
          ></Route>
          <Route
            path="/helmet-create-form"
            element={<EditHelmet></EditHelmet>}
          ></Route>
          <Route path="/user-login" element={<UserLogin></UserLogin>}></Route>
          <Route
            path="/user-register"
            element={<UserRegister></UserRegister>}
          ></Route>
          <Route path="/details-page/:id" element={<Details></Details>}></Route>
          <Route path="/*" element={<ErrorMsg></ErrorMsg>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
