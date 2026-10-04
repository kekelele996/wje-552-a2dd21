import { Button, Form, InputNumber, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { MetricCard } from '../components/common/MetricCard';
import { TrendChart } from '../components/common/TrendChart';
import { useBodyMetric } from '../hooks/useBodyMetric';
import { useBodyMetricStore } from '../stores/bodyMetricStore';

export const BodyMetric = () => {
  const { metrics, goals, fetchMetrics, saveMetric } = useBodyMetricStore();
  const [range, setRange] = useState('1月');
  const { latest, delta, trend } = useBodyMetric(metrics);
  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);
  return (
    <div className="page">
      <header className="page-head"><h2>身体数据</h2><Segmented value={range} onChange={(value) => setRange(String(value))} options={['1周', '1月', '3月', '半年', '1年']} /></header>
      <div className="metric-row">
        <MetricCard title="当前体重" value={latest?.weight ?? 0} unit="kg" trend={trend as any} trendValue={`${delta}kg`} />
        <MetricCard title="体脂率" value={latest?.bodyFat ?? 0} unit="%" trend="down" trendValue={`目标 ${goals?.targetBodyFat ?? 0}%`} />
        <MetricCard title="肌肉量" value={latest?.muscleMass ?? 0} unit="kg" trend="up" trendValue="较上期" />
        <MetricCard title="BMI" value={latest?.bmi ?? 0} trend="flat" trendValue="自动计算" />
      </div>
      <div className="two-col">
        <TrendChart title={`体重趋势 ${range}`} data={metrics} xField="recordDate" yFields={['weight']} />
        <TrendChart title="体脂 / 肌肉 / BMI 叠加" data={metrics} xField="recordDate" yFields={['bodyFat', 'muscleMass', 'bmi']} />
      </div>
      <section className="panel form-panel"><h3>记录数据</h3><Form layout="inline" onFinish={(values) => saveMetric({ ...values, recordDate: new Date().toISOString().slice(0, 10) })}>
        <Form.Item name="weight" rules={[{ required: true }]}><InputNumber placeholder="体重 kg" /></Form.Item>
        <Form.Item name="bodyFat" rules={[{ required: true }]}><InputNumber placeholder="体脂 %" /></Form.Item>
        <Form.Item name="height" rules={[{ required: true }]}><InputNumber placeholder="身高 cm" /></Form.Item>
        <Form.Item name="muscleMass" rules={[{ required: true }]}><InputNumber placeholder="肌肉量 kg" /></Form.Item>
        <Button htmlType="submit" type="primary">保存</Button>
      </Form></section>
      <section className="panel"><h3>目标追踪与数据对比</h3><p>目标体重 {goals?.targetWeight}kg，目标体脂 {goals?.targetBodyFat}%。最近记录较上一期体重变化 {delta}kg。</p></section>
    </div>
  );
};
