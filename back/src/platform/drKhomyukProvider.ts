import { DrKhomyuk } from '@checkmoney/soap-opera';

import { Configuration } from '&back/config/Configuration';

export const drKhomyukProvider = {
  provide: DrKhomyuk,
  useFactory: (config: Configuration) => {
    const serviceUrl = config.getStringOrThrow('MR_KHOMYUK_URL');

    return new DrKhomyuk(serviceUrl);
  },
  inject: [Configuration],
};
