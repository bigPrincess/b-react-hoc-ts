import {isUrl} from '../utils/utils';
import { menuData } from './menus.config';


function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    console.log(result);
    return result;
  });
}

export const getMenuData = () => formatter(menuData, '', null);
