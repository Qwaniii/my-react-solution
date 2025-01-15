import type { DefaultParams } from 'react-solution';

export type TUserProfile = {
  name: string;
  phone: string;
  surname: string;
}

export interface TUserItem {
  _id: string;
  username: string;
  email: string;
  profile: TUserProfile
};

export interface TUserData {
  items: TUserItem[];
  count: number;
}

export interface TUserParams extends DefaultParams {
  // Фильтр по категории (идентификатору)
  category: string;
  query: string;
}