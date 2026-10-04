import { UserRole } from '../constants/enums';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const auth = useAuthStore();
  const hasPermission = (permission: 'members' | 'coachRead' | 'ownData') => {
    if (!auth.user) return false;
    if (auth.user.role === UserRole.ADMIN) return true;
    if (permission === 'coachRead') return auth.user.role === UserRole.COACH;
    if (permission === 'ownData') return true;
    return false;
  };
  return { ...auth, hasPermission };
};
