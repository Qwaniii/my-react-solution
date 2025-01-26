import { ApiCrudEndpoint, queryParams } from "react-solution";
import { UsersApiConfig } from "./types";
import { __rest } from "tslib";



export class UsersApi extends ApiCrudEndpoint<UsersApiConfig> {
    protected override config: UsersApiConfig = {
      url: '/api/v1/users',
    }

    override update(_a: any) {
      const { id, data, fields = "*" } = _a, other = __rest(_a, ["id", "data", "fields"]);
      return this.request({
        method: "PUT",
        url: `${this.config.url}/${id}`,
        data,
        params: queryParams(Object.assign({ fields }, other))
      });
    }
}