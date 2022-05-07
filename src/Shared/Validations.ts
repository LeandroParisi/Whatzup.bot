import staticImplements from "./Anotations/staticImplements"

@staticImplements()
export default class Validations {
  public static IsNumber(stringToTest : string) : boolean {
    return /^[1-9]+$/.test(stringToTest.trim())
  }

  public static IsNumberIncludingZero(stringToTest : string) : boolean {
    return /^[0-9]+$/.test(stringToTest.trim())
  }

  public static IsInRange(stringToTest : string, aimedArray : Array<any>) {
    if (this.IsNumber(stringToTest)) {
      const arrayLength = aimedArray.length
      return Number(stringToTest) <= arrayLength && Number(stringToTest) > 0
    } else {
      return false
    }
  }
}