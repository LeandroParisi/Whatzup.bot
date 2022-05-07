
interface params {
  decimal? : boolean
  price : number
}

export default class GenericParser {
  public static FormatPrice = (
    {
      price,
      decimal = false 
    } : params
  ) => {
    if (!price) return 'R$ 0.00'
    if (decimal) return `R$ ${Number(price).toFixed(2)}`
    return `R$ ${Number(price)}`
  }

  public static ToNumber(string : string) {
    return Number(string.trim())
  }

  public static ToUpperTrim(string : string) {
    return string.trim().toUpperCase()
  }

  public static ToLowerTrim(string : string) {
    return string.trim().toLowerCase()
  }
}