import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserRepository } from '&back/user/domain/UserRepository';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

@Controller('det-bell/v1')
@OnlyForUsers()
@ApiBearerAuth()
export class DetBellController {
  public constructor(private readonly userRepo: UserRepository) {}

  @Get('default-currency')
  public async fetchDefaultCurrency(@CurrentUser()
  {
    login,
  }: TokenPayloadModel) {
    const defaultCurrency = await this.userRepo.getDefaultCurrency(login);

    return defaultCurrency;
  }
}
