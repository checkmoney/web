import { AbstractTransaction } from '@back/money/domain/dto/AbstarctTransaction'

export const amountMapper = (item: AbstractTransaction) => item.amount
