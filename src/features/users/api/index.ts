import { ApiCrudEndpoint } from "react-solution";
import { UsersApiConfig } from "./types";


export class UsersApi extends ApiCrudEndpoint<UsersApiConfig> {
    protected override config: UsersApiConfig = {
      url: '/api/v1/users',
    }
}