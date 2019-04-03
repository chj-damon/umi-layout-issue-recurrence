import { observable } from 'mobx';

export class UserStore {
  private static userStore: UserStore;
  private constructor() {}

  public static getInstance(): UserStore {
    if (!UserStore.userStore) {
      UserStore.userStore = new UserStore();
    }
    return UserStore.userStore;
  }

  /**登录错误信息 */
  @observable
  error: string | undefined = undefined;

  /** 拥有的权限 */
  @observable
  resource: string[] = [];
}
