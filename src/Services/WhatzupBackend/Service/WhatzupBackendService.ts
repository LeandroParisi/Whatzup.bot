import { Service } from "typedi"
import Api from "../../Shared/Api"
import WhatzupApiConfig from "../Config/WhatzupApiConfig"
import { WhatzupApiEndpoint, WhatzupApiRoutes } from "../Config/WhatzupApiRoutes"
import ILoginRequest from "./Payloads/ILoginRequest"

@Service()
export default class WhatzupBackendService extends Api {
  protected BaseUrl = WhatzupApiConfig.ApiBaseRoute
  
  public async Login(loginRequest : ILoginRequest) {
    const endpoint = WhatzupApiRoutes.AUTHENTICATION
    const url = `${WhatzupApiRoutes.AUTHENTICATION}${endpoint}${WhatzupApiEndpoint[endpoint]['login']}`

    try {
      const response = await Api
    } catch {

    }
  }
}