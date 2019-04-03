import { WrappedFormUtils } from 'antd/lib/form/Form';
import reg from './regex-utils';

/**
 * 手机号码校验
 * @param _rule
 * @param value
 * @param callback
 */
export function phoneValidator(_rule: any, value: string, callback: any) {
  if (value && !reg.isPhone(value)) {
    callback('请输入有效的电话号码');
  } else {
    callback();
  }
}

/**
 * 邮箱校验
 * @param _rule
 * @param value
 * @param callback
 */
export function emailValidator(_rule: any, value: string, callback: any) {
  if (value && !reg.isEmail(value)) {
    callback('请输入有效的邮箱地址');
  } else {
    callback();
  }
}

/**
 * 比较前后两次输入的密码是否相同
 * @param form
 * @param _rule
 * @param value
 * @param callback
 * @param field
 */
export function compareToFirstPassword(
  form: WrappedFormUtils,
  _rule: any,
  value: string,
  callback: any,
  field: string,
) {
  if (value && value !== form.getFieldValue(field)) {
    callback('两次输入的密码不一致，请重新输入');
  } else {
    callback();
  }
}
