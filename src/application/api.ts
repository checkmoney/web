import { createEffect, attach } from 'effector';
import axios, { AxiosError } from 'axios';
import { stringify } from 'qs';

import { $configuration } from '&front/application/configuration';
import { errorHappened } from '&front/application/notify';
import { $token } from '&front/application/viewer';
import { sleep } from '&front/shared';

const DEFAULT_ATTEMPT_THRESHOLD = 4;

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

interface Request {
  path: string;
  query?: Record<string, number | boolean | string | Date>;
  body?: object;
  method: Method;
  attemptThreshold?: number;
}

interface InternalRequest extends Request {
  token: string | null;
  attempt: number;
}

const requestInternalFx = createEffect<InternalRequest, any, AxiosError>({
  handler: async ({ path, method, query, body, token }) => {
    const { data } = await axios({
      url: `${path}?${stringify(query || {})}`,
      method,
      data: body,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });

    return data;
  },
});

requestInternalFx.fail.watch(async ({ params, error }) => {
  const { attemptThreshold, attempt } = params;
  const threshold = params.attemptThreshold || DEFAULT_ATTEMPT_THRESHOLD;

  if (params.attempt < threshold) {
    await sleep(attempt * 500);
    requestInternalFx({ ...params, attemptThreshold, attempt: attempt + 1 });
  } else {
    errorHappened(error.response?.data.message ?? error.message);
  }
});

const requestFx = attach({
  source: {
    config: $configuration,
    token: $token,
  },
  effect: requestInternalFx,
  mapParams: ({ path, ...rest }: Request, { config, token }) => {
    const prefix = path.includes('statistics')
      ? config.statsUrl
      : config.backUrl;

    return {
      ...rest,
      path: `${prefix}${path}`,
      token,
      attempt: 0,
    };
  },
});

export { requestFx };
