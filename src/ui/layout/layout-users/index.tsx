import React, { Children, memo, PropsWithChildren, useState } from 'react';
import {
  ContactsOutlined,
  FileOutlined,
  FrownOutlined,
  PictureFilled,
  TeamOutlined,
  TwitterOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { Layout, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import SearchForm from '@src/components/search-form';
import { useExternalState, useSolution } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';
import SiderMenu from '@src/components/sider-menu';
import Breadcrumbs from '@src/components/breadcrumbs';
import PageTypography from '@src/components/page-typography';
import TabsPanel from '@src/components/tabs-panel';

const { Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const LayoutUsers: React.FC<PropsWithChildren> = ({children}) => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const users = useSolution(USERS_STORE);
  const usersState = useExternalState(users.state)
 
  const callbacks = {
    onSearch: (value: string) => users.setParams({email: value}),
    onTab: (key: string) => users.setParams({status: key})

  }

  const tabs: TabsProps['items'] = [
    {
      key: 'all',label: `Все (${usersState.data.allCount})`,icon: <UserSwitchOutlined />,
    },
    {
      key: 'new',label: `Новые (${usersState.data.newCount})`,icon: <TwitterOutlined />,
    },
    {
      key: 'confirm',label: `Подтвержденные (${usersState.data.confirmCount})`,icon: <ContactsOutlined />,
    },
    {
      key: 'reject',label: `Отклоненные (${usersState.data.rejectCount})`,icon: <FrownOutlined />,
    }
  ]

  const breadcrumbPaths = [
    { label: 'Главная', link: '/' },
    { label: 'Пользователи' },
  ];

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


  return (
    <Layout hasSider={true} style={{ minHeight: '100vh' }}>
      <SiderMenu items={items}/>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumbs styled={{ margin: '16px 0' }} paths={breadcrumbPaths} />
          <PageTypography title='Пользователи' desc='Список пользователей'/>
          <SearchForm placeholder='Поиск...' button='Найти' onSearch={callbacks.onSearch}/>
          <TabsPanel tabs={tabs} defaults='all' onTab={callbacks.onTab} link={'/add-user'}/>
          <div
            style={{
              minHeight: 360,
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

export default memo(LayoutUsers);