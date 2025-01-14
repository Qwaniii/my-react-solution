import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DefaultConfig } from 'react-solution';
import type { ArticlesStore } from './index.ts';

export const ARTICLES_STORE = newToken<ArticlesStore>('@features/catalog/store');

export const ARTICLES_STORE_CFG = newToken<Patch<DefaultConfig>>(
  '@features/catalog/store/config',
);