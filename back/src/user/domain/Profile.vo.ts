import { Option } from 'tsoption'
import { Column } from 'typeorm'
import { Currency } from '@shared/enum/Currency'

export class Profile {
  public get name(): Option<string> {
    return Option.of(this._name)
  }

  public get currency(): Currency {
    return this._currency
  }

  @Column({ nullable: true })
  private _name?: string

  @Column({ nullable: true })
  public _currency?: Currency

  public constructor(name?: string, currency = Currency.USD) {
    this._name = name
    this._currency = currency
  }

  public changeName(newName: string): void {
    if (newName.length < 1) {
      this.removeName()
      return
    }

    this._name = newName
  }

  public removeName(): void {
    this._name = undefined
  }

  public changeCurrency(currensy: Currency): void {
    this._currency = currensy
  }
}
