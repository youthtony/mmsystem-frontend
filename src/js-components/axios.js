// axios.js
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // 替换为IP地址

const instance = axios.create({
    baseURL,
    timeout: 10000, // 设置超时时间
    headers: {
        'Content-Type': 'application/json',
        // 你可以在这里添加其他默认的请求头
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 在响应数据之前做一些处理
        return response;
    },
    (error) => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);

export default instance;
