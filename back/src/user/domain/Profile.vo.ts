import { Option } from 'tsoption'
import { Column } from 'typeorm'

import { Currency } from '@shared/enum/Currency'

export class Profile {
  public get defaultCurrency(): Currency {
    return this._defaultCurrency
  }

  @Column()
  private _defaultCurrency?: Currency = Currency.USD

  public constructor(defaultCurrency = Currency.USD) {
    this._defaultCurrency = defaultCurrency
  }

  public changeCurrency(currensy: Currency): void {
    this._defaultCurrency = currensy
  }
}
