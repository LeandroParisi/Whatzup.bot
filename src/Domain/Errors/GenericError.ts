/* istanbul ignore file */
export default class GenericError extends Error {
  innerError : Error

  /**
   *
   */
  constructor(message : string, innerError : Error) {
    super(message)
    this.innerError = innerError
  }
}