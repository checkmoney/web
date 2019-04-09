import { Option } from 'tsoption'
import { Column } from 'typeorm'
import { Currency } from '@shared/enum/Currency'

export class Profile {
  public get name(): Option<string> {
    return Option.of(this._name)
  }

  public get defaultCurrency(): Currency {
    return this._defaultCurrency
  }

  @Column({ nullable: true })
  private _name?: string

  @Column()
  private _defaultCurrency?: Currency = Currency.USD

  public constructor(name?: string, defaultCurrency = Currency.USD) {
    this._name = name
    this._defaultCurrency = defaultCurrency
  }

  public changeName(newName: string): void {
    if (!!newName && newName.length < 1) {
      this.removeName()
      return
    }

    this._name = newName
  }

  public removeName(): void {
    this._name = undefined
  }

  public changeCurrency(currensy: Currency): void {
    this._defaultCurrency = currensy
  }
}
