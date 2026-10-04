import { CheckCircle2, Flame, Scale, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboardApi } from '../api/dashboard';
import { CalendarView } from '../components/common/CalendarView';
import { MetricCard } from '../components/common/MetricCard';
import { TrendChart } from '../components/common/TrendChart';

export const Dashboard = () => {
  const [summary, setSummary] = useState<any>();
  useEffect(() => { dashboardApi.summary().then(setSummary); }, []);
  if (!summary) return <div className="page"><h2>加载中</h2></div>;
  return (
    <div className="page">
      <header className="page-head"><h2>健身仪表盘</h2><span>今日任务、摄入、身体变化和会员等级</span></header>
      <div className="metric-row">
        <MetricCard title="今日训练完成率" value={summary.metrics.trainingCompletion} unit="%" trend="up" trendValue="动作进度" icon={<CheckCircle2 />} />
        <MetricCard title="本周热量均值" value={summary.metrics.weeklyAverageCalories} unit="kcal" trend="flat" trendValue="7日均值" icon={<Flame />} />
        <MetricCard title="最新体重" value={summary.metrics.latestWeight} unit="kg" trend="down" trendValue="接近目标" icon={<Scale />} />
        <MetricCard title="会员积分" value={summary.metrics.member?.points ?? 0} unit="分" trend="up" trendValue={summary.metrics.member?.level} icon={<Trophy />} />
      </div>
      <div className="two-col">
        <TrendChart title="本周热量摄入 vs 消耗" data={summary.dietStats} xField="date" yFields={['intake', 'burned']} />
        <TrendChart title="最近 30 天体重趋势" data={summary.weightTrend} xField="date" yFields={['weight', 'target']} />
      </div>
      <div className="two-col lower">
        <section><h3>今日训练任务</h3>{summary.todayTasks.map((task: any) => <p className="task" key={task.id}><span>{task.completed ? '已完成' : '待完成'}</span>{task.exercise?.name} · {task.sets}x{task.reps}</p>)}</section>
        <section><h3>本周饮食摘要</h3><CalendarView events={summary.weeklyDietSummary.map((day: any) => ({ date: day.date, label: `${day.intake}kcal`, color: day.overTarget ? 'red' : 'green' }))} /></section>
      </div>
    </div>
  );
};
