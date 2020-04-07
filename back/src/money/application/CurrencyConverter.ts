import { MrSolomons } from '@checkmoney/soap-opera';
import { Injectable } from '@nestjs/common';

import { Currency } from '&shared/enum/Currency';

import { ConversationFailedException } from './exception/ConversationFailedException';

@Injectable()
export class CurrencyConverter {
  public constructor(private readonly solomons: MrSolomons) {}

  public async convert(
    from: Currency,
    to: Currency,
    amount: number,
    when: Date,
  ): Promise<number> {
    try {
      const result = await this.solomons
        .convert({ amount: amount.toString(), from, to, date: when })
        .then(Number);

      return result;
    } catch (error) {
      throw new ConversationFailedException(from, to, when);
    }
  }
}
