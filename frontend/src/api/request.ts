import axios from 'axios';
import { message } from 'antd';
import { storage } from '../utils/storage';

export const request = axios.create({ baseURL: '/api/v1', timeout: 10000 });

request.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.error?.message;
    if (status === 401) {
      storage.clear();
      if (location.pathname !== '/login') location.href = '/login';
    } else if (status === 403) message.error('无权限执行此操作');
    else if (status === 400 || status === 422) message.error(apiMessage ?? '请求参数错误');
    else if (status === 404) message.error('请求的资源不存在');
    else if (status === 500) message.error('服务器异常，请稍后重试');
    else if (error.code === 'ECONNABORTED') message.error('网络连接超时，请检查网络');
    else message.error(apiMessage ?? '请求失败');
    return Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, config?: Parameters<typeof request.get>[1]) => request.get<unknown, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: Parameters<typeof request.post>[2]) => request.post<unknown, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: Parameters<typeof request.put>[2]) => request.put<unknown, T>(url, data, config),
  delete: <T>(url: string, config?: Parameters<typeof request.delete>[1]) => request.delete<unknown, T>(url, config),
};
