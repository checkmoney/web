import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'

@Injectable()
export class EntitySaver {
  public constructor(
    @InjectEntityManager() private readonly em: EntityManager,
  ) {}

  public async save<Entity>(...entities: Entity[]): Promise<void> {
    await this.em.save(entities)
  }

  public async remove<Entity>(...entities: Entity[]): Promise<void> {
    await this.em.remove(entities)
  }
}
