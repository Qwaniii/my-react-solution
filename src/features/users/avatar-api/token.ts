import { newToken, Patch } from "react-solution";
import { AvatarApiConfig } from "./types";
import { AvatarApi } from "./index";

export const AVATAR_API = newToken<AvatarApi>('@features/users/avatar-api');

export const AVATAR_API_CFG = newToken<Patch<AvatarApiConfig>>(
  '@features/users/avatar-api/config',
);