import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { DetailedPage } from './pages/DetailedPage';
import { NotFoundPage } from './pages/NotFoundPage';
<<<<<<< HEAD
import { CategoryPage } from './pages/CategoryPage';
=======
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import AdminPage from "./pages/AdminPage/AdminPage";
>>>>>>> 9d1eda8d9c7f5691c9620d28cdd08c0ff29681e8

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/Home" />} />
      <Route path='/Home' element={<HomePage />} />
      <Route path='/Catalog' element={<CatalogPage />} />
<<<<<<< HEAD
      <Route path='/Catalog/:category' element={<CategoryPage />} />
=======
      <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/Account' element={<AccountPage />} />
        <Route path='/AdminPage' element={<AdminPage />} />
      <Route path='/RegistrationPage' element={<RegistrationPage />} />
      <Route path='/CatalogPage' element={<CatalogPage />} />
>>>>>>> 9d1eda8d9c7f5691c9620d28cdd08c0ff29681e8
      <Route path='/Catalog/:category/:id' element={<DetailedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
