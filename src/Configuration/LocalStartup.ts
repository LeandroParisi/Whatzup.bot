import { Service } from "typedi"
import UserSessionRepository from "../Services/SessionManagement/Repositories/UserSessionRepository"
import WhatzupBackendService from "../Services/WhatzupBackend/Service/WhatzupBackendService"

@Service()
export class LocalStartup {
  private TestUserEmail = 'user@teste.com'
  private TestUserPassword = '123456'
  /**
   *
   */
  constructor(
    private WhatzupBackendService : WhatzupBackendService,
    private UserSessionRepository : UserSessionRepository
  ) {}

  public async TryLogin() {
    try {
      const response = await this.WhatzupBackendService.Login({ email: this.TestUserEmail, password: this.TestUserPassword })
      await this.UserSessionRepository.SaveToken(response.data)
    } catch {
      throw new Error()
    }
  }
}