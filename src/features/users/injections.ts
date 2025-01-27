import { usersApi } from './api/inject.ts';
import { avatarApi } from './avatar-api/inject.ts';
import { usersStore } from './store/inject.ts';

export const usersFeature = [
  usersApi,
  usersStore,
  avatarApi
];