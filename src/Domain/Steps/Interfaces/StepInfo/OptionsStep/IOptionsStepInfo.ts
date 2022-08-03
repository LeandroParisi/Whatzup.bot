import { IStep } from "../IStepInfo"
import IStepOption from "./IStepOption"

export default interface IOptionsStepInfo extends IStep {
  options : Array<IStepOption>
}