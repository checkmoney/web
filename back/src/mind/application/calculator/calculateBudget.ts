interface Money {
  previousMonthIncome: number
  thisMonthOutcome: number
  todayOutcome: number
}

interface Period {
  dayOfMonth: number
  daysInMonth: number
}

export const calculateBudget = (money: Money, period: Period) => {
  const { previousMonthIncome, thisMonthOutcome, todayOutcome } = money
  const { daysInMonth, dayOfMonth } = period

  const expectedProfit = previousMonthIncome - thisMonthOutcome
  const daysRemainInMonth = daysInMonth - dayOfMonth + 1

  const amount = expectedProfit / daysRemainInMonth - todayOutcome

  if (amount < 0) {
    return 0
  }

  return Math.round(amount)
}
