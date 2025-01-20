import type { DefaultParams } from 'react-solution';

// export type TUserProfile = {
//   name: string;
//   phone: string;
//   surname: string;
// }

export interface TCountryItem {
  _id: string;
  title: string;
  code: string;
};

export interface TCountryData {
  list: [];
  count: number;
}

export interface TCountryParams extends DefaultParams {
  // Фильтр по категории (идентификатору)
  query: string;
}