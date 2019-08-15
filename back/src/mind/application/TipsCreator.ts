import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator';
import { CustomTipModel } from '&shared/models/mind/CustomTipModel';

import { CustomTip } from '../domain/CustomTip.entity';

@Injectable()
export class TipsCreator {
  public constructor(
    private readonly entitySaver: EntitySaver,
    private readonly idGenerator: IdGenerator,
  ) {}

  public async createCustom(fields: CustomTipModel): Promise<void> {
    const id = await this.idGenerator.getId();
    const { title, text, expireAt, important, link } = fields;

    const tip = new CustomTip(id, title, text, expireAt, important, link);

    await this.entitySaver.save(tip);
  }
}
