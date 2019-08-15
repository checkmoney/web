import { getDate } from 'date-fns';
import fc from 'fast-check';

import { Outcome } from '&back/money/domain/Outcome.entity';
import { User } from '&back/user/domain/User.entity';
import { Currency } from '&shared/enum/Currency';

import { groupHasSameTransaction } from '../groupHasSameTransaction';

const dateArb = (exactDay?: number) =>
  fc
    .tuple(fc.integer(1000, 3000), fc.integer(0, 12), fc.integer(1, 28))
    .map(([year, month, day]) => new Date(year, month, exactDay || day));

const daysGapArb = () => fc.integer(1, Number.MAX_SAFE_INTEGER);

const outcomeArb = (exactDay?: number) =>
  fc
    .tuple(
      fc.string(1, 10),
      fc.integer(1, Number.MAX_SAFE_INTEGER),
      fc.constantFrom(...Object.values(Currency)) as fc.Arbitrary<Currency>,
      fc.lorem(1, false),
      fc.lorem(1, false),
      dateArb(exactDay),
    )
    .map(
      ([id, amount, currency, category, login, date]) =>
        new Outcome(id, amount, currency, category, date, new User(login)),
    );

const groupWithSameOutcomeArb = ({
  amount,
  currency,
  category,
  date,
  author,
}: Outcome) =>
  fc
    .tuple(fc.array(outcomeArb()), fc.string(1, 10), dateArb(getDate(date)))
    .map(([group, id, newDate]) => [
      ...group,
      new Outcome(id, amount, currency, category, newDate, author),
    ]);

describe('groupHasSameTransaction#property', () => {
  test('should return false for empty group', () => {
    fc.assert(
      fc.property(
        daysGapArb(),
        outcomeArb(),
        (daysGap, transaction) =>
          !groupHasSameTransaction([], transaction, daysGap),
      ),
    );
  });

  test('should return true for group with exactly that transaction', () => {
    fc.assert(
      fc.property(
        daysGapArb(),
        outcomeArb(),
        fc.array(outcomeArb()),
        (daysGap, outcome, group) =>
          groupHasSameTransaction([...group, outcome], outcome, daysGap),
      ),
    );
  });

  test('should return true for group with same transaction', () => {
    fc.assert(
      fc.property(
        daysGapArb(),
        outcomeArb().chain(outcome =>
          fc.tuple(fc.constant(outcome), groupWithSameOutcomeArb(outcome)),
        ),
        (daysGap, [outcome, group]) =>
          groupHasSameTransaction(group, outcome, daysGap),
      ),
    );
  });
});
