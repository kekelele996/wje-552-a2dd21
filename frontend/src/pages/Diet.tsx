import { Button, DatePicker, Progress, Segmented } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CalendarView } from '../components/common/CalendarView';
import { MetricCard } from '../components/common/MetricCard';
import { MealType, MealTypeLabel } from '../constants/enums';
import { useDietStore } from '../stores/dietStore';

export const Diet = () => {
  const { date, records, foodLibrary, totals, setDate, fetchRecords, quickAdd } = useDietStore();
  const [meal, setMeal] = useState(MealType.BREAKFAST);
  useEffect(() => { fetchRecords(); }, [date, fetchRecords]);
  return (
    <div className="page">
      <header className="page-head"><h2>饮食日记</h2><DatePicker value={dayjs(date)} onChange={(value) => value && setDate(value.format('YYYY-MM-DD'))} /></header>
      <div className="metric-row">
        <MetricCard title="总热量" value={totals.calories} unit="kcal" trend="flat" trendValue="目标 2100" />
        <MetricCard title="蛋白质" value={totals.protein} unit="g" trend="up" trendValue="肌肉修复" />
        <MetricCard title="碳水" value={totals.carbs} unit="g" trend="flat" trendValue="训练供能" />
        <MetricCard title="脂肪" value={totals.fat} unit="g" trend="down" trendValue="控制摄入" />
      </div>
      <section className="panel"><h3>热量目标</h3><Progress percent={Math.min(100, Math.round((totals.calories / 2100) * 100))} /></section>
      <div className="two-col">
        <section><h3>餐次记录</h3>{Object.values(MealType).map((type) => <div className="meal" key={type}><b>{MealTypeLabel[type]}</b>{records.filter((record) => record.mealType === type).map((record) => <p key={record.id}>{record.foodName} · {record.quantity}g · {record.calories}kcal</p>)}</div>)}</section>
        <section><h3>添加食物</h3><Segmented options={Object.values(MealType).map((type) => ({ label: MealTypeLabel[type], value: type }))} value={meal} onChange={(value) => setMeal(value as MealType)} />{foodLibrary.slice(0, 8).map((food) => <p className="food-row" key={food.id}>{food.name}<Button onClick={() => quickAdd(food, meal)}>添加</Button></p>)}</section>
      </div>
      <section className="panel"><h3>营养日历</h3><CalendarView selectedDate={date} events={records.map((record) => ({ date: record.recordDate, label: `${record.calories}kcal`, color: record.calories > 700 ? 'red' : 'green' }))} onDateClick={setDate} /></section>
    </div>
  );
};
