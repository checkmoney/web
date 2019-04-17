import { createParamDecorator } from '@nestjs/common'

import { TokenPayloadModel } from '@shared/models/user/TokenPayloadModel'
import { LogicException } from '@back/utils/infrastructure/exception/LogicException'

export const CurrentUser = createParamDecorator(
  async (_, req): Promise<TokenPayloadModel> => {
    const payload: TokenPayloadModel = req.user

    if (!payload) {
      throw new LogicException('Try to get current user in anonymous endpoint!')
    }

    return payload
  },
)
