import { newToken, Patch } from "react-solution";
import { CountriesApiConfig } from "./types";
import { CountriesApi } from "./index";

export const COUNTRIES_API = newToken<CountriesApi>('@features/country/api');

export const COUNTRIES_API_CFG = newToken<Patch<CountriesApiConfig>>(
  '@features/country/api/config',
);