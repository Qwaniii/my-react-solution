import { newToken, Patch } from "react-solution";
import { UsersApiConfig } from "./types";
import { UsersApi } from "./index";

export const USERS_API = newToken<UsersApi>('@features/users/api');

export const USERS_API_CFG = newToken<Patch<UsersApiConfig>>(
  '@features/users/api/config',
);