import { Tag } from 'antd';
import { MemberLevel, MemberLevelLabel, PlanStatus, PlanStatusLabel } from '../../constants/enums';

export const StatusBadge = ({ value }: { value: string }) => {
  const label = (PlanStatusLabel as Record<string, string>)[value] ?? (MemberLevelLabel as Record<string, string>)[value] ?? value;
  const color = value === PlanStatus.ACTIVE || value === MemberLevel.PLATINUM ? 'green' : value === PlanStatus.DRAFT ? 'gold' : value === PlanStatus.COMPLETED ? 'blue' : 'default';
  return <Tag color={color}>{label}</Tag>;
};
