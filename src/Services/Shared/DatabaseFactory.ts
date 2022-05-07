import Datastore from "nedb-promises"
import Config from "../../config"
import staticImplements from "../../Shared/Anotations/staticImplements"

@staticImplements()
export default class DatabaseFactory {
  public static Create(dbName : string) : Datastore {
    return Datastore.create({
      filename: Config.dbsPath + `/${dbName}`,
      autoload: true
    })
  }
}