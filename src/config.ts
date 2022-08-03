/* eslint-disable @typescript-eslint/no-var-requires */
import staticImplements from "./Shared/Anotations/staticImplements"
import ElectronConfig from "./electronConfig"

require('dotenv').config()

@staticImplements()
export default class Config {
  static backendUrl = process.env.BACKEND_URL || ElectronConfig.backendUrl
  static dbsPath = "./databases"
}