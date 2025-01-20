import { HTTP_CLIENT } from 'react-solution';
import { injectClass } from 'react-solution';
import { optionalToken } from 'react-solution';
import { CountriesApi } from './index.ts';
import { COUNTRIES_API, COUNTRIES_API_CFG } from './token.ts';

export const countriesApi = injectClass({
  token: COUNTRIES_API,
  constructor: CountriesApi,
  depends: {
    httpClient: HTTP_CLIENT,
    config: optionalToken(COUNTRIES_API_CFG),
  },
});