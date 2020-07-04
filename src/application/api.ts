import { createEffect, attach } from 'effector';
import { stringify } from 'qs';
import axios, { AxiosError } from 'axios';

import { $configuration } from '&front/application/configuration';
import { errorHappened } from '&front/application/notify';
import { $token } from '&front/application/viewer';

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

requestInternalFx.fail.watch(({ params }) => {
  const { attemptThreshold, attempt } = params;
  const threshold = params.attemptThreshold || DEFAULT_ATTEMPT_THRESHOLD;

  if (params.attempt < threshold) {
    requestInternalFx({ ...params, attemptThreshold, attempt: attempt + 1 });
  }
});

const requestFx = attach({
  source: {
    backUrl: $configuration.map(({ backUrl }) => backUrl),
    token: $token.map((t) => t),
  },
  effect: requestInternalFx,
  mapParams: ({ path, ...config }: Request, { backUrl, token }) => {
    return {
      ...config,
      path: `${backUrl}${path}`,
      token,
      attempt: 0,
    };
  },
});
requestFx.failData.watch((error) =>
  errorHappened(error.response?.data.message ?? error.message),
);

export { requestFx };
