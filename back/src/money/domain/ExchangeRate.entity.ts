import { Column, Entity, PrimaryColumn } from 'typeorm'

import { Currency } from '$shared/enum/Currency'

@Entity()
export class ExchangeRate {
  @PrimaryColumn({ type: 'enum', enum: Currency })
  public readonly from: Currency

  @PrimaryColumn({ type: 'enum', enum: Currency })
  public readonly to: Currency

  @PrimaryColumn()
  public readonly collectAt: Date

  @Column({ type: 'float' })
  public readonly rate: number

  public constructor(
    from: Currency,
    to: Currency,
    collectAt: Date,
    rate: number,
  ) {
    this.from = from
    this.to = to
    this.collectAt = collectAt
    this.rate = rate
  }
}
