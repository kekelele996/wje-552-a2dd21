import { Button, Table, Tabs } from 'antd';
import { useEffect } from 'react';
import { CalendarView } from '../components/common/CalendarView';
import { EmptyState } from '../components/common/EmptyState';
import { StatusBadge } from '../components/common/StatusBadge';
import { PlanStatus, PlanStatusLabel } from '../constants/enums';
import { useTrainingStore } from '../stores/trainingStore';

export const Training = () => {
  const { plans, fetchPlans, activate } = useTrainingStore();
  useEffect(() => { fetchPlans(); }, [fetchPlans]);
  const items = Object.values(PlanStatus).map((status) => ({
    key: status,
    label: PlanStatusLabel[status],
    children: plans.filter((plan) => plan.status === status).length ? (
      <div className="plan-grid">
        {plans.filter((plan) => plan.status === status).map((plan) => <section className="plan-card" key={plan.id}>
          <StatusBadge value={plan.status} /><h3>{plan.name}</h3><p>{plan.description}</p>
          <strong>{plan.type} · {plan.days.length} 个训练日</strong><span>{plan.startDate} - {plan.endDate}</span>
          {plan.status !== PlanStatus.ACTIVE && <Button onClick={() => activate(plan.id)}>启动</Button>}
        </section>)}
      </div>
    ) : <EmptyState title="暂无计划" description="可通过 API 创建计划，草稿和暂停状态支持编辑训练日与动作。" />,
  }));
  return (
    <div className="page">
      <header className="page-head"><h2>训练计划</h2><span>按状态分组、月历预览、动作表编辑链路</span></header>
      <Tabs items={items} />
      <section className="panel"><h3>训练日历</h3><CalendarView events={plans.flatMap((plan) => plan.days.map((day) => ({ date: plan.startDate, label: day.title, color: day.completed ? 'green' : 'gray' })))} /></section>
      <section className="panel"><h3>动作库编辑表</h3><Table pagination={false} dataSource={plans.flatMap((plan) => plan.days.flatMap((day) => day.exercises))} rowKey="id" columns={[{ title: '动作', render: (_, row: any) => row.exercise?.name }, { title: '组数', dataIndex: 'sets' }, { title: '次数', dataIndex: 'reps' }, { title: '重量', dataIndex: 'weight' }, { title: '休息秒', dataIndex: 'restSeconds' }]} /></section>
    </div>
  );
};
