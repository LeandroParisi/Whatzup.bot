export default class BackendError extends Error {
  status: number;
  originalError: any;

  constructor (status : number, message : string, error : any) {
    super()
    this.status = status,
    this.message = message
    this.originalError = error 
  }
}