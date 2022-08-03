
import GenericParser from "../../../Shared/Parsers/GenericParser"
import IValidatedStep from "../../../Domain/Steps/Interfaces/StepDefinition/IValidatedStep"
import { 
  IInteractionInput,
  IInteractionOutput,
  IStepInteraction } from "../../../Domain/Steps/Interfaces/StepDefinition/IStepInteraction"
import IOptionsStepInfo from "../../../Domain/Steps/Interfaces/StepInfo/OptionsStep/IOptionsStepInfo"

export default class OptionsStep implements IStepInteraction, IValidatedStep {
  stepInfo : IOptionsStepInfo
  
  private formattedAnswer : number
  /**
   *
   */
  constructor(stepInfo : IOptionsStepInfo) {
    this.stepInfo = stepInfo
  }

  ValidateAnswer(userMessage: string) : boolean {
    this.formattedAnswer = GenericParser.ToNumber(userMessage)
    const optionNumbers = new Set(this.stepInfo.options.map(({ selectionKey }) => selectionKey))

    return optionNumbers.has(this.formattedAnswer)
  }

  Interact(input: IInteractionInput): IInteractionOutput {
    const isValid = this.ValidateAnswer(input.userMessage)

    if (isValid) {
      const { 
        nextStep, 
        outboundMessages 
      } = this.stepInfo.options.find(({ selectionKey }) => selectionKey === this.formattedAnswer)

      return {
        nextStep,
        outboundMessages
      }
    } else {
      const { currentStep: nextStep } = input.customer
      
      return {
        nextStep,
        outboundMessages: this.stepInfo.introMessage
      }
    }
  }
}