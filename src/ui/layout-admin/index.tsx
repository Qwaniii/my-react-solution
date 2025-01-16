import React, { memo, useState } from 'react';
import {
  AndroidOutlined,
  AppleOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Anchor, Breadcrumb, Layout, Menu, Tabs, theme } from 'antd';
import UsersTable from '../users-table';
import Search from 'antd/es/input/Search';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Пользователи', 'sub1', <UserOutlined />, [
    getItem('Все пользователи', '3'),
    getItem('Роли', '4'),
  ]),
  getItem('Каталог', 'sub2', <TeamOutlined />, [getItem('Каталог 1', '6'), getItem('Каталог 2', '8')]),
  getItem('Отчеты', '9', <FileOutlined />),
];

const LayoutAdmin: React.FC = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme='dark' defaultSelectedKeys={['sub1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Пользователи</Breadcrumb.Item>
          </Breadcrumb>
          <Header style={{ padding: 0, background: colorBgContainer, fontSize: '36px', fontWeight: 'bold' }}>
            Пользователи
          </Header>
          <Search
            style={{ width: 320 }}
            placeholder="Поиск..."
            allowClear
            enterButton="Найти"
            size='middle'
            onSearch={() => {}}
          />
          <Tabs
            defaultActiveKey="2"
            items={[
              {
                key: '1',
                label: `Все`,
                children: `Tab 1`,
                icon: <AppleOutlined />,
              },
              {
                key: '2',
                label: `Новые`,
                children: `Tab 2`,
                icon: <AndroidOutlined />,
              }
            ]}
          />
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          <UsersTable/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutAdmin);