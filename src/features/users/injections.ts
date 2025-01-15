import { usersApi } from './api/inject.ts';
import { usersStore } from './store/inject.ts';

export const usersFeature = [
  usersApi,
  usersStore,
];