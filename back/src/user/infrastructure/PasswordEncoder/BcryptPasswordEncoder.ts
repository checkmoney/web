import * as bcrypt from 'bcryptjs'
import { promisify } from 'util'

import { PasswordEncoder } from './PasswordEncoder'

export class BcryptPasswordEncoder implements PasswordEncoder {
  private readonly getHash: (raw: string, saltRounds: number) => Promise<string>
  private readonly compare: (raw: string, encoded: string) => Promise<boolean>

  public constructor() {
    this.getHash = promisify(bcrypt.hash)
    this.compare = promisify(bcrypt.compare)
  }

  public encodePassword(raw: string) {
    const SALT_ROUNDS = 12

    return this.getHash(raw, SALT_ROUNDS)
  }

  public isPasswordValid(encoded: string, raw: string) {
    return this.compare(raw, encoded)
  }
}
