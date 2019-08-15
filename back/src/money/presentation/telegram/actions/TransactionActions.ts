import { Injectable } from '@nestjs/common';
import { Context, PipeContext, TelegramActionHandler } from 'nest-telegram';

import { Accountant } from '&back/money/application/Accountant';
import { CurrentSender } from '&back/user/presentation/telegram/transformer/CurrentSender';
import { Templating } from '&back/utils/infrastructure/Templating/Templating';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { parseAmount } from '../helpers/parseAmount';
import { parseCurrency } from '../helpers/parseCurrency';

@Injectable()
export class TransactionActions {
  public constructor(
    private readonly accountant: Accountant,
    private readonly templating: Templating,
  ) {}

  @TelegramActionHandler({ command: '/income' })
  public async income(
    ctx: Context,
    @PipeContext(CurrentSender) { login }: TokenPayloadModel,
  ) {
    const [_, rawAmount, rawCurrency, ...source] = ctx.message.text.split(' ');

    // TODO: Add message parser to nest-telegram lib as decorator
    const incomeFields = {
      amount: parseAmount(rawAmount),
      currency: parseCurrency(rawCurrency),
      date: new Date(),
      source: source.join(' '),
    };

    await this.accountant.income(login, incomeFields);

    const responseText = await this.templating.render(
      'telegram/income-created',
      incomeFields,
    );

    await ctx.reply(responseText);
  }

  @TelegramActionHandler({ command: '/outcome' })
  public async outcomeByCommand(
    ctx: Context,
    @PipeContext(CurrentSender) { login }: TokenPayloadModel,
  ) {
    const [
      _,
      rawAmount,
      rawCurrency,
      ...categoryParts
    ] = ctx.message.text.split(' ');

    await this.createOutcome(ctx, login, rawAmount, rawCurrency, categoryParts);
  }

  @TelegramActionHandler({ message: /^(\d+) (\w+) (.+)/g })
  public async outcomeByMessage(
    ctx: Context,
    @PipeContext(CurrentSender) { login }: TokenPayloadModel,
  ) {
    const [rawAmount, rawCurrency, ...categoryParts] = ctx.message.text.split(
      ' ',
    );

    await this.createOutcome(ctx, login, rawAmount, rawCurrency, categoryParts);
  }

  private async createOutcome(
    ctx: Context,
    login: string,
    rawAmount: string,
    rawCurrency: string,
    categoryParts: string[],
  ) {
    // TODO: Add message parser to nest-telegram lib as decorator
    const outcomeFields = {
      amount: parseAmount(rawAmount),
      currency: parseCurrency(rawCurrency),
      date: new Date(),
      category: categoryParts.join(' '),
    };

    await this.accountant.outcome(login, outcomeFields);

    const responseText = await this.templating.render(
      'telegram/outcome-created',
      outcomeFields,
    );

    await ctx.reply(responseText);
  }
}
