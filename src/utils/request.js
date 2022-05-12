import axios from 'axios'
 
// 第一步，创建实例
const service = axios.create({
  timeout: 5000
});
 
// 第二步，请求拦截
service.interceptors.request.use(
  function (config) {
    // 请求发生前处理
    config.headers.Authorization = window.localStorage.getItem('token')
    // config.headers.authJWT = window.localStorage.getItem('token')
    return config;
  }, function (error) {
    // 请求错误处理
    return Promise.reject(error);
  }
);
 
// 第三步，响应阻拦
service.interceptors.response.use(
  function (response) {
    // 响应数据处理
    return response.data;
  }, function (error) {
  // 响应错误处理
  return Promise.reject(error);
  }
);
 
export default service;

