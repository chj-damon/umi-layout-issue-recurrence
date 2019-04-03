import { UserService } from './user.service';

export const page = 1;
export const pageSize = 10;
export const total = 0;

export const OAUTH_PARAMS = {
  client_id: 'logistics',
  client_secret: 'L9ZUYKIM',
  scope: 'read',
  register_type: 'password',
  grant_type: 'password',
  grant_type_sms: 'sms',
};

export const OAUTH_TYPES = Object.freeze({
  REGISTER: 0,
  FORGETPWD: 1,
  LOGIN: 2,
});

export interface PaginationProps {
  page: number;
  pageSize: number;
}

export default {
  userService: new UserService(),
};
