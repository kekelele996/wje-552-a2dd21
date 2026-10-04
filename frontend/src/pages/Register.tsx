import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import { storage } from '../utils/storage';

export const Register = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore.setState;
  return (
    <div className="auth-page">
      <section>
        <h1>注册会员</h1>
        <Form layout="vertical" onFinish={async (values) => { const result = await authApi.register(values); storage.setToken(result.token); setUser({ token: result.token, user: result.user }); navigate('/dashboard'); }}>
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="账号" name="username" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, min: 6 }]}><Input.Password /></Form.Item>
          <Button htmlType="submit" type="primary" block>创建 BASIC 会员</Button>
        </Form>
        <p className="hint"><Link to="/login">返回登录</Link></p>
      </section>
    </div>
  );
};
