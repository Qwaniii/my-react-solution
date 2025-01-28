import React, { Children, memo, PropsWithChildren, useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router';
import SearchForm from '@src/components/search-form';
import { GetQuery, useExternalState, useInit, useSolution } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';
import SiderMenu from '@src/components/sider-menu';
import Breadcrumbs from '@src/components/breadcrumbs';
import PageTypography from '@src/components/page-typography';
import TabsPanel from '@src/components/tabs-panel';
import UsersDrawer from '@src/components/users-drawer';
import InfoUser from '@src/ui/info-user';
import { PROFILE_STORE } from '@src/features/profile-store/token';

const { Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
export type ParamsProps = {
  id: string
}

const LayoutInfoUsers: React.FC = () => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const params = useParams<keyof ParamsProps>() as ParamsProps;
  
  const profile = useSolution(PROFILE_STORE);
  const profileState = useExternalState(profile.state)

  useInit(
    async () => {
      const data = await profile.load(params.id);
      // if(profileState.data?.profile.avatar._id) {
      //   const answer = await profile.loadAvatar(profileState.data?.profile.avatar._id)
      //   console.log(answer)
      //   profile.state.set({
      //     ...profile.state.get(),
      //     avatar: answer.url
      //   })
      // }
    },
    [params.id],
    { ssr: 'profile.init' },
  ); 


  const breadcrumbPaths = [
    { label: 'Главная', link: '/' },
    { label: `${params.id}` },
  ];

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
          <PageTypography title='Пользователь' desc={params.id}/>
          <div
            style={{
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
          <InfoUser data={profileState.data} waiting={profileState.waiting} avatar={profileState.avatar}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutInfoUsers);