import React, { Children, memo, PropsWithChildren, useState } from 'react';
import {
  AndroidOutlined,
  AppleOutlined,
  FileOutlined,
  PictureFilled,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Anchor, Breadcrumb, Button, Col, Empty, Layout, Menu, Row, Space, Tabs, theme } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useLocation, useNavigate } from 'react-router';
import SearchForm from '@src/components/search-form';
import { useSolution } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';

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
  getItem('Пользователи', '/all', <UserOutlined />, [
    getItem('Все пользователи', '/'),
    getItem('Роли', '4'),
  ]),
  getItem('Каталог', 'sub2', <TeamOutlined />, [getItem('Каталог 1', '6'), getItem('Каталог 2', '8')]),
  getItem('Страны', '/countries', <PictureFilled />, [getItem('Все страны', '/countries'), getItem('Добавить страну', '/add-country')]),
  getItem('Отчеты', '10', <FileOutlined />),
];

const LayoutAdmin: React.FC<PropsWithChildren> = ({children}) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const location = useLocation()

  console.log(location)
  
  const navigate = useNavigate()

  // const callbacks = {
  //   onSearch: (value) => children?.toLocaleString
  // }

  const users = useSolution(USERS_STORE);
      
  const callbacks = {
    onSearch: (value: string) => users.setParams({email: value})
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onClick={(e) => navigate(e.key)} selectedKeys={[location.pathname]} theme='dark' defaultSelectedKeys={['/']} mode="inline" items={items}/>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <Typography style={{ padding: 0, fontSize: '36px', fontWeight: 'bold' }}>Пользователи</Typography>
          <Typography style={{ paddingBottom: 10, fontSize: '16px', color: 'gray' }}>Список пользователей</Typography>
          <SearchForm placeholder='Поиск...' button='Найти' onSearch={callbacks.onSearch}/>
          <Row justify="space-between" align="middle">
          <Col span={23}>
            <Tabs
              defaultActiveKey="2"
              items={[
                {
                  key: '1',
                  label: `Все ${101}`,
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
          </Col>
          <Col span={1}>
            <Button onClick={() => navigate('/add-country')} type='dashed' shape="circle" icon={<PlusOutlined />}/> 
          </Col>
        </Row>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutAdmin);