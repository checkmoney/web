import { DrKhomyuk, DetBell } from '@checkmoney/soap-opera';
import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { UserRepository } from '&back/user/domain/UserRepository';
import { EntityNotFoundException } from '&back/utils/domain/EntityNotFoundException';
import { LogicException } from '&back/utils/infrastructure/exception/LogicException';
import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator';
import { IncomeModel } from '&shared/models/money/IncomeModel';
import { OutcomeModel } from '&shared/models/money/OutcomeModel';

import { Income } from '../domain/Income.entity';
import { IncomeRepository } from '../domain/IncomeRepository';
import { Outcome } from '../domain/Outcome.entity';
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
    private readonly statistics: DrKhomyuk,
    private readonly users: DetBell,
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
    await this.sendNotification(userLogin);
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
    await this.sendNotification(userLogin);
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

    await this.sendNotification(userLogin);
  }

  private async sendNotification(userId: string) {
    const token = await this.users.pretend(userId);
    await this.statistics.triggers.transaction(token);
  }
}
