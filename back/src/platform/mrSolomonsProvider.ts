import { MrSolomons } from '@checkmoney/soap-opera';

import { Configuration } from '&back/config/Configuration';

const createMrSolomons = (config: Configuration) => {
  const serviceUrl = config.getStringOrThrow('MR_SOLOMONS_URL');

  return new MrSolomons(serviceUrl);
};

export const mrSolomonsProvider = {
  provide: MrSolomons,
  useFactory: createMrSolomons,
  inject: [Configuration],
};
