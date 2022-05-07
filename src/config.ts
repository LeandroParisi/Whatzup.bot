/* eslint-disable @typescript-eslint/no-var-requires */
import staticImplements from "./Shared/Anotations/staticImplements"
// TODO: ajustar essa bagaça
import SystemUtils from "./Shared/Utils/SystemUtils"
import ElectronConfig from "./electronConfig"


require('dotenv').config()

@staticImplements()
export default class Config {
  static backendUrl = process.env.BACKEND_URL || ElectronConfig.backendUrl
  static dbsPath = "./databases"
}