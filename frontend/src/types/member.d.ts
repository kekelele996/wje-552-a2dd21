import type { MemberLevel } from '../constants/enums';

export interface Member {
  id: string;
  level: MemberLevel;
  points: number;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  user?: { username: string; name: string; role: string };
}
