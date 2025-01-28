import { ApiCrudEndpoint, queryParams } from "react-solution";
import { FilesApiConfig } from "./types";
import { __rest } from "tslib";



export class FilesApi extends ApiCrudEndpoint<FilesApiConfig> {
    protected override config: FilesApiConfig = {
      url: '/api/v1/files',
    }

    override  create(_a: any) {
      var { data, fields = "*" } = _a, other = __rest(_a, ["data", "fields"]);
      return this.request({
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: `${this.config.url}`,
        data,
        params: queryParams(Object.assign({ fields }, other))
      });
}
}