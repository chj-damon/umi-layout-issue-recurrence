import service, { errorHandler } from './axiosService';
import qs from 'qs';
import user from './user';

export default {
  get: async function(url: string, params?: any) {
    try {
      const res = await service.get<Ajax.AjaxResponse>(
        process.env.AUTH_SERVER + url.replace('/api', ''),
        {
          params,
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getResource: async function(url: string, params?: any) {
    try {
      const res = await service.get<Ajax.AjaxResponse>(
        process.env.RESOURCE_SERVER + url.replace('/api', ''),
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
    try {
      const res = await service.post<Ajax.AjaxResponse>(
        process.env.AUTH_SERVER + url.replace('/api', ''),
        qs.stringify(data),
        {
          params,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return res.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};
