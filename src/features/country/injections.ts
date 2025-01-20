import { countriesApi } from './api/inject.ts';
import { countriesStore } from './store/inject.ts';

export const countryFeature = [
  countriesApi,
  countriesStore
];