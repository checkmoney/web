import { Column, Entity, PrimaryColumn } from 'typeorm';

import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder';
import { Profile } from './Profile.vo';

@Entity()
export class User {
  @PrimaryColumn()
  public readonly login: string;

  @Column(type => Profile)
  public readonly profile: Profile;

  @Column()
  public readonly isManager: boolean = false;

  @Column()
  public email: string | undefined;

  @Column()
  private password: string | undefined;

  @Column()
  private telegramId: string | undefined;

  @Column()
  private googleId: string | undefined;

  public constructor(login: string) {
    this.login = login;

    this.profile = new Profile();
  }

  public async changePassword(
    rawPassword: string,
    encoder: PasswordEncoder,
  ): Promise<void> {
    this.password = await encoder.encodePassword(rawPassword);
  }

  public async isPasswordValid(
    rawPassword: string,
    encoder: PasswordEncoder,
  ): Promise<boolean> {
    return encoder.isPasswordValid(this.password, rawPassword);
  }

  public attachTelegram(telegramId: number): void {
    this.telegramId = telegramId.toString();
  }

  public attachGoogle(googleId: string): void {
    this.googleId = googleId;
  }
}
