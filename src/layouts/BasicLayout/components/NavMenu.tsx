import * as React from 'react';
import Link from 'umi/link';
import { Menu } from 'antd';
import { isEmpty } from 'lodash';
import Iconfont from '@/components/Iconfont';
import styles from '../index.scss';
import { menuConfig } from './menuConfig';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

/**
 * 管理系统左侧菜单栏
 */
export default class NavMenu extends React.Component<any> {
  // constructor(props: any) {
  //   super(props);
  //   console.log(123);
  // }
  state = {
    selectedKeys: [],
    openKeys: [],
  };
  /**
   * 确定已选择菜单（只有一个）
   */
  private handleSelect = ({ key }: { key: string }) => {
    this.setState({ selectedKeys: [key] });
  };
  /**
   * 确定已展开的子菜单（默认同时只展开一个）
   */
  private handleOpenChange = (openKeys: string[]) => this.setState({ openKeys });
  public render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={this.state.selectedKeys}
        openKeys={this.state.openKeys}
        onSelect={this.handleSelect}
        onOpenChange={this.handleOpenChange}
      >
        {menuConfig.map(item => {
          if (item.children && !isEmpty(item.children)) {
            return (
              <SubMenu
                key={item.resourceKey}
                title={
                  <span className={styles.title}>
                    <Iconfont name={item.icon} />
                    {item.description}
                  </span>
                }
              >
                {item.children.map(ele => (
                  <MenuItem key={ele.resourceKey}>
                    {ele.apiUrl ? (
                      <Link to={ele.apiUrl}>
                        <span className={styles.title}>
                          <Iconfont name={ele.icon} />
                          {ele.description}
                        </span>
                      </Link>
                    ) : (
                      <span className={styles.title}>
                        <Iconfont name={ele.icon} />
                        {ele.description}
                      </span>
                    )}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }
          return (
            <MenuItem key={item.resourceKey}>
              {item.apiUrl ? (
                <Link to={item.apiUrl}>
                  <span className={styles.title}>
                    <Iconfont name={item.icon} />
                    {item.description}
                  </span>
                </Link>
              ) : (
                <span className={styles.title}>
                  <Iconfont name={item.icon} />
                  {item.description}
                </span>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
}
