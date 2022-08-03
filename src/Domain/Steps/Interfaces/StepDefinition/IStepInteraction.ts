import Customer from "../../../Entities/Customer"

export interface IInteractionInput {
  customer : Customer,
  userMessage : string
}

export interface IInteractionOutput {
  nextStep : number
  outboundMessages : string[]
  // actions : ??
}

export interface IStepInteraction {
  Interact(input : IInteractionInput) : IInteractionOutput
}
