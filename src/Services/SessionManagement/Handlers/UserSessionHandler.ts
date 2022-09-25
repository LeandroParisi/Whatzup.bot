import { Service } from "typedi"
import { ILoginInfo } from "../../../Domain/DTOs/ILoginInfo"
import UserSessionRepository from '../Repositories/UserSessionRepository'

@Service()
export default class UserSessionHandler {
  constructor(
    private readonly UserSessionRepository : UserSessionRepository,
  ) {}

  public async TryLogin(loginInfo : ILoginInfo) {
    
  }
}
