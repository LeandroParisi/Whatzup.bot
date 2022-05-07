import { IStep } from "../IStep"
import IStepOption from "./IStepOption"

export default interface IOptionsStep extends IStep {
  options : Array<IStepOption>
}