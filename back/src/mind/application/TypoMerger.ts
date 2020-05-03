import { DetBell, DrKhomyuk } from '@checkmoney/soap-opera';
import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { IncomeRepository } from '&back/money/domain/IncomeRepository';
import { OutcomeRepository } from '&back/money/domain/OutcomeRepository';
import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator';

@Injectable()
export class TypoMerger {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
    private readonly entitySaver: EntitySaver,
    private readonly idGenerator: IdGenerator,
    private readonly users: DetBell,
    private readonly statistics: DrKhomyuk,
  ) {}

  public async merge(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    await Promise.all([
      this.mergeInIncomes(primary, secondary, userLogin),
      this.mergeInOutcomes(primary, secondary, userLogin),
    ]);

    const token = await this.users.pretend(userLogin);
    await this.statistics.triggers.transaction(token);
  }

  private async mergeInIncomes(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    const [mainIncomes, incomes] = await Promise.all([
      this.incomeRepo.findBySourcesForUser([primary], userLogin),
      this.incomeRepo.findBySourcesForUser(secondary, userLogin),
    ]);

    if (mainIncomes.length === 0) {
      return;
    }

    const newIncomes = await Promise.all(
      incomes.map(async income => {
        const id = await this.idGenerator.getId();
        return income.clone(id);
      }),
    );
    newIncomes.forEach(income => {
      income.source = primary;
    });

    await this.entitySaver.em.transaction(async em => {
      await em.remove(incomes);
      await em.save(newIncomes);
    });
  }

  private async mergeInOutcomes(
    primary: string,
    secondary: string[],
    userLogin: string,
  ): Promise<void> {
    const [mainOutcomes, outcomes] = await Promise.all([
      this.outcomeRepo.findByCategoriesForUser([primary], userLogin),
      this.outcomeRepo.findByCategoriesForUser(secondary, userLogin),
    ]);

    if (mainOutcomes.length === 0) {
      return;
    }

    const newOutcomes = await Promise.all(
      outcomes.map(async outcome => {
        const id = await this.idGenerator.getId();
        return outcome.clone(id);
      }),
    );
    newOutcomes.forEach(outcome => {
      outcome.category = primary;
    });

    await this.entitySaver.em.transaction(async em => {
      await em.remove(outcomes);
      await em.save(newOutcomes);
    });
  }
}
