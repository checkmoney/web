import { format } from 'date-fns'

export const createMonthTitle = (date: Date) => format(date, 'MMMM YYYY')
