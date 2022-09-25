import dotenv from 'dotenv'
import staticImplements from "../../../Shared/Anotations/staticImplements"

dotenv.config()

@staticImplements()
export default class WhatzupApiConfig {
  public static ApiBaseRoute = process.env.BACKEND_URL
  
}