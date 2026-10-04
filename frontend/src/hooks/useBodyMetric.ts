import type { BodyMetric } from '../types/body';

export const useBodyMetric = (metrics: BodyMetric[]) => {
  const latest = metrics[metrics.length - 1];
  const previous = metrics[metrics.length - 2];
  const delta = latest && previous ? Number((latest.weight - previous.weight).toFixed(1)) : 0;
  return { latest, delta, trend: delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat' };
};
