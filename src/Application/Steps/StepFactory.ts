import staticImplements from "../../Shared/Anotations/staticImplements"
import { IDictionary } from "../../Shared/Utils/SystemUtils"
import IInstaller from "../../Shared/Interfaces/IInstaller"
import StepTypes from "../../Domain/Steps/Enums/StepTypes"
import OptionsStep from "./StepDefinition/OptionsStep"
import Container, { Service } from "typedi"
import StepsRepository from "../../Services/SessionManagement/Repositories/StepsRepository"
import GenericError from "../../Domain/Abstractions/Errors/GenericError"
import { IStepInteraction } from "../../Domain/Steps/Interfaces/StepDefinition/IStepInteraction"

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