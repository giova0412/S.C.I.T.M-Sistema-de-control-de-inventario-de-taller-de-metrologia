import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Herramientas from './Herramientas';
import Reportes from './Reportes';
import Recup from './Recup';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/herramientas" element={<Herramientas />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path='/recovery' element={<Recup/>}/>
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
