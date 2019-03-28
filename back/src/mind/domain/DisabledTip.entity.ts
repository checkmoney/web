import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { addYears } from 'date-fns'
import { User } from '@back/user/domain/User.entity'

@Entity()
export class DisabledTip {
  // Token must identify tip (include "for who")
  @PrimaryColumn()
  public readonly token: string

  @Column()
  public readonly expireAt: Date

  @ManyToOne(type => User)
  public readonly user: User

  public constructor(token: string, user: User, expireAt: Date = null) {
    this.token = token
    this.user = user

    // I guess my app will die after 100 years 🤓
    // if not: people from the future, please forgive me
    this.expireAt = !!expireAt ? expireAt : addYears(new Date(), 100)
  }
}
