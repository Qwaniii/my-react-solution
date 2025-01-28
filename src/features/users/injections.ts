import { usersApi } from './api/inject.ts';
import { avatarApi } from './avatar-api/inject.ts';
import { filesApi } from './files/inject.ts';
import { usersStore } from './store/inject.ts';

export const usersFeature = [
  usersApi,
  usersStore,
  avatarApi,
  filesApi
];