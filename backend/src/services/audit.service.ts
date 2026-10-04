import { randomUUID } from 'node:crypto';
import type { AuditModule } from '../constants/enums.js';
import { db } from './data.js';

export const auditService = {
  record(input: { userId: string; action: string; module: AuditModule | 'TRAINING' | 'DIET' | 'BODY' | 'MEMBER'; targetId?: string; detail?: unknown; ip?: string }) {
    db.auditLogs.unshift({ id: randomUUID(), createdAt: new Date().toISOString(), ...input, module: input.module as AuditModule });
  },
  listForUser(userId: string) {
    return db.auditLogs.filter((log) => log.userId === userId).slice(0, 20);
  },
};
