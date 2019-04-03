import * as React from 'react';
import { Layout, Avatar, Dropdown, Icon, Menu } from 'antd';
import styles from './index.scss';
import NavMenu from './components/NavMenu';
import user from '@/utils/user';

const { Sider, Content, Header } = Layout;

export default class BasicLayout extends React.Component<any> {
  constructor(props: any) {
    super(props);
    console.log(123);
  }
  render() {
    const { username, nickName, avatar } = user.getUserInfo();
    return (
      <Layout>
        <Sider collapsible={false} width={256}>
          <div className={styles.logo} />
          <NavMenu />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <div>云佳仓WMS仓库管理系统</div>
            <div>
              <Avatar
                src={avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
              />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a onClick={() => user.logout()}>退出</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" href="#">
                  <span style={{ padding: '0 5px' }}>{nickName || username || ''}</span>
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Content className={styles.content}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
