import 'reflect-metadata'
import { IStep } from '../../../../../Domain/Steps/ValueObjects/IStepInfo'
import IOptionsStep from "../../../../../Domain/Steps/ValueObjects/OptionsStep/IOptionsStepInfo"
import StepsRepository from "../../../../../Services/SessionManagement/Repositories/StepsRepository"
import staticImplements from "../../../../../Shared/Anotations/staticImplements"
import defaultSteps from "../../Mocks/DefaultSteps"

@staticImplements()
export default class StepsDbSetup {
  static StepsRepository = new StepsRepository()

  static async Setup(steps? : Array<IStep | IOptionsStep>) {
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