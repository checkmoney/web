import { addHours } from 'date-fns'

export const wantUTC = <T extends []>(f: (d: Date, ...args: T) => Date) => (
  date: Date,
  ...args: T
) => {
  const newDate = f(date, ...args)

  return addHours(newDate, -newDate.getTimezoneOffset() / 60)
}
