import { format } from 'date-fns'

export const createMonthTitle = (t: (key: string) => string, date: Date) =>
  `${t(`months:${format(date, 'MM')}`)} ${format(date, 'YYYY')}`
