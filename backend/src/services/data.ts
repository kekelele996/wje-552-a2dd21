import bcrypt from 'bcryptjs';
import { AuditModule, MealType, MemberLevel, PlanStatus, UserRole } from '../constants/enums.js';

const today = new Date();
const iso = (offset: number) => {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const db = {
  users: [
    { id: 'u-admin', username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), name: '管理员', role: UserRole.ADMIN },
    { id: 'u-coach', username: 'coach', passwordHash: bcrypt.hashSync('coach123', 8), name: '林教练', role: UserRole.COACH },
    { id: 'u-user1', username: 'user1', passwordHash: bcrypt.hashSync('user123', 8), name: '陈晨', role: UserRole.USER },
    { id: 'u-user2', username: 'user2', passwordHash: bcrypt.hashSync('user123', 8), name: '周舟', role: UserRole.USER },
  ],
  coachUsers: [{ coachId: 'u-coach', userId: 'u-user1' }],
  exercises: [
    '深蹲', '卧推', '硬拉', '俯卧撑', '引体向上', '划船', '肩推', '弓步蹲', '平板支撑', '波比跳',
    '跑步', '椭圆机', '动感单车', '瑜伽拉伸', '壶铃摆动', '卷腹', '腿举', '哑铃飞鸟', '山羊挺身', '战绳',
  ].map((name, index) => ({ id: `ex-${index + 1}`, name, category: index < 10 ? '力量' : '体能', muscleGroup: ['腿', '胸', '背', '核心'][index % 4] })),
  trainingPlans: [
    {
      id: 'plan-active',
      userId: 'u-user1',
      name: '12 周力量增长',
      type: 'STRENGTH',
      startDate: iso(-10),
      endDate: iso(74),
      status: PlanStatus.ACTIVE,
      description: '以复合动作为主，逐周增加训练容量。',
      days: [
        { id: 'day-1', weekday: today.getDay(), title: '下肢力量', completed: false, exercises: [
          { id: 'te-1', exerciseId: 'ex-1', sets: 5, reps: 5, weight: 90, restSeconds: 120, sortOrder: 1, completed: true },
          { id: 'te-2', exerciseId: 'ex-8', sets: 4, reps: 10, weight: 28, restSeconds: 90, sortOrder: 2, completed: false },
        ] },
        { id: 'day-2', weekday: (today.getDay() + 2) % 7, title: '上肢推拉', completed: false, exercises: [
          { id: 'te-3', exerciseId: 'ex-2', sets: 5, reps: 5, weight: 70, restSeconds: 120, sortOrder: 1, completed: false },
        ] },
      ],
    },
    { id: 'plan-draft', userId: 'u-user1', name: '夏季 HIIT', type: 'HIIT', startDate: iso(7), endDate: iso(35), status: PlanStatus.DRAFT, description: '短时高强度燃脂。', days: [
      { id: 'day-3', weekday: 2, title: '间歇循环', completed: false, exercises: [{ id: 'te-4', exerciseId: 'ex-10', sets: 6, reps: 12, restSeconds: 45, sortOrder: 1, completed: false }] },
    ] },
    { id: 'plan-completed', userId: 'u-user2', name: '心肺基础', type: 'CARDIO', startDate: iso(-45), endDate: iso(-15), status: PlanStatus.COMPLETED, description: '提升基础耐力。', days: [
      { id: 'day-4', weekday: 1, title: '慢跑', completed: true, exercises: [{ id: 'te-5', exerciseId: 'ex-11', sets: 1, reps: 40, restSeconds: 0, sortOrder: 1, completed: true }] },
    ] },
  ],
  foodLibrary: [
    '鸡胸肉', '鸡蛋', '燕麦', '米饭', '牛肉', '三文鱼', '西兰花', '香蕉', '酸奶', '牛奶',
    '豆腐', '红薯', '全麦面包', '虾仁', '苹果', '牛油果', '杏仁', '藜麦', '玉米', '菠菜',
    '番茄', '土豆', '意面', '猪里脊', '金枪鱼', '橙子', '花生酱', '黑豆', '蘑菇', '黄瓜',
  ].map((name, index) => ({ id: `food-${index + 1}`, name, calories: 55 + index * 9, protein: 2 + (index % 7) * 3, carbs: 5 + (index % 5) * 6, fat: 1 + (index % 4), unit: '100g' })),
  dietRecords: Array.from({ length: 30 }, (_, index) => ({
    id: `diet-${index + 1}`,
    userId: 'u-user1',
    mealType: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER, MealType.SNACK][index % 4],
    foodName: ['燕麦', '鸡胸肉', '米饭', '香蕉'][index % 4],
    quantity: 100 + (index % 3) * 50,
    calories: 260 + (index % 6) * 90,
    protein: 16 + (index % 5) * 4,
    carbs: 30 + (index % 4) * 8,
    fat: 6 + (index % 3) * 2,
    recordDate: iso(-index),
  })),
  bodyMetrics: Array.from({ length: 30 }, (_, index) => {
    const weight = 78 - index * 0.08;
    const height = 178;
    return { id: `bm-${index + 1}`, userId: 'u-user1', weight: Number(weight.toFixed(1)), bodyFat: Number((19 - index * 0.05).toFixed(1)), height, muscleMass: Number((35 + index * 0.03).toFixed(1)), bmi: Number((weight / ((height / 100) ** 2)).toFixed(1)), recordDate: iso(-29 + index) };
  }),
  bodyGoals: [{ userId: 'u-user1', targetWeight: 74, targetBodyFat: 15 }],
  members: [
    { id: 'm-admin', userId: 'u-admin', level: MemberLevel.PLATINUM, points: 22000, expiryDate: iso(365), status: 'ACTIVE' },
    { id: 'm-coach', userId: 'u-coach', level: MemberLevel.GOLD, points: 8200, expiryDate: iso(220), status: 'ACTIVE' },
    { id: 'm-user1', userId: 'u-user1', level: MemberLevel.SILVER, points: 1860, expiryDate: iso(120), status: 'ACTIVE' },
    { id: 'm-user2', userId: 'u-user2', level: MemberLevel.BASIC, points: 450, expiryDate: iso(-5), status: 'EXPIRED' },
  ],
  pointsRules: { completePlan: 50, recordDiet: 10, recordBodyMetric: 20 },
  auditLogs: [] as Array<{ id: string; userId: string; action: string; module: AuditModule; targetId?: string; detail?: unknown; ip?: string; createdAt: string }>,
};

export const visibleUserIds = (requestUser: { id: string; role: UserRole }) => {
  if (requestUser.role === UserRole.ADMIN) return db.users.map((user) => user.id);
  if (requestUser.role === UserRole.COACH) return [requestUser.id, ...db.coachUsers.filter((row) => row.coachId === requestUser.id).map((row) => row.userId)];
  return [requestUser.id];
};
