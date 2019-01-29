import { Module } from '@nestjs/common'

import ConfigurationFactory from './ConfigationFactory'

const configProvider = ConfigurationFactory.provider()

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigModule {}
