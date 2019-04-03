import lscache from 'lscache';
import { cookieUtil } from './cookie-utils';

/**
 * 保存和操作用户登录信息
 * @class User
 */
class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  saveToken(accessToken: string) {
    cookieUtil.setItem('token', accessToken, { path: '/', maxAge: 3600 * 12 });
  }

  /**
   * 保存登录接口返回的姓名和手机号
   * @param name
   * @param phone
   */
  saveUserInfo(username: string, nickName: string, avatar: string) {
    cookieUtil.setItem('userInfo', JSON.stringify({ username, nickName, avatar }), {
      path: '/',
      maxAge: 3600 * 12,
    });
  }

  /**
   * 保存登录信息
   */
  setLoginInfo(userName: string, password: string) {
    cookieUtil.setItem('loginInfo', JSON.stringify({ userName, password }), {
      path: '/',
    });
  }

  /**
   * 获取登录信息
   */
  getLoginInfo() {
    if (cookieUtil.getItem('loginInfo')) {
      return JSON.parse(cookieUtil.getItem('loginInfo'));
    }
    return { username: '', password: '' };
  }

  /**
   *删除登录信息
   */
  removeLoginInfo() {
    cookieUtil.removeItem('loginInfo');
  }

  /**
   * 从cookie中获取姓名
   */
  getUserInfo() {
    const userInfo = cookieUtil.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : {};
  }

  /**
   * 判断用户是否登录
   *
   * @memberof User
   */
  isLogin() {
    return !!cookieUtil.getItem('token');
  }

  /** 获取token */
  getToken() {
    return cookieUtil.getItem('token');
  }
  /**
   * 用户退出登录
   *
   * @memberof User
   */
  logout() {
    lscache.remove('resource');
    cookieUtil.removeItem('timeout');
    cookieUtil.removeItem('loginInfo');
    cookieUtil.removeItem('checked');
    cookieUtil.removeItem('token');
    cookieUtil.removeItem('userInfo');
  }

  /* 保存用户资源权限 */
  setResource(resource: string[]) {
    lscache.set('resource', resource);
  }
}
export default new User();
