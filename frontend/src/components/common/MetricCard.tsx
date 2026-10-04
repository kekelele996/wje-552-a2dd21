import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  icon?: ReactNode;
}

export const MetricCard = ({ title, value, unit, trend = 'flat', trendValue, icon }: Props) => {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : ArrowRight;
  return (
    <section className="metric-card">
      <div className="metric-icon">{icon}</div>
      <span>{title}</span>
      <strong>{value}<small>{unit}</small></strong>
      {trendValue && <em className={`trend ${trend}`}><TrendIcon size={14} />{trendValue}</em>}
    </section>
  );
};
