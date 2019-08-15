import { Provider } from '@nestjs/common';
import { DotEnvConfiguration, EnvConfiguration } from '@solid-soda/config';
import * as path from 'path';

import { Configuration } from './Configuration';

const isDev = () => process.env.NODE_ENV === 'development';

export default class ConfigurationFactory {
  public static create(): Configuration {
    if (isDev()) {
      return new DotEnvConfiguration(path.resolve(__dirname, '../../.env'));
    }

    return new EnvConfiguration();
  }

  public static provider(): Provider {
    return {
      provide: Configuration,
      useValue: ConfigurationFactory.create(),
    };
  }
}
