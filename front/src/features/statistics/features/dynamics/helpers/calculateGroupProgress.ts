import { GroupBy } from '@shared/enum/GroupBy'
import { getYear, getDayOfYear, getMonth } from 'date-fns'

// TODO: refactor it
export const calculateGroupProgress = (group: GroupBy.Month | GroupBy.Year) => {
  if (group === GroupBy.Year) {
    const year = getYear(new Date())
    const yearIsLeep = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
    const daysInYear = yearIsLeep ? 366 : 365

    const nowDay = getDayOfYear(new Date())
    return nowDay / daysInYear
  }

  if (group === GroupBy.Month) {
    const daysInMonth = ((month: number, year: number) =>
      new Date(year, month + 1, 0).getDate())(
      getMonth(new Date()),
      getYear(new Date()),
    )

    return new Date().getDate() / daysInMonth
  }

  return 1
}
