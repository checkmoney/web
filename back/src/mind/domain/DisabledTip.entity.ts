import { addYears } from 'date-fns';
import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';

import { User } from '&back/user/domain/User.entity';

@Entity()
export class DisabledTip {
  @PrimaryColumn()
  public readonly token: string;

  @ManyToOne(type => User, { primary: true })
  public readonly user: User;

  @Column()
  public readonly expireAt: Date;

  public constructor(token: string, user: User, expireAt: Date = null) {
    this.token = token;
    this.user = user;

    // I guess my app will die after 100 years 🤓
    // if not: people from the future, please forgive me
    this.expireAt = !!expireAt ? expireAt : addYears(new Date(), 100);
  }
}
