import { IStep } from "../IStep"

export default interface ISimpleStep extends IStep {
  outboundMessages: string[];
  nextStep: number;
}