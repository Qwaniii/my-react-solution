import { injectClass, LOG_SERVICE } from 'react-solution';
import { optionalToken } from 'react-solution';
import { ProfileStore } from './index.ts';
import { PROFILE_STORE, PROFILE_STORE_CFG } from './token.ts';
import { USERS_API } from '../users/api/token.ts';

export const profileStore = injectClass({
  token: PROFILE_STORE,
  constructor: ProfileStore,
  depends: {
    usersApi: USERS_API,
    config: optionalToken(PROFILE_STORE_CFG),
    logger: LOG_SERVICE,
  },
});