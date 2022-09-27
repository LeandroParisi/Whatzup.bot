/* eslint-disable @typescript-eslint/no-var-requires */
import staticImplements from "../Shared/Anotations/staticImplements"
import ElectronConfig from "./ElectronConfig"

require('dotenv').config()

export enum Envs {
  LOCAL = 'local',
  DEV = 'dev',
  PRD = 'prd'
}

@staticImplements()
export default class AppConfiguration {
  static backendUrl = process.env.BACKEND_URL || ElectronConfig.backendUrl
  static dbsPath = "./databases"
  static runWithoutElectron = process.env.RUN_WITHOUT_ELECTRON === 'true'
}