
import GenericParser from "../../Shared/Parsers/GenericParser"
import StepTypes from "../../Domain/Steps/Enums/StepTypes"
import { IInteractionInput, IInteractionOutput, IStepInteraction } from "../../Domain/Steps/Interfaces/IStep"
import IStepOption from "../../Domain/Steps/Interfaces/OptionsStep/IStepOption"
import IOptionsStep from "../../Domain/Steps/Interfaces/OptionsStep/IOptionsStep"
import IValidatedStep from "../../Domain/Steps/Interfaces/IValidatedStep"

export default class OptionsStep implements IOptionsStep, IStepInteraction, IValidatedStep {
  id: number;
  type: StepTypes;
  name: string
  options : Array<IStepOption>
  introMessage: string[]
  
  private formattedAnswer : number
  /**
   *
   */
  constructor({
    id,
    name,
    type,
    options,
    introMessage
  } : IOptionsStep) {
    this.id = id
    this.name = name
    this.type = type
    this.options = options
    this.introMessage = introMessage
  }

  ValidateAnswer(userMessage: string) : boolean {
    this.formattedAnswer = GenericParser.ToNumber(userMessage)
    const optionNumbers = new Set(this.options.map(({ key }) => key))

    return optionNumbers.has(this.formattedAnswer)
  }

  Interact(input: IInteractionInput): IInteractionOutput {
    const isValid = this.ValidateAnswer(input.userMessage)

    if (isValid) {
      const { nextStep, outboundMessages } = this.options.find(({ key }) => key === this.formattedAnswer)

      return {
        nextStep,
        outboundMessages
      }
    } else {
      const { currentStep: nextStep } = input.customer
      
      return {
        nextStep,
        outboundMessages: this.introMessage
      }
    }
  }
}