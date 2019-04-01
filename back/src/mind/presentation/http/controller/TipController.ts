import { Controller, Get, Body, Post } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger'

import { OnlyForUsers } from '@back/user/presentation/http/security/OnlyForUsers'
import { TokenPayload } from '@back/user/application/dto/TokenPayload'
import { CurrentUser } from '@back/user/presentation/http/decorator/CurrentUser'
import { AdviserUnity } from '@back/mind/infrastructure/adviser/AdviserUnity'
import { TipsFilter } from '@back/mind/application/TipsFilter'
import { TipsDisabler } from '@back/mind/application/TipsDisabler'

import { TipResponse } from '../reponse/TipResponse'
import { DisableTipRequest } from '../request/DisableTipRequest'

@Controller('mind/tip')
@OnlyForUsers()
@ApiUseTags('mind')
@ApiBearerAuth()
export class TipController {
  public constructor(
    private readonly adviser: AdviserUnity,
    private readonly tipsFilter: TipsFilter,
    private readonly tipsDisabler: TipsDisabler,
  ) {}

  @Get()
  @ApiOperation({ title: 'Get all available tips' })
  @ApiOkResponse({
    description: 'Fetching tips success',
    type: TipResponse,
    isArray: true,
  })
  public async showAll(
    @CurrentUser()
    user: TokenPayload,
  ): Promise<TipResponse[]> {
    const allTips = await this.adviser.giveAdvice(user.login)

    const activeTips = await this.tipsFilter.filter(allTips, user.login)

    return activeTips
  }

  @Post('disable')
  @ApiOperation({ title: 'Disable tips' })
  @ApiOkResponse({ description: 'Disabled' })
  public async disable(
    @CurrentUser() user: TokenPayload,
    @Body() request: DisableTipRequest,
  ) {
    await this.tipsDisabler.disable(request.tokens, user.login)
  }
}
