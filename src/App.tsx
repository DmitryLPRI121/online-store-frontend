import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { DetailedPage } from './pages/DetailedPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/Home" />} />
      <Route path='/Home' element={<HomePage />} />
      <Route path='/Catalog' element={<CatalogPage />} />
      <Route path='/Catalog/:category/:id' element={<DetailedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
