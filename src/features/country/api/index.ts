import { ApiCrudEndpoint } from "react-solution";
import { CountriesApiConfig } from "./types";


export class CountriesApi extends ApiCrudEndpoint<CountriesApiConfig> {
    protected override config: CountriesApiConfig = {
      url: '/api/v1/countries',
    }
}