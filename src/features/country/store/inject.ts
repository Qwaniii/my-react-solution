import { injectClass, LOG_SERVICE } from 'react-solution';
import { optionalToken } from 'react-solution';
import { ENV } from 'react-solution';
import { ROUTER_SERVICE } from 'react-solution';
import { COUNTRIES_STORE, COUNTRIES_STORE_CFG } from './token.ts';
import { CountriesStore } from './index.ts';
import { COUNTRIES_API } from '../api/token.ts';

export const countriesStore = injectClass({
  token: COUNTRIES_STORE,
  constructor: CountriesStore,
  depends: {
    env: ENV,
    countriesApi: COUNTRIES_API,
    router: ROUTER_SERVICE,
    config: optionalToken(COUNTRIES_STORE_CFG),
    logger: LOG_SERVICE,
  },
});