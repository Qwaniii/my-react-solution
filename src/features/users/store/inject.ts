import { injectClass, LOG_SERVICE } from 'react-solution';
import { optionalToken } from 'react-solution';
import { ENV } from 'react-solution';
import { ROUTER_SERVICE } from 'react-solution';
import { USERS_STORE, USERS_STORE_CFG } from './token.ts';
import { UsersStore } from './index.ts';
import { USERS_API } from '../api/token.ts';

export const usersStore = injectClass({
  token: USERS_STORE,
  constructor: UsersStore,
  depends: {
    env: ENV,
    usersApi: USERS_API,
    router: ROUTER_SERVICE,
    config: optionalToken(USERS_STORE_CFG),
    logger: LOG_SERVICE,
  },
});