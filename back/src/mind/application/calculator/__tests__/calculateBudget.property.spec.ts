import fc from 'fast-check'

import { calculateBudget } from '../calculateBudget'

type ExactNumber = number | fc.Arbitrary<number>

interface ExactMoney {
  previousMonthIncome?: ExactNumber
  thisMonthOutcome?: ExactNumber
  todayOutcome?: ExactNumber
}

interface ExactPeriod {
  dayOfMonth?: number
  daysInMonth?: number
}

interface MinMax {
  min: number
  max: number
}

const exactOrRandom = (exact?: ExactNumber, options?: MinMax) => {
  if (exact instanceof fc.Arbitrary) {
    return exact
  }

  if (typeof exact !== 'undefined') {
    return fc.constant(exact)
  }

  if (options) {
    return fc.integer(options.min, options.max)
  }

  return fc.integer(0, Number.MAX_VALUE)
}

const moneyArb = (exact: ExactMoney = {}) =>
  fc
    .tuple(
      exactOrRandom(exact.previousMonthIncome),
      exactOrRandom(exact.thisMonthOutcome),
      exactOrRandom(exact.todayOutcome),
    )
    .map(([previousMonthIncome, thisMonthOutcome, todayOutcome]) => ({
      previousMonthIncome,
      thisMonthOutcome,
      todayOutcome,
    }))

const periodArb = (exact: ExactPeriod = {}) =>
  fc
    .tuple(
      exactOrRandom(exact.dayOfMonth, { min: 1, max: 31 }),
      exactOrRandom(exact.daysInMonth || 31),
    )
    .map(([dayOfMonth, daysInMonth]) => ({
      dayOfMonth,
      daysInMonth,
    }))

describe('calculateBudget#property', () => {
  test('should return zero for zero income', () => {
    fc.assert(
      fc.property(
        moneyArb({ previousMonthIncome: 0 }),
        periodArb(),
        (money, period) => calculateBudget(money, period) === 0,
      ),
    )
  })

  test('should return zero for outcome large than income', () => {
    fc.assert(
      fc.property(
        fc.integer(0, Number.MAX_VALUE).chain(income =>
          moneyArb({
            previousMonthIncome: income,
            thisMonthOutcome: fc.integer(income, Number.MAX_VALUE),
          }),
        ),
        periodArb(),
        (money, period) => calculateBudget(money, period) === 0,
      ),
    )
  })

  test('should return proportional income for zero outcome', () => {
    const divideIncomeByDays = (
      income: number,
      day: number,
      daysCount: number,
    ) => Math.round(income / (day + 1 - daysCount))

    fc.assert(
      fc.property(
        moneyArb({
          thisMonthOutcome: 0,
          todayOutcome: 0,
        }),
        periodArb(),
        (money, period) =>
          calculateBudget(money, period) ===
          divideIncomeByDays(
            money.previousMonthIncome,
            period.daysInMonth,
            period.dayOfMonth,
          ),
      ),
    )
  })

  test('should return all income for zero outcome and last day', () => {
    fc.assert(
      fc.property(
        moneyArb({
          thisMonthOutcome: 0,
          todayOutcome: 0,
        }),
        periodArb({
          dayOfMonth: 31,
          daysInMonth: 31,
        }),
        (money, period) =>
          calculateBudget(money, period) === money.previousMonthIncome,
      ),
    )
  })

  test('should never return negative values', () => {
    fc.assert(
      fc.property(
        moneyArb(),
        periodArb(),
        (money, period) => calculateBudget(money, period) >= 0,
      ),
    )
  })

  test('should return all budget for empty previous month outcome', () => {
    fc.assert(
      fc.property(
        moneyArb({
          thisMonthOutcome: 0,
        }),
        periodArb({
          dayOfMonth: 31,
          daysInMonth: 31,
        }),
        (money, period) => {
          const budget = calculateBudget(money, period)
          if (money.previousMonthIncome < money.todayOutcome) {
            return budget === 0
          }
          return budget === money.previousMonthIncome - money.todayOutcome
        },
      ),
    )
  })
})
