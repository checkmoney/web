import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Currency } from '@shared/enum/Currency'

import { User } from '@back/user/domain/User.entity'

@Entity()
export class Outcome {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public readonly amount: number

  @Column({ type: 'enum', enum: Currency })
  public readonly currency: Currency

  @Column()
  public readonly date: Date

  @Column()
  public readonly category: string

  @ManyToOne(type => User)
  public readonly author: User

  public constructor(
    id: string,
    amount: number,
    currency: Currency,
    category: string,
    date: Date,
    author: User,
  ) {
    this.id = id
    this.amount = amount
    this.currency = currency
    this.category = category
    this.date = date
    this.author = author
  }
}