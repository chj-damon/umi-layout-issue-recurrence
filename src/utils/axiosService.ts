import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';

const config: AxiosRequestConfig = {
  baseURL: '/',
  // 请求后的数据处理
  transformResponse: [
    function(data: AxiosResponse) {
      return data;
    },
  ],
  // 查询对象序列化函数
  paramsSerializer: function(params: any) {
    return qs.stringify(params);
  },
  // 跨域是否带token
  withCredentials: false,
  responseType: 'json',
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: function(status: number) {
    return status >= 200 && status < 300;
  },
};

interface Item {
  url: string;
  cancel: () => void;
}
let pending: Array<Item> = [];
const CancelToken = axios.CancelToken;
const removePending = (config: AxiosRequestConfig) => {
  for (const p in pending) {
    if (pending.hasOwnProperty(p)) {
      const list = pending[p];
      if (list.url === config.url + '&request_type=' + config.method) {
        list.cancel();
        pending.splice(+p, 1);
      }
    }
  }
};
const service = axios.create(config);
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new CancelToken(c => {
      pending.push({
        url: config.url + '&request_type=' + config.method,
        cancel: c,
      });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  res => {
    removePending(res.config);
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;

export function errorHandler(error: AxiosError): Ajax.AjaxResponse {
  if (error.response) {
    const message: string = error.response.data ? error.response.data.message : '接口报错';
    return {
      success: false,
      message,
      code: 50000,
      data: null,
    };
  } else if (error.message) {
    if (error.message === 'Network Error') {
      return {
        success: false,
        code: 50000,
        data: null,
        message: '对不起，网络出现异常',
      };
    } else if (error.message.includes('timeout')) {
      return {
        success: false,
        code: 40400,
        data: null,
        message: '对不起，接口请求超时',
      };
    }
  }
  return {
    success: false,
    code: 40400,
    data: null,
    message: '',
  };
}
