import staticImplements from "../Anotations/staticImplements"

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export interface IDictionary<T> {
  [Key: string]: T;
}

@staticImplements()
export default class SystemUtils {
  public static GetObjectEntries<T>(obj: T): Entries<T> {
    return Object.entries(obj) as any
  }

  public static StringToHash(string : string) : number {
    let hash = 0
      
    if (string.length == 0) return hash
      
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
      
    return hash
  }

  public static GetEnumKeyByEnumValue<T extends { [index:string] : string }>(myEnum : T, enumValue : string):keyof T|null {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue)
    return keys.length > 0 ? keys[0] : null
  }

  public static GetEnumValues(myEnum : any) : Array<string> {
    return Object.keys(myEnum).filter((x) => Number(x) >= 0) as unknown as Array<string>
  }

  public static GetEnumNumberValues(myEnum : any) : Array<number> {
    return Object.keys(myEnum).filter((x) => Number(x) >= 0).map((x) => Number(x)) as unknown as Array<number>
  }
}