import { displayNullableDate } from '&front/helpers/displayNullableDtae';

const commentMap = {
  category: 'Категория',
  source: 'Источник',
  comment: 'Комментарий',
};

type Comment = 'category' | 'source' | 'comment';
export const createColumns = (
  commentKey: Comment,
  commentTitle: Comment = commentKey,
) => ({
  date: {
    title: 'Дата',
    transform: displayNullableDate,
    widthPercent: 30,
  },
  amount: {
    title: 'Сумма',
    widthPercent: 30,
  },
  [commentKey]: {
    title: commentMap[commentTitle],
    widthPercent: 40,
  },
});
