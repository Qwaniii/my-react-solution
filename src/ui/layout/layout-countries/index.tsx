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
import SearchForm from '@src/components/search-form';
import { useExternalState, useSolution } from 'react-solution';
import SiderMenu from '@src/components/sider-menu';
import Breadcrumbs from '@src/components/breadcrumbs';
import PageTypography from '@src/components/page-typography';
import TabsPanel from '@src/components/tabs-panel';
import { COUNTRIES_STORE } from '@src/features/country/store/token';

const { Content } = Layout;

const LayoutCountries: React.FC<PropsWithChildren> = ({children}) => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const countries = useSolution(COUNTRIES_STORE);
  const countriesState = useExternalState(countries.state)
 
  const callbacks = {
    onSearch: (value: string) => countries.setParams({query: value}),
    onTab: (key: string) => countries.setParams({sort: key})

  }

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
    getItem('Canvas', '/draw', <FileOutlined />),
];

  const tabs: TabsProps['items'] = [
    {
      key: 'all',label: `Все`,icon: <UserSwitchOutlined />,
    },
    {
      key: 'title.ru',label: `По алфавиту`,icon: <TwitterOutlined />,
    },
    {
      key: 'dateCreate',label: `Старые`,icon: <FrownOutlined />,
    },
    {
      key: '-dateCreate',label: `Новые`,icon: <ContactsOutlined />,
    }
  ]

  const breadcrumbPaths = [
    { label: 'Главная', link: '/' },
    { label: 'Страны' },
  ];


  return (
    <Layout hasSider={true} style={{ minHeight: '100vh' }}>
      <SiderMenu items={items}/>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumbs styled={{ margin: '16px 0' }} paths={breadcrumbPaths} />
          <PageTypography title='Страны' desc='Список стран'/>
          <SearchForm placeholder='Поиск...' button='Найти' onSearch={callbacks.onSearch}/>
          <TabsPanel tabs={tabs} defaults='all' onTab={callbacks.onTab} link={'/add-country'}/>
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

export default memo(LayoutCountries);