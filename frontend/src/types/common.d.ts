import type { UserRole } from '../constants/enums';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface CurrentUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}
