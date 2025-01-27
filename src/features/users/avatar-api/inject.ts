import { HTTP_CLIENT } from 'react-solution';
import { injectClass } from 'react-solution';
import { optionalToken } from 'react-solution';
import { AvatarApi } from './index.ts';
import { AVATAR_API, AVATAR_API_CFG } from './token.ts';

export const avatarApi = injectClass({
  token: AVATAR_API,
  constructor: AvatarApi,
  depends: {
    httpClient: HTTP_CLIENT,
    config: optionalToken(AVATAR_API_CFG),
  },
});