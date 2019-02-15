import { Column, Entity, PrimaryColumn } from 'typeorm'

import { Currency } from '@shared/enum/Currency'

@Entity()
export class ExchangeRate {
  @PrimaryColumn({ type: 'enum', enum: Currency })
  public readonly from: Currency

  @PrimaryColumn({ type: 'enum', enum: Currency })
  public readonly to: Currency

  @Column()
  public readonly due: Date

  @Column({ type: 'double' })
  public readonly rate: number

  public constructor(from: Currency, to: Currency, due: Date, rate: number) {
    this.from = from
    this.to = to
    this.due = due
    this.rate = rate
  }
}
