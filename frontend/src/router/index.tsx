import { Navigate, createBrowserRouter } from 'react-router-dom';
import { UserRole } from '../constants/enums';
import { MainLayout } from '../layouts/MainLayout';
import { BodyMetric } from '../pages/BodyMetric';
import { Dashboard } from '../pages/Dashboard';
import { Diet } from '../pages/Diet';
import { Login } from '../pages/Login';
import { Members } from '../pages/Members';
import { Register } from '../pages/Register';
import { Training } from '../pages/Training';
import { useAuthStore } from '../stores/authStore';

const Guard = ({ children, adminOnly = false }: { children: JSX.Element; adminOnly?: boolean }) => {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== UserRole.ADMIN) return <Navigate to="/dashboard" replace />;
  return children;
};

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <Guard><MainLayout /></Guard>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'training', element: <Training /> },
      { path: 'diet', element: <Diet /> },
      { path: 'body', element: <BodyMetric /> },
      { path: 'members', element: <Guard adminOnly><Members /></Guard> },
    ],
  },
]);
