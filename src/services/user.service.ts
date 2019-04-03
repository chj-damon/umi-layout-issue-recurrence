import { CustomLocation } from '@/pages/constant';
import { UserStore } from '@/stores/user.store';
import api from '@/utils/api';
import auth from '@/utils/auth';
import user from '@/utils/user';
import { message } from 'antd';
import router from 'umi/router';
import { OAUTH_PARAMS, OAUTH_TYPES } from './index';

/** 因为登录的接口返回不规范，所以暂时没法定义，等后期再改 */
interface Result {
  code?: number;
  msg?: string;
  success?: boolean;
  result?: any;
  token_type?: any;
  access_token?: string;
  error_description?: string;
  data?: any;
}

export class UserService {
  userStore: UserStore;
  constructor() {
    this.userStore = UserStore.getInstance();
  }

  /** 注册 */
  async register(params: any) {
    const checkResult: Result = await this.validateSMSCode({
      mobile: params.mobile,
      code: params.smsCode,
      type: OAUTH_TYPES.REGISTER,
    });
    if (checkResult.success) {
      const registerResult: Result = await auth.post('/api/authz/users/register', {
        username: params.mobile,
        password: params.password,
        verification_code: params.smsCode,
        client_id: OAUTH_PARAMS.client_id,
        client_secret: OAUTH_PARAMS.client_secret,
        scope: OAUTH_PARAMS.scope,
        register_type: OAUTH_PARAMS.register_type,
      });
      await this.getUserInfo(registerResult.result.access_token);
      if (registerResult.success) {
        api.getWithToken('/api/user/addUser');
        this.userStore.error = undefined;
      } else {
        this.userStore.error = registerResult.msg;
      }
      router.push('/');
    } else {
      this.userStore.error = checkResult.msg;
    }
  }

  /** 登录 */
  async login(params: any, isSMSLogin: boolean, location: CustomLocation) {
    const url = isSMSLogin ? '/api/authz/users/smsLogin' : '/api/authz/oauth/token';
    const response: Result = await auth.post(url, {
      ...params,
      appVersion: '1.0',
      client_id: OAUTH_PARAMS.client_id,
      client_secret: OAUTH_PARAMS.client_secret,
      scope: OAUTH_PARAMS.scope,
      grant_type: isSMSLogin ? OAUTH_PARAMS.grant_type_sms : OAUTH_PARAMS.grant_type,
    });
    if (response.success) {
      this.userStore.error = '';
      await this.getUserInfo(response.result.access_token);
      await this.getResource();
      const { query } = location;
      if (query.redirectUrl) {
        router.push(query.redirectUrl);
      } else {
        router.push('/');
      }
    } else {
      this.userStore.error = response.msg || '用户名或密码错误';
    }
  }

  /**获取个人信息 */
  async getUserInfo(accessToken: string) {
    const response: Result = await auth.get('/api/resource/rs/tokenOauth', {
      access_token: accessToken,
      requestClientId: OAUTH_PARAMS.client_id,
    });
    if (response.success) {
      user.saveToken(accessToken);
      const { username, nickName, avatar } = response.result;
      user.saveUserInfo(username, nickName, avatar);
    } else {
      this.userStore.error = response.msg;
    }
  }

  /** 发送验证码 */
  async sendSMSCode(params: any) {
    const result = await auth.post('/api/authz/sms/send', params);
    if (result.success) {
      this.userStore.error = '';
    } else {
      this.userStore.error = result.msg;
    }
    return result;
  }

  /** 检验验证码 */
  async validateSMSCode(params: any) {
    const result = await auth.post('/api/authz/sms/verify', params);
    if (!result.success) {
      this.userStore.error = result.msg;
    } else {
      this.userStore.error = '';
    }
    return result;
  }

  /** 重置密码 */
  async resetPassword(params: any) {
    const checkResult: Result = await this.validateSMSCode({
      mobile: params.mobile,
      code: params.code,
      type: OAUTH_TYPES.FORGETPWD,
    });
    if (checkResult.success) {
      const resetResult: Result = await auth.post('/api/authz/users/resetPassword', {
        username: params.mobile,
        newPassword: params.newPassword,
        verificationCode: params.code,
        clientId: OAUTH_PARAMS.client_id,
      });
      if (resetResult.success) {
        router.push('/user/login');
        message.success('重置密码成功');
      } else {
        this.userStore.error = resetResult.msg;
      }
    } else {
      this.userStore.error = checkResult.msg;
    }
  }

  /* 获取用户资源权限 */
  getResource = async () => {
    const result: Result = await auth.getResource('/api/resource/user/list', {
      clientKey: 'magic-rent',
    });
    if (result.success) {
      user.setResource(result.data);
    } else {
      message.error('获取用户资源权限失败');
    }
  };

  /** 修改基本资料 */
  updateAccountInfo = async (params: any) => {
    const result = await api.postWithToken('/api/userInfo/editUserInfo', params);
    if (result.success) {
      message.success('基本资料修改成功');
    } else {
      message.error(result.message);
    }
  };

  /** 修改密码 */
  changePassword = async (params: any) => {
    const result = await auth.post('/api/resource/user/updatePassword', params, {
      access_token: user.getToken(),
    });
    if (result.success) {
      message.success('密码修改成功');
    } else {
      message.error(result.message);
    }
  };
}
