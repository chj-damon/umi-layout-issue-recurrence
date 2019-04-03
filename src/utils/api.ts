import service, { errorHandler } from './axiosService';
import user from './user';
import qs from 'qs';

export default {
  get: async function(url: string, params?: any) {
    try {
      const res = await service.get<Ajax.AjaxResponse>(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        {
          params,
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getWithToken: async function(url: string, params?: any) {
    try {
      const res = await service.get<Ajax.AjaxResponse>(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        {
          params,
          headers: { accessToken: user.getToken() },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  delWithToken: async function(url: string, params: any) {
    try {
      const res = await service.delete(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        {
          params,
          headers: { accessToken: user.getToken() },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  post: async function(url: string, data: any, params?: any) {
    // data添加到请求体body中
    try {
      const res = await service.post<Ajax.AjaxResponse>(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        qs.stringify(data),
        {
          params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  postWithToken: async function(url: string, data: any, params?: any) {
    // data添加到请求体body中
    try {
      const res = await service.post<Ajax.AjaxResponse>(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        qs.stringify(data),
        {
          params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accessToken: user.getToken(),
          },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  putWithToken: async function(url: string, data: any, params: any) {
    try {
      const res = await service.put<Ajax.AjaxResponse>(
        process.env.PROD ? process.env.SERVER + url.replace('/api', '') : url,
        data,
        {
          params,
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  upload: async function(url: string, formData: FormData) {
    // data 添加到请求体body中
    try {
      const res = await service.post<Ajax.AjaxResponse>(
        url + '?access_token=' + user.getToken(),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};
