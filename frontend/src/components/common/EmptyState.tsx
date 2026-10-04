import { Button, Empty } from 'antd';
import type { ReactNode } from 'react';

export const EmptyState = ({ title, description, action }: { title: string; description?: string; action?: ReactNode }) => (
  <div className="empty-state">
    <Empty description={<><strong>{title}</strong><p>{description}</p></>}>{action && <Button type="primary">{action}</Button>}</Empty>
  </div>
);
