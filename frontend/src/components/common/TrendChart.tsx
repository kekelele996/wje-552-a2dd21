import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export const TrendChart = ({ data, xField, yFields, title }: { data: any[]; xField: string; yFields: string[]; title: string; timeRange?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      title: { text: title, left: 0, textStyle: { fontSize: 15, fontWeight: 700 } },
      tooltip: { trigger: 'axis' },
      grid: { left: 36, right: 14, top: 48, bottom: 30 },
      xAxis: { type: 'category', data: data.map((item) => item[xField]) },
      yAxis: { type: 'value' },
      series: yFields.map((field) => ({ name: field, type: 'line', smooth: true, areaStyle: field === yFields[0] ? { opacity: 0.08 } : undefined, data: data.map((item) => item[field]) })),
    });
    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data, title, xField, yFields]);
  return <div className="chart" ref={ref} />;
};
