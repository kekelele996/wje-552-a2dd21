export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export const MealTypeLabel: Record<MealType, string> = {
  [MealType.BREAKFAST]: '早餐',
  [MealType.LUNCH]: '午餐',
  [MealType.DINNER]: '晚餐',
  [MealType.SNACK]: '加餐',
};

export enum PlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export const PlanStatusLabel: Record<PlanStatus, string> = {
  [PlanStatus.DRAFT]: '草稿',
  [PlanStatus.ACTIVE]: '进行中',
  [PlanStatus.PAUSED]: '已暂停',
  [PlanStatus.COMPLETED]: '已完成',
  [PlanStatus.ARCHIVED]: '已归档',
};

export enum MemberLevel {
  BASIC = 'BASIC',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export const MemberLevelLabel: Record<MemberLevel, string> = {
  [MemberLevel.BASIC]: '基础会员',
  [MemberLevel.SILVER]: '银卡会员',
  [MemberLevel.GOLD]: '金卡会员',
  [MemberLevel.PLATINUM]: '铂金会员',
};

export const MemberLevelPoints: Record<MemberLevel, number> = {
  [MemberLevel.BASIC]: 0,
  [MemberLevel.SILVER]: 1000,
  [MemberLevel.GOLD]: 5000,
  [MemberLevel.PLATINUM]: 20000,
};

export enum UserRole {
  USER = 'USER',
  COACH = 'COACH',
  ADMIN = 'ADMIN',
}

export enum AuditModule {
  TRAINING = 'TRAINING',
  DIET = 'DIET',
  BODY = 'BODY',
  MEMBER = 'MEMBER',
}
