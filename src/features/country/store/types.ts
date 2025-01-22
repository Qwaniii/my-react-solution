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
  key?: string
};

export interface TCountryData {
  items: TCountryItem[];
  count?: number;
}

export interface TCountryParams extends DefaultParams {
  // Фильтр по категории (идентификатору)
  query: string;
}