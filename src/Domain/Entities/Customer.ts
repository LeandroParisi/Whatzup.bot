
export default class Customer {
  public _id : string
  public whatsappId : string
  public name : string
  public currentStep : number
  public isBotDisabled : boolean

  /**
   *
   */
  constructor(name : string) {
    this.currentStep = 1
    this.name = name
  }
}