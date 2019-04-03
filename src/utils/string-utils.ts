import regexUtils from './regex-utils';

/**
 * 首字母大写
 * @param param0
 */
export const firstUpperCase = (str: string) =>
  str.toString()[0].toUpperCase() + str.toString().slice(1);

/**
 * 数组转字符串
 * @param arr 数组
 */
export const turnArraytoString = (arr: number[]) => {
  let array: string[] = [];
  arr.map(item => {
    array.push(item + '');
  });
  return array;
};

/**
 * 从路由地址中获得id
 * @param path
 */
export const getParamFromPath = (path: string) => {
  const id = path.split('/').pop();
  if (id && regexUtils.isNumber(id)) {
    return +id;
  }
  return undefined;
};
