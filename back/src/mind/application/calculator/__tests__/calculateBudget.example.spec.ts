import { calculateBudget } from '../calculateBudget'

describe('calculateBudget#example', () => {
  test('should return full budget for empty this month outcome at end of month', () => {
    const budget = calculateBudget(
      {
        previousMonthIncome: 1000,
        thisMonthOutcome: 0,
        todayOutcome: 100,
      },
      { dayOfMonth: 31, daysInMonth: 31 },
    )

    expect(budget).toBe(900)
  })

  test('should return correct budget for some this month outcome at middle of month', () => {
    const budget = calculateBudget(
      {
        previousMonthIncome: 1000,
        thisMonthOutcome: 500,
        todayOutcome: 50,
      },
      { dayOfMonth: 27, daysInMonth: 31 },
    )

    expect(budget).toBe(50)
  })

  test('should return correct budget for some this month outcome at start of month', () => {
    const budget = calculateBudget(
      {
        previousMonthIncome: 3100,
        thisMonthOutcome: 0,
        todayOutcome: 80,
      },
      { dayOfMonth: 1, daysInMonth: 31 },
    )

    expect(budget).toBe(20)
  })
})
