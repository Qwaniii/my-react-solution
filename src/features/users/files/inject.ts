import { HTTP_CLIENT } from 'react-solution';
import { injectClass } from 'react-solution';
import { optionalToken } from 'react-solution';
import { FilesApi } from './index.ts';
import { FILES_API, FILES_API_CFG } from './token.ts';

export const filesApi = injectClass({
  token: FILES_API,
  constructor: FilesApi,
  depends: {
    httpClient: HTTP_CLIENT,
    config: optionalToken(FILES_API_CFG),
  },
});