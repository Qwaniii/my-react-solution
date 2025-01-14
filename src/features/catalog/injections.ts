import { articlesApi } from './api/inject.ts';
import { articlesStore } from './store/inject.ts';

export const catalogFeature = [
  articlesApi,
  articlesStore,
];