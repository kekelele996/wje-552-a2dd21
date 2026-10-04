import { PrismaClient, MealType, MemberLevel, PlanStatus, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), name: '管理员', role: UserRole.ADMIN },
  });

  await prisma.member.upsert({
    where: { userId: admin.id },
    update: {},
    create: { userId: admin.id, level: MemberLevel.PLATINUM, points: 22000, expiryDate: new Date(Date.now() + 365 * 86400000) },
  });

  const foods = ['鸡胸肉', '鸡蛋', '燕麦', '米饭', '牛肉', '三文鱼', '西兰花', '香蕉', '酸奶', '牛奶', '豆腐', '红薯', '全麦面包', '虾仁', '苹果', '牛油果', '杏仁', '藜麦', '玉米', '菠菜', '番茄', '土豆', '意面', '猪里脊', '金枪鱼', '橙子', '花生酱', '黑豆', '蘑菇', '黄瓜'];
  for (const [index, name] of foods.entries()) {
    await prisma.foodLibrary.upsert({ where: { name }, update: {}, create: { name, calories: 60 + index * 8, protein: 3 + index % 8, carbs: 8 + index % 12, fat: 1 + index % 5 } });
  }

  const exerciseNames = ['深蹲', '卧推', '硬拉', '俯卧撑', '引体向上', '划船', '肩推', '弓步蹲', '平板支撑', '波比跳', '跑步', '椭圆机', '动感单车', '瑜伽拉伸', '壶铃摆动', '卷腹', '腿举', '哑铃飞鸟', '山羊挺身', '战绳'];
  for (const name of exerciseNames) {
    await prisma.exercise.create({ data: { name, category: '基础动作', muscleGroup: '全身' } });
  }

  await prisma.trainingPlan.create({
    data: {
      userId: admin.id,
      name: '管理员示例计划',
      type: 'STRENGTH',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400000),
      status: PlanStatus.DRAFT,
      days: { create: [{ weekday: 1, title: '力量日', exercises: { create: [] } }] },
    },
  });

  await prisma.dietRecord.create({ data: { userId: admin.id, mealType: MealType.BREAKFAST, foodName: '燕麦', quantity: 100, calories: 360, protein: 12, carbs: 60, fat: 6, recordDate: new Date() } });
  await prisma.bodyMetric.create({ data: { userId: admin.id, weight: 76, bodyFat: 18, height: 178, muscleMass: 35, bmi: 24, recordDate: new Date() } });
}

main().finally(() => prisma.$disconnect());
