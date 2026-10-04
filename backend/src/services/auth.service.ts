import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { MemberLevel, UserRole } from '../constants/enums.js';
import { AppError } from '../utils/response.js';
import { db } from './data.js';

const publicUser = (user: (typeof db.users)[number]) => ({ id: user.id, username: user.username, name: user.name, role: user.role });

export const authService = {
  login(username: string, password: string) {
    const user = db.users.find((item) => item.username === username);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) throw new AppError(401, 'UNAUTHORIZED', '用户名或密码错误');
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });
    return { token, user: publicUser(user) };
  },
  register(input: { username: string; password: string; name: string }) {
    if (db.users.some((user) => user.username === input.username)) throw new AppError(409, 'CONFLICT', '该记录已存在');
    const user = { id: randomUUID(), username: input.username, passwordHash: bcrypt.hashSync(input.password, 8), name: input.name, role: UserRole.USER };
    db.users.push(user);
    db.members.push({ id: randomUUID(), userId: user.id, level: MemberLevel.BASIC, points: 0, expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10), status: 'ACTIVE' });
    return this.login(input.username, input.password);
  },
  me(userId: string) {
    const user = db.users.find((item) => item.id === userId);
    if (!user) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    return publicUser(user);
  },
};
