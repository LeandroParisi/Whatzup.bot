export default class LoginError extends Error {
  innerError: any;
  retryLogin : boolean

  constructor (message : string, error : any, retryLogin : boolean) {
    super()
    this.message = message
    this.innerError = error 
    this.retryLogin = retryLogin
  }
}