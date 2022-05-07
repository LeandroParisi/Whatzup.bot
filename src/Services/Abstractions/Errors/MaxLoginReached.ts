export default class MaxLoginReached extends Error {
  originalError: any;

  constructor (message : string, error : any) {
    super()
    this.message = message
    this.originalError = error 
  }
}