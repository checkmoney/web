import { Column } from 'typeorm';

import { Currency } from '&shared/enum/Currency';
import { ProfileModel } from '&shared/models/user/ProfileModel';

export class Profile implements ProfileModel {
  @Column()
  public defaultCurrency: Currency = Currency.USD;

  @Column()
  public weekStartsOnMonday: boolean = true;
}
