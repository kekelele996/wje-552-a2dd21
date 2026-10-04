import type { UserRole } from '../constants/enums.js';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      audit?: {
        action: string;
        module: 'TRAINING' | 'DIET' | 'BODY' | 'MEMBER';
        targetId?: string;
        detail?: unknown;
      };
    }
  }
}
