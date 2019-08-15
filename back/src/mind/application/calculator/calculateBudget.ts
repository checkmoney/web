import { getDate, getDaysInMonth } from 'date-fns';

interface Money {
  previousMonthIncome: number;
  thisMonthOutcome: number;
  todayOutcome: number;
}

export const calculateBudget = (money: Money, date: Date) => {
  const { previousMonthIncome, thisMonthOutcome, todayOutcome } = money;
  const daysInMonth = getDaysInMonth(date);
  const dayOfMonth = getDate(date);

  const expectedProfit = previousMonthIncome - thisMonthOutcome;
  const daysRemainInMonth = daysInMonth - dayOfMonth + 1;

  const amount = expectedProfit / daysRemainInMonth - todayOutcome;

  if (amount < 0) {
    return 0;
  }

  return Math.round(amount);
};
