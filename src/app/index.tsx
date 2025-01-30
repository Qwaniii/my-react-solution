import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Head, ModalsContainer } from 'react-solution';
import UsersPage from '../features/users/page'
import CountriesPage from '../features/country/page'
import '../style.less'
import AddCountry from '@src/features/country/containers/add-country';
import AddUser from '@src/features/users/containers/add-user';
import LayoutInfoUser from '@src/ui/layout/layout-info-user';
import DrawPage from '@src/features/canvas/page';

export const App = memo(() => {
  return (
    <>
      <Head>
        <html lang="ru" />
        <title>React Solution!</title>
        <meta name="description" content="React solution" />
      </Head>
      <Suspense fallback={<div>Подождите...</div>}>
        <Routes>
          {/* <Route path="/" index element={<CatalogPage/>} /> */}
          <Route path="/" index element={<UsersPage/>} />
          <Route path="users/:id" index element={<LayoutInfoUser/>} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
        <ModalsContainer />
      </Suspense>
    </>
  );
});
