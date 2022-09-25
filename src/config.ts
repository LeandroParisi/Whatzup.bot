/* eslint-disable @typescript-eslint/no-var-requires */
import ElectronConfig from "./electronConfig"
import staticImplements from "./Shared/Anotations/staticImplements"

require('dotenv').config()

export enum Envs {
  LOCAL = 'local',
  DEV = 'dev',
  PRD = 'prd'
}

@staticImplements()
export default class Config {
  static backendUrl = process.env.BACKEND_URL || ElectronConfig.backendUrl
  static dbsPath = "./databases"
  static runWithoutElectron = process.env.RUN_WITHOUT_ELECTRON === 'true'
}