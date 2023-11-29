import React, { useState } from 'react';

import { Layout, Button, theme, Breadcrumb } from 'antd';
import styles from '@/Layout/home.module.less'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
import { Outlet, } from 'react-router-dom';
import Menu from './components/Menu';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} >{collapsed ? 'RV' : 'react-vite'}</div>
        <Menu></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Breadcrumb style={{ marginLeft: '10px' }} items={[{ key: '2', title: '首页', path: '/home' }, { key: '3', title: '关于', path: '/about' }]}>
          </Breadcrumb>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout >
  );
};

export default App;