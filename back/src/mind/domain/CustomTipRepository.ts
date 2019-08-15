import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomTip } from './CustomTip.entity';

@Injectable()
class CustomTipRepo {
  public constructor(
    @InjectRepository(CustomTip)
    private readonly customTipRepo: Repository<CustomTip>,
  ) {}

  public async findActual(): Promise<CustomTip[]> {
    const now = new Date().toISOString();

    return this.customTipRepo
      .createQueryBuilder('tip')
      .where('tip.expireAt >= :now', { now })
      .getMany();
  }
}

export const CustomTipRepository = CustomTipRepo;
export type CustomTipRepository = CustomTipRepo;
