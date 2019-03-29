import { Injectable } from '@nestjs/common'

import { IncomeRepository } from '@back/money/domain/IncomeRepository'
import { OutcomeRepository } from '@back/money/domain/OutcomeRepository'
import { EntitySaver } from '@back/db/EntitySaver'

@Injectable()
export class TypoMerger {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async merge(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    await Promise.all([
      this.mergeInIncomes(primary, secondary, userLogin),
      this.mergeInOutcomes(primary, secondary, userLogin),
    ])
  }

  private async mergeInIncomes(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    const [mainIncomes, incomes] = await Promise.all([
      this.incomeRepo.findBySourcesForUser([primary], userLogin),
      this.incomeRepo.findBySourcesForUser(secondary, userLogin),
    ])

    if (mainIncomes.length === 0) {
      return
    }

    incomes.forEach(income => {
      income.source = primary
    })

    await this.entitySaver.save(...incomes)
  }

  private async mergeInOutcomes(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    const [mainOutcomes, outcomes] = await Promise.all([
      this.outcomeRepo.findByCategoriesForUser([primary], userLogin),
      this.outcomeRepo.findByCategoriesForUser(secondary, userLogin),
    ])

    if (mainOutcomes.length === 0) {
      return
    }

    outcomes.forEach(outcome => {
      outcome.category = primary
    })

    await this.entitySaver.save(...outcomes)
  }
}
