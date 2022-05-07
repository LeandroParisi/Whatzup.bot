const dayToNumber = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
}

const dayNumberToPt = {
  1: 'Domingo',
  2: 'Segunda',
  3: 'Terça',
  4: 'Quarta',
  5: 'Quinta',
  6: 'Sexta',
  7: 'Sábado',
}

const numberToDay = {
  1: 'sunday',
  2: 'monday',
  3: 'tuesday',
  4: 'wednesday',
  5: 'thursday',
  6: 'friday',
  7: 'saturday',
}

enum dayTranslation {
  sunday = 'Domingo',
  monday = 'Segunda',
  tuesday = 'Terça',
  wednesday = 'Quarta',
  thursday = 'Quinta',
  friday = 'Sexta',
  saturday = 'Sábado'
}

export default class DaysUtils {
  static TranslateToPt(day : keyof typeof dayTranslation) : string {
    return dayTranslation[day]
  }

  static GetDateFromTimestamp(timestamp : number) : Date {
    const timestampDate = new Date(timestamp * 1000)

    const minutesInAnHour = 60

    timestampDate.setHours(timestampDate.getHours() - timestampDate.getTimezoneOffset() / minutesInAnHour)
    
    return timestampDate
  }

  static GetDayNumberFromTimestamp(timestamp : number) : number {
    const sundayAsFirstDayDifference = 1
    return DaysUtils.GetDateFromTimestamp(timestamp).getDay() + sundayAsFirstDayDifference
  }

  static GetDatesDifferenceInDays(currentDate : Date, previousDate : Date) : number {
    const yearsDifference = Math.abs(currentDate.getFullYear() - previousDate.getFullYear())
    const monthsDifference = Math.abs((currentDate.getMonth() + 1) - (previousDate.getMonth() + 1))
    const daysDifference = Math.abs(currentDate.getDate() - previousDate.getDate())

    return yearsDifference * 360 + monthsDifference * 30 + daysDifference
  }

  static SubtractTimeFromDate(currentDate : Date, hoursToSubtract : number) : Date {
    const numberOfMlSeconds = currentDate.getTime()
    const addMlSeconds = (hoursToSubtract * 60) * 60 * 1000
    const newDateObj = new Date(numberOfMlSeconds - addMlSeconds)

    return newDateObj
}
}