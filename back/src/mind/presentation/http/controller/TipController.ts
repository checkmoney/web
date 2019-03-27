import { Controller, Get } from '@nestjs/common'
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

import { TipResponse } from '../reponse/TipResponse'

@Controller('mind/tip')
@OnlyForUsers()
@ApiUseTags('mind')
@ApiBearerAuth()
export class TipController {
  public constructor(private readonly adviser: AdviserUnity) {}

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
    return this.adviser.giveAdvice(user.login)
  }
}
