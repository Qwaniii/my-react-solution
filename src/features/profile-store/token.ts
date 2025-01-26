import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { ProfileStore } from './index.ts';
import type { ProfileStoreConfig } from './types.ts';

export const PROFILE_STORE = newToken<ProfileStore>('@feature/profile-store');

export const PROFILE_STORE_CFG = newToken<Patch<ProfileStoreConfig>>(
  '@feature/profile-store/config',
);