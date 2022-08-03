/* istanbul ignore file */

export default class Customer {
  public _id : string
  public whatsappId : string
  public name : string
  public currentStep : number
  public isBotDisabled : boolean

  /**
   *
   */
  constructor(name : string, whatsappId : string) {
    this.currentStep = 1
    this.isBotDisabled = false
    this.name = name
    this.whatsappId = whatsappId
  }
}