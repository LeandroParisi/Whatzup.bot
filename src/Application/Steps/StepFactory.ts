import Container, { Service } from "typedi"
import GenericError from "../../Domain/Errors/GenericError"
import StepTypes from "../../Domain/Steps/Enums/StepTypes"
import { IStepInteraction } from "../../Domain/Steps/Interfaces/IStepInteraction"
import StepsRepository from "../../Services/SessionManagement/Repositories/StepsRepository"
import staticImplements from "../../Shared/Anotations/staticImplements"
import IInstaller from "../../Shared/Interfaces/IInstaller"
import { IDictionary } from "../../Shared/Utils/SystemUtils"
import OptionsStep from "./StepDefinition/OptionsStep"

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
    StepFactory.RegisterStep(StepTypes.Options, OptionsStep)
  }
}
