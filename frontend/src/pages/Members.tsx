import { Button, Input, Select, Table } from 'antd';
import { useEffect } from 'react';
import { StatusBadge } from '../components/common/StatusBadge';
import { MemberLevel } from '../constants/enums';
import { useMemberStore } from '../stores/memberStore';

export const Members = () => {
  const { members, rules, fetchMembers } = useMemberStore();
  useEffect(() => { fetchMembers(); }, [fetchMembers]);
  return (
    <div className="page">
      <header className="page-head"><h2>会员管理</h2><span>搜索、筛选、积分规则与等级调整</span></header>
      <section className="toolbar"><Input.Search placeholder="搜索用户名" /><Select placeholder="等级" options={Object.values(MemberLevel).map((level) => ({ label: level, value: level }))} /><Button>筛选</Button></section>
      <Table rowKey="id" dataSource={members} columns={[
        { title: '用户名', render: (_, row: any) => `${row.user?.name} / ${row.user?.username}` },
        { title: '等级', dataIndex: 'level', render: (value) => <StatusBadge value={value} /> },
        { title: '积分', dataIndex: 'points' },
        { title: '到期日期', dataIndex: 'expiryDate' },
        { title: '状态', dataIndex: 'status', render: (value) => <StatusBadge value={value} /> },
        { title: '操作', render: () => <Button size="small">查看详情</Button> },
      ]} />
      <section className="panel"><h3>积分规则配置</h3><p>完成计划 +{rules.completePlan}，记录饮食 +{rules.recordDiet}，记录身体数据 +{rules.recordBodyMetric}。</p></section>
    </div>
  );
};
