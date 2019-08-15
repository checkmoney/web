import { Controller, Get, Body, Post } from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

import { TipsCreator } from '&back/mind/application/TipsCreator';
import { TipsDisabler } from '&back/mind/application/TipsDisabler';
import { TipsFilter } from '&back/mind/application/TipsFilter';
import { AdviserUnity } from '&back/mind/infrastructure/adviser/AdviserUnity';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForManager } from '&back/user/presentation/http/security/OnlyForManager';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { TipResponse } from '../reponse/TipResponse';
import { CustomTipRequest } from '../request/CustomTipRequest';
import { DisableTipRequest } from '../request/DisableTipRequest';

@Controller('mind/tip')
@OnlyForUsers()
@ApiUseTags('mind')
@ApiBearerAuth()
export class TipController {
  public constructor(
    private readonly adviser: AdviserUnity,
    private readonly tipsFilter: TipsFilter,
    private readonly tipsDisabler: TipsDisabler,
    private readonly tipsCreator: TipsCreator,
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
    user: TokenPayloadModel,
  ): Promise<TipResponse[]> {
    const allTips = await this.adviser.giveAdvice(user.login);

    const activeTips = await this.tipsFilter.filter(allTips, user.login);

    return activeTips;
  }

  @Post('disable')
  @ApiOperation({ title: 'Disable tips' })
  @ApiOkResponse({ description: 'Disabled' })
  public async disable(
    @CurrentUser() user: TokenPayloadModel,
    @Body() request: DisableTipRequest,
  ) {
    await this.tipsDisabler.disable(request.tokens, user.login);
  }

  @Post('create')
  @OnlyForManager()
  @ApiOperation({ title: 'Create custom tip' })
  @ApiOkResponse({ description: 'Created' })
  public async create(@Body() request: CustomTipRequest) {
    await this.tipsCreator.createCustom(request);
  }
}
