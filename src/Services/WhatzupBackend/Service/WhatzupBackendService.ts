import { Service } from "typedi"
import Api from "../../Shared/Api"
import WhatzupApiConfig from "../Config/WhatzupApiConfig"
import { WhatzupApiEndpoint, WhatzupApiRoutes } from "../Config/WhatzupApiRoutes"
import ILoginRequest from "./Payloads/Login/ILoginRequest"
import { ILoginResponse } from "./Payloads/Login/ILoginResponse"

@Service()
export default class WhatzupBackendService extends Api {
  protected BaseUrl = WhatzupApiConfig.ApiBaseRoute
  
  public async Login(loginRequest : ILoginRequest) {
    const baseRoute = WhatzupApiRoutes.AUTHENTICATION
    const endpoint = WhatzupApiEndpoint[baseRoute]['login']

    const route = `${baseRoute}${endpoint.endpoint}`

    const response = await this.Request<ILoginResponse>({
      endpoint: route,
      method: endpoint.method,
      body: loginRequest
    })
    console.log({ response })
    return response
  }
}