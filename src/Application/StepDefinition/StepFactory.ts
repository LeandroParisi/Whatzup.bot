import staticImplements from "../../Shared/Anotations/staticImplements"
import { IDictionary } from "../../Shared/Utils/SystemUtils"
import { IStepInteraction } from "../../Domain/Steps/Interfaces/IStep"
import IInstaller from "../../Shared/Interfaces/IInstaller"
import SimpleStep from "./SimpleStep"
import StepTypes from "../../Domain/Steps/Enums/StepTypes"
import OptionsStep from "./OptionsStep"
import Container, { Service } from "typedi"
import StepsRepository from "../../Services/SessionManagement/Repositories/StepsRepository"
import GenericError from "../../Domain/Abstractions/Errors/GenericError"

@staticImplements<IInstaller>()
@Service()
export default class StepFactory {
  private static StepWarehouse : IDictionary<any> = {}

  static async Create(stepNumber : number) : Promise<IStepInteraction> {
    try {
      const stepsRepository = Container.get(StepsRepository)
      const currentStep = await stepsRepository.GetStepById(stepNumber)
      
      return new this.StepWarehouse[currentStep.type](currentStep)

    } catch (error) {
      throw new GenericError(`Unregistered step ${stepNumber}`, error)
    }
  }

  public static RegisterStep(stepType : StepTypes, step : any) {
    StepFactory.StepWarehouse[stepType] = step
  }

  public static InstallServices(): void {
    StepFactory.RegisterStep(StepTypes.Simple, SimpleStep)
    StepFactory.RegisterStep(StepTypes.Options, OptionsStep)
  }
}
