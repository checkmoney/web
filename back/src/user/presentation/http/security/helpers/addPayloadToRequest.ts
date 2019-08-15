import { ExecutionContext } from '@nestjs/common';

import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

export const addPayloadToRequest = (
  payload: TokenPayloadModel,
  executionContext: ExecutionContext,
): void => {
  executionContext.switchToHttp().getRequest().user = payload;
};
