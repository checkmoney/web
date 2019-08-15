import { createParamDecorator } from '@nestjs/common';

import { LogicException } from '&back/utils/infrastructure/exception/LogicException';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

export const CurrentUser = createParamDecorator(
  async (_, req): Promise<TokenPayloadModel> => {
    const payload: TokenPayloadModel = req.user;

    if (!payload) {
      throw new LogicException(
        'Try to get current user in anonymous endpoint!',
      );
    }

    return payload;
  },
);
