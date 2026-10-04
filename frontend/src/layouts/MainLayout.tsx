import { Activity, Apple, Dumbbell, Gauge, LogOut, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { UserRole } from '../constants/enums';
import { useAuthStore } from '../stores/authStore';

export const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const exit = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="shell">
      <aside>
        <h1>FitTracker Pro</h1>
        <p>{user?.name} · {user?.role}</p>
        <nav>
          <NavLink to="/dashboard"><Gauge size={18} />仪表盘</NavLink>
          <NavLink to="/training"><Dumbbell size={18} />训练计划</NavLink>
          <NavLink to="/diet"><Apple size={18} />饮食日记</NavLink>
          <NavLink to="/body"><Activity size={18} />身体数据</NavLink>
          {user?.role === UserRole.ADMIN && <NavLink to="/members"><Users size={18} />会员管理</NavLink>}
        </nav>
        <button className="logout" onClick={exit}><LogOut size={18} />退出</button>
      </aside>
      <main><Outlet /></main>
    </div>
  );
};
