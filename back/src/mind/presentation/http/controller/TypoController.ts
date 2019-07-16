import { Controller, Get, Body, Post } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger'

import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers'
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel'
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser'

import { MergeTypoRequest } from '../request/MergeTypoRequest'
import { TypoMerger } from '&back/mind/application/TypoMerger'

@Controller('mind/typo')
@OnlyForUsers()
@ApiUseTags('mind')
@ApiBearerAuth()
export class TypoController {
  public constructor(private readonly merger: TypoMerger) {}

  @Post('merge')
  @ApiOperation({ title: 'Merge typos' })
  @ApiOkResponse({ description: 'Merges' })
  public async showAll(
    @CurrentUser() user: TokenPayloadModel,
    @Body() request: MergeTypoRequest,
  ): Promise<void> {
    await this.merger.merge(request.primary, request.secondary, user.login)
  }
}
