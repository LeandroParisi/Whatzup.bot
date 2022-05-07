export default class DateUtils {
  static DateNow() {
    const timestampDate = new Date(Date.now())

    const minutesInAnHour = 60

    timestampDate
      .setHours(timestampDate.getHours() - timestampDate.getTimezoneOffset() / minutesInAnHour)

    return timestampDate
  }

  static GetDateFromDbString(dbDate : string) : Date {
    return DateUtils.GetDateFromTimestamp(new Date(dbDate).getTime() / 1000)
  }

  static GetDateFromTimestamp(timestamp : number) : Date {
    const timestampDate = new Date(timestamp * 1000)

    const minutesInAnHour = 60

    timestampDate
      .setHours(timestampDate.getHours() - timestampDate.getTimezoneOffset() / minutesInAnHour)

    return timestampDate
  }
}
