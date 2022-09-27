import { Service } from "typedi"
import WhatzupBackendService from "../../WhatzupBackend/Service/WhatzupBackendService"
import UserSessionRepository from '../Repositories/UserSessionRepository'

@Service()
export default class UserSessionHandler {
  constructor(
    private readonly UserSessionRepository : UserSessionRepository,
    private readonly WhatzupBackendService : WhatzupBackendService
  ) {}
}
