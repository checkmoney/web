import { Option } from 'tsoption';

import { DateRange } from '&back/utils/infrastructure/dto/DateRange';

import { AbstractTransaction } from './AbstarctTransaction';

export interface TransactionRepository {
  findForUser(
    id: string,
    userLogin: string,
  ): Promise<Option<AbstractTransaction>>;

  findEarliest(userLogin: string): Promise<Option<AbstractTransaction>>;

  findByRangeForUser(
    userLogin: string,
    range: DateRange,
  ): Promise<AbstractTransaction[]>;
}
