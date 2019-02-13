import { Injectable } from '@nestjs/common'

import { IncomeModel } from '@shared/models/money/IncomeModel'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { EntitySaver } from '@back/db/EntitySaver'
import { UserRepository } from '@back/user/domain/UserRepository'
import { IdGenerator } from '@back/utils/infrastructure/IdGenerator/IdGenerator'

import { Income } from '../domain/Income.entity'
import { Outcome } from '../domain/Outcome.entity'

@Injectable()
export class Accountant {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async income(
    userLogin: string,
    incomeFields: IncomeModel,
  ): Promise<void> {
    const [user, incomeId] = await Promise.all([
      this.userRepo.getOne(userLogin),
      this.idGenerator.getId(),
    ])

    const { amount, currency, source, date } = incomeFields

    const income = new Income(
      incomeId,
      amount,
      currency,
      source,
      date || new Date(),
      user,
    )

    await this.entitySaver.save(income)
  }

  public async outcome(
    userLogin: string,
    outcomeFields: OutcomeModel,
  ): Promise<void> {
    const [user, outcomeId] = await Promise.all([
      this.userRepo.getOne(userLogin),
      this.idGenerator.getId(),
    ])

    const { amount, currency, category, date } = outcomeFields

    const outcome = new Outcome(
      outcomeId,
      amount,
      currency,
      category,
      date || new Date(),
      user,
    )

    await this.entitySaver.save(outcome)
  }
}
