import { newToken, Patch } from "react-solution";
import { ArticlesApiConfig } from "./types";
import { ArticlesApi } from "./index";

export const ARTICLES_API = newToken<ArticlesApi>('@features/catalog/api');

export const ARTICLES_API_CFG = newToken<Patch<ArticlesApiConfig>>(
  '@features/catalog/api/config',
);