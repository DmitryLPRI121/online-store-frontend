import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DetailedPage } from './pages/DetailedPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/Home" />} />
      <Route path='/Home' element={<HomePage />} />
      <Route path='/Products/:category/:id' element={<DetailedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
