import { ClassType } from 'class-transformer/ClassTransformer';
import { plainToClass } from 'class-transformer';
import { createEffect, attach } from 'effector';
import { condition } from 'patronum';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'qs';

import { $config } from '&front/application/config';
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

interface Request<T = any> {
  path: string;
  query?: Record<string, number | boolean | string | Date>;
  body?: object;
  method: Method;
  attemptThreshold?: number;
  targetClass?: ClassType<T>;
}

interface InternalRequest<T = any> extends Request<T> {
  token: string | null;
  attempt: number;
}

const requestInternalFx = createEffect<
  InternalRequest,
  AxiosResponse,
  AxiosError
>({
  handler: async ({
    path,
    method,
    query,
    body,
    token,
    targetClass,
    attempt,
  }) => {
    // Lets sleep, if it is a retry call
    await sleep(attempt * 1000);

    const response = await axios({
      url: `${path}?${stringify(query || {})}`,
      method,
      data: body,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });

    const data = targetClass
      ? plainToClass(targetClass, response.data)
      : response.data;

    return {
      ...response,
      data,
    };
  },
});

condition({
  source: requestInternalFx.fail,
  // If we can retry
  if: ({ params }) => {
    const {
      attemptThreshold = DEFAULT_ATTEMPT_THRESHOLD,
      attempt,
      method,
    } = params;

    const attemptThresoldExceeded = attempt >= attemptThreshold;
    const methodIsRetriable = method === Method.Get;

    return !attemptThresoldExceeded && methodIsRetriable;
  },
  // Lets retry
  then: requestInternalFx.prepend(({ params }) => ({
    ...params,
    attempt: params.attempt + 1,
  })),
  // Okay, error happened
  else: errorHappened.prepend(
    ({ error }) => error.response?.data.message ?? error.message,
  ),
});

const requestFx = attach({
  source: {
    config: $config,
    token: $token,
  },
  effect: requestInternalFx,
  mapParams: ({ path, ...rest }: Request, { config, token }) => {
    return {
      ...rest,
      path: `${config.backUrl}${path}`,
      token,
      attempt: 0,
    };
  },
});

export { requestFx };
