import { newToken, Patch } from "react-solution";
import { FilesApiConfig } from "./types";
import { FilesApi,  } from "./index";

export const FILES_API = newToken<FilesApi>('@features/users/files');

export const FILES_API_CFG = newToken<Patch<FilesApiConfig>>(
  '@features/users/files/config',
);