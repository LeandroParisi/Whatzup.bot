
import StepTypes from "../../Domain/Steps/Enums/StepTypes"
import { IInteractionInput, IInteractionOutput, IStepInteraction } from "../../Domain/Steps/Interfaces/IStep"
import ISimpleStep from "../../Domain/Steps/Interfaces/SimpleStep/ISimpleStep"

export default class SimpleStep implements ISimpleStep, IStepInteraction {
  id: number;
  name: string;
  type: StepTypes;
  outboundMessages: string[];
  nextStep: number;
  introMessage: string[];

  /**
   *
   */
  constructor({
    id,
    name,
    type,
    outboundMessages,
    nextStep,
    introMessage
  } : ISimpleStep) {
    this.id = id
    this.name = name
    this.type = type
    this.outboundMessages = outboundMessages
    this.nextStep = nextStep
    this.introMessage = introMessage
  }

  Interact(_input: IInteractionInput): IInteractionOutput {
    return {
      nextStep: this.nextStep,
      outboundMessages: this.outboundMessages
    }
  }
}