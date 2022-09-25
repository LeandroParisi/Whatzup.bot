/* istanbul ignore file */
export default class StepError extends Error {
  stepNumber: number;
  originalError: any;

  constructor (stepNumber : number, message : string, error? : any) {
    super()
    this.stepNumber = stepNumber,
    this.message = message
    this.originalError = error 
  }
}