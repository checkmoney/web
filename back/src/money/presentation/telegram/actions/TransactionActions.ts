import { Injectable } from '@nestjs/common'
import { Context, PipeContext, TelegramActionHandler } from 'nest-telegram'

import { CurrentSender } from '@back/user/presentation/telegram/transformer/CurrentSender'
import { TokenPayloadModel } from '@shared/models/user/TokenPayloadModel'
import { Accountant } from '@back/money/application/Accountant'
import { Templating } from '@back/utils/infrastructure/Templating/Templating'
import { parseCurrency } from '../helpers/parseCurrency'
import { parseAmount } from '../helpers/parseAmount'

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
    const [_, rawAmount, rawCurrency, ...source] = ctx.message.text.split(' ')

    // TODO: Add message parser to nest-telegram lib as decorator
    const incomeFields = {
      amount: parseAmount(rawAmount),
      currency: parseCurrency(rawCurrency),
      date: new Date(),
      source: source.join(' '),
    }

    await this.accountant.income(login, incomeFields)

    const responseText = await this.templating.render(
      'telegram/income-created',
      incomeFields,
    )

    await ctx.reply(responseText)
  }

  @TelegramActionHandler({ command: '/outcome' })
  public async outcome(
    ctx: Context,
    @PipeContext(CurrentSender) { login }: TokenPayloadModel,
  ) {
    const [_, rawAmount, rawCurrency, ...category] = ctx.message.text.split(' ')

    // TODO: Add message parser to nest-telegram lib as decorator
    const outcomeFields = {
      amount: parseAmount(rawAmount),
      currency: parseCurrency(rawCurrency),
      date: new Date(),
      category: category.join(' '),
    }

    await this.accountant.outcome(login, outcomeFields)

    const responseText = await this.templating.render(
      'telegram/outcome-created',
      outcomeFields,
    )

    await ctx.reply(responseText)
  }
}
