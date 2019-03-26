import { displayNullableDate } from '@front/helpers/displayNullableDtae'

export const createColumns = (commentKey: string, commentTitle: string) => ({
  date: {
    title: 'Date',
    transform: displayNullableDate,
    widthPercent: 30,
  },
  amount: {
    title: 'Amount',
    widthPercent: 30,
  },
  [commentKey]: {
    title: commentTitle,
    widthPercent: 40,
  },
})
