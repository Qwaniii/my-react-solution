import { ApiCrudEndpoint, queryParams } from "react-solution";
import { AvatarApiConfig } from "./types";
import { __rest } from "tslib";



export class AvatarApi extends ApiCrudEndpoint<AvatarApiConfig> {
    protected override config: AvatarApiConfig = {
      url: '/api/v1/files',
    }
}