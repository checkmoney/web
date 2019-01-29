import { UseGuards } from '@nestjs/common'

import { JwtGuard } from './JwtGuard'

export const OnlyForUsers = () => UseGuards(JwtGuard)
