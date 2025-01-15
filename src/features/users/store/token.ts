import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DefaultConfig } from 'react-solution';
import type { UsersStore } from './index.ts';

export const USERS_STORE = newToken<UsersStore>('@features/users/store');

export const USERS_STORE_CFG = newToken<Patch<DefaultConfig>>(
  '@features/users/store/config',
);