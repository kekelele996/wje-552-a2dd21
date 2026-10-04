import { MemberLevel, MemberLevelPoints, UserRole } from '../constants/enums.js';
import { AppError } from '../utils/response.js';
import { db } from './data.js';

const withUser = (member: (typeof db.members)[number]) => ({ ...member, user: db.users.find((user) => user.id === member.userId) });

export const memberService = {
  list(user: Express.Request['user'], query: any) {
    if (user?.role !== UserRole.ADMIN) throw new AppError(403, 'FORBIDDEN', '无权限执行此操作');
    return db.members.map(withUser).filter((member) => (!query.level || member.level === query.level) && (!query.status || member.status === query.status) && (!query.q || member.user?.name.includes(query.q) || member.user?.username.includes(query.q)));
  },
  updateLevel(id: string, level: MemberLevel) {
    const member = db.members.find((item) => item.id === id);
    if (!member) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    member.level = level;
    member.points = Math.max(0, member.points - 100);
    return withUser(member);
  },
  updatePoints(id: string, points: number) {
    const member = db.members.find((item) => item.id === id);
    if (!member) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    member.points = Math.max(0, points);
    member.level = Object.entries(MemberLevelPoints).reverse().find(([, threshold]) => member.points >= threshold)?.[0] as MemberLevel;
    return withUser(member);
  },
  rules() {
    return db.pointsRules;
  },
  updateRules(input: any) {
    Object.assign(db.pointsRules, input);
    return db.pointsRules;
  },
};
