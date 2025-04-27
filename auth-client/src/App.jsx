import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register'; // Cambiado a minúsculas
import Login from './pages/login';       // Cambiado a minúsculas

function Dashboard() {
  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>Cerrar sesión</button>
    </div>
  );
}

// Protege rutas que requieran token
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
