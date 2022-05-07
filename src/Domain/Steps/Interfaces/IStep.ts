import Customer from "../../Entities/Customer"
import StepTypes from "../Enums/StepTypes"

export interface IInteractionInput {
  customer : Customer,
  userMessage : string
}

export interface IInteractionOutput {
  nextStep : number
  outboundMessages : string[]
}

export interface IStep {
  id : number
  name : string
  type : StepTypes
  introMessage : string[]
}

export interface IStepInteraction {
  Interact(input : IInteractionInput) : IInteractionOutput
}
