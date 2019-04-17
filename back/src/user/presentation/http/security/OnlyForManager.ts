import { UseGuards } from '@nestjs/common'

import { JwtManagerGuard } from './JwtManagerGuard'

export const OnlyForUsers = () => UseGuards(JwtManagerGuard)
