import StepTypes from "../Enums/StepTypes"

export interface IStep {
  id : number
  name : string
  type : StepTypes
  introMessage : string[]
}

