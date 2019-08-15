import { AbstractTransaction } from '&back/money/domain/interfaces/AbstarctTransaction';
import { DateGroup } from '&back/utils/infrastructure/dateGroups/DateGroup';

export const rangeFilter = ({ from, to }: DateGroup) => ({
  date,
}: AbstractTransaction) => date >= from && date < to;
