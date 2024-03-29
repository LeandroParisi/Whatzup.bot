import { Service } from "typedi"
import SessionDataDbs from '../config'

@Service()
export default class UserSessionRepository {
  db : Datastore

  constructor() {
    this.db = SessionDataDbs.userSessionDb
  }

  public async SaveToken(token : string) {
    await this.db.insert({ token })
  }
}