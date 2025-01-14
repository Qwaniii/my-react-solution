import { ApiCrudEndpoint } from "react-solution";
import { ArticlesApiConfig } from "./types";


export class ArticlesApi extends ApiCrudEndpoint<ArticlesApiConfig> {
    protected override config: ArticlesApiConfig = {
      url: '/api/v1/articles',
    }
}