import IOptionsStep from "../../../../../Domain/Steps/Interfaces/OptionsStep/IOptionsStep"
import ISimpleStep from "../../../../../Domain/Steps/Interfaces/SimpleStep/ISimpleStep"
import StepsRepository from "../../../../../Services/SessionManagement/Repositories/StepsRepository"
import staticImplements from "../../../../../Shared/Anotations/staticImplements"
import defaultSteps from "../../Mocks/DefaultSteps"
import 'reflect-metadata'

@staticImplements()
export default class StepsDbSetup {
  static StepsRepository = new StepsRepository()

  static async Setup(steps? : Array<ISimpleStep | IOptionsStep>) {
    if (steps) {
      await this.StepsRepository.InsertSteps(steps)
    } else {
      await this.StepsRepository.InsertSteps(defaultSteps)
    }
  }

  static async CleanUp() {
    await this.StepsRepository.CleanUp()
  }
}