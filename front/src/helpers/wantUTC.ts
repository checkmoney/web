import { addHours } from 'date-fns'

export const wantUTC = <D, T extends any[]>(f: (d: D, ...args: T) => Date) => (
  date: D,
  ...args: T
) => {
  const newDate = f(date, ...args)

  return addHours(newDate, -newDate.getTimezoneOffset() / 60)
}
