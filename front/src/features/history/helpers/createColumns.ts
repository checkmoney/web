import { displayNullableDate } from '$front/helpers/displayNullableDtae'

export const createColumns = (
  t: (key: string) => string,
  commentKey: string,
  commentTitle: string = commentKey,
) => ({
  date: {
    title: t('transaction:date'),
    transform: displayNullableDate,
    widthPercent: 30,
  },
  amount: {
    title: t('transaction:amount'),
    widthPercent: 30,
  },
  [commentKey]: {
    title: t(`transaction:${commentTitle}`),
    widthPercent: 40,
  },
})
