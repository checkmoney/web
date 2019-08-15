import { Injectable } from '@nestjs/common';

import { IncomeModel } from '&shared/models/money/IncomeModel';
import { OutcomeModel } from '&shared/models/money/OutcomeModel';
import { EntitySaver } from '&back/db/EntitySaver';
import { UserRepository } from '&back/user/domain/UserRepository';
import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator';
import { LogicException } from '&back/utils/infrastructure/exception/LogicException';
import { EntityNotFoundException } from '&back/utils/domain/EntityNotFoundException';

import { Income } from '../domain/Income.entity';
import { Outcome } from '../domain/Outcome.entity';
import { IncomeRepository } from '../domain/IncomeRepository';
import { OutcomeRepository } from '../domain/OutcomeRepository';
import { normalizeComment } from './helpers/normalizeComment';

@Injectable()
export class Accountant {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly entitySaver: EntitySaver,
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
  ) {}

  public async income(
    userLogin: string,
    incomeFields: IncomeModel,
  ): Promise<void> {
    const [user, incomeId] = await Promise.all([
      this.userRepo.getOne(userLogin),
      this.idGenerator.getId(),
    ]);

    const { amount, currency, source, date } = incomeFields;

    const income = new Income(
      incomeId,
      amount,
      currency,
      normalizeComment(source),
      date || new Date(),
      user,
    );

    await this.entitySaver.save(income);
  }

  public async outcome(
    userLogin: string,
    outcomeFields: OutcomeModel,
  ): Promise<void> {
    const [user, outcomeId] = await Promise.all([
      this.userRepo.getOne(userLogin),
      this.idGenerator.getId(),
    ]);

    const { amount, currency, category, date } = outcomeFields;

    const outcome = new Outcome(
      outcomeId,
      amount,
      currency,
      normalizeComment(category),
      date || new Date(),
      user,
    );

    await this.entitySaver.save(outcome);
  }

  public async remove(transactionId: string, userLogin: string): Promise<void> {
    const [income, outcome] = await Promise.all([
      this.incomeRepo.findForUser(transactionId, userLogin),
      this.outcomeRepo.findForUser(transactionId, userLogin),
    ]);

    if (income.nonEmpty() && outcome.nonEmpty()) {
      throw new LogicException(
        `Id collision (${transactionId}) between Income and Outcome`,
      );
    }

    if (income.isEmpty() && outcome.isEmpty()) {
      throw new EntityNotFoundException('Transaction', {
        id: transactionId,
        authorLogin: userLogin,
      });
    }

    if (income.nonEmpty()) {
      await this.entitySaver.remove(income.get());
    }

    if (outcome.nonEmpty()) {
      await this.entitySaver.remove(outcome.get());
    }
  }
}
