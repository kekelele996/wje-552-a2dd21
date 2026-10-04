import { Button, Form, Input } from 'antd';
import { Dumbbell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <section>
        <Dumbbell size={36} />
        <h1>FitTracker Pro</h1>
        <p>训练、饮食、身体数据和会员运营集中管理。</p>
        <Form layout="vertical" initialValues={{ username: 'admin', password: 'admin123' }} onFinish={async (values) => { await login(values.username, values.password); navigate('/dashboard'); }}>
          <Form.Item label="账号" name="username"><Input /></Form.Item>
          <Form.Item label="密码" name="password"><Input.Password /></Form.Item>
          <Button htmlType="submit" type="primary" block>登录</Button>
        </Form>
        <p className="hint">验证账号：admin/admin123，coach/coach123，user1/user123。 <Link to="/register">注册</Link></p>
      </section>
    </div>
  );
};
