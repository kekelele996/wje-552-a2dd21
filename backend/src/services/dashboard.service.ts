import { PlanStatus } from '../constants/enums.js';
import { db, visibleUserIds } from './data.js';

export const dashboardService = {
  summary(user: Express.Request['user']) {
    const ids = visibleUserIds(user!);
    const plan = db.trainingPlans.find((item) => ids.includes(item.userId) && item.status === PlanStatus.ACTIVE);
    const today = new Date().toISOString().slice(0, 10);
    const todaysExercises = plan?.days.find((day) => day.weekday === new Date().getDay())?.exercises ?? [];
    const dietStats = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      return {
        date: key,
        intake: db.dietRecords.filter((record) => ids.includes(record.userId) && record.recordDate === key).reduce((sum, record) => sum + record.calories, 0),
        burned: 380 + index * 35,
      };
    });
    const body = db.bodyMetrics.filter((record) => ids.includes(record.userId)).slice(-30);
    const member = db.members.find((item) => item.userId === user!.id);
    return {
      metrics: {
        trainingCompletion: todaysExercises.length ? Math.round((todaysExercises.filter((item) => item.completed).length / todaysExercises.length) * 100) : 0,
        weeklyAverageCalories: Math.round(dietStats.reduce((sum, day) => sum + day.intake, 0) / 7),
        latestWeight: body.at(-1)?.weight ?? 0,
        member: member ? { level: member.level, points: member.points } : null,
      },
      dietStats,
      weightTrend: body.map((record) => ({ date: record.recordDate, weight: record.weight, target: 74 })),
      todayTasks: todaysExercises.map((item) => ({ ...item, exercise: db.exercises.find((exercise) => exercise.id === item.exerciseId) })),
      weeklyDietSummary: dietStats.map((day) => ({ ...day, overTarget: day.intake > 2100 })),
      calendarEvents: plan?.days.map((day) => ({ date: today, label: day.title, color: day.completed ? 'green' : 'gray' })) ?? [],
    };
  },
};
