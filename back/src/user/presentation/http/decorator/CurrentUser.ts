import { createParamDecorator } from '@nestjs/common'

import { TokenPayload } from '@back/user/application/dto/TokenPayload'
import { LogicException } from '@back/utils/infrastructure/exception/LogicException'

export const CurrentUser = createParamDecorator(
  async (_, req): Promise<TokenPayload> => {
    const payload: TokenPayload = req.user

    if (!payload) {
      throw new LogicException('Try to get current user in anonymous endpoint!')
    }

    return payload
  },
)
