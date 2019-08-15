import { UseGuards } from '@nestjs/common';

import { JwtManagerGuard } from './JwtManagerGuard';

export const OnlyForManager = () => UseGuards(JwtManagerGuard);
