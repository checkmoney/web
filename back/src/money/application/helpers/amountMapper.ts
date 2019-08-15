import { AbstractTransaction } from '&back/money/domain/interfaces/AbstarctTransaction';

export const amountMapper = (item: AbstractTransaction) => item.amount;
