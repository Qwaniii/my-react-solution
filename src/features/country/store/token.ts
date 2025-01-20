import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DefaultConfig } from 'react-solution';
import type { CountriesStore } from './index.ts';

export const COUNTRIES_STORE = newToken<CountriesStore>('@features/country/store');

export const COUNTRIES_STORE_CFG = newToken<Patch<DefaultConfig>>(
  '@features/country/store/config',
);