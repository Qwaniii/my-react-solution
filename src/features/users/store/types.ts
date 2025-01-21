import type { DefaultParams } from 'react-solution';

export type TUserProfile = {
  name: string;
  phone: string;
  surname: string;
}

export type TUserRoles = {
  name: string;
  title: string;
}

export interface TUserItem {
  _id: string;
  username: string;
  email: string;
  profile: TUserProfile
  key?: string
  status?: string
  roles?: TUserRoles[]
};

export interface TUserData {
  items: TUserItem[];
  count: number;
  allCount: number;
  newCount: number;
  confirmCount: number;
  rejectCount: number
}

export interface TUserParams extends DefaultParams {
  // Фильтр по категории (идентификатору)
  category: string;
  query: string;
  email: string;
  status: string
}