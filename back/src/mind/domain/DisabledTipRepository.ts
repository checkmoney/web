import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DisabledTip } from './DisabledTip.entity';

@Injectable()
class DisabledTipRepo {
  public constructor(
    @InjectRepository(DisabledTip)
    private readonly disabledTipRepo: Repository<DisabledTip>,
  ) {}

  public async findTokens(userLogin: string): Promise<string[]> {
    const now = new Date().toISOString();

    const result = await this.disabledTipRepo
      .createQueryBuilder('tip')
      .innerJoin('tip.user', 'user', 'user.login = :userLogin', {
        userLogin,
      })
      .where('tip.expireAt >= :now', { now })
      .getMany();

    return result.map(({ token }) => token);
  }
}

export const DisabledTipRepository = DisabledTipRepo;
export type DisabledTipRepository = DisabledTipRepo;
