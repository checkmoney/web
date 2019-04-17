import { createSelector } from 'reselect'
import { dropRight, flow } from 'lodash'
import { Base64 } from 'js-base64'
import { Option } from 'tsoption'

import { TokenPayloadModel } from '@shared/models/user/TokenPayloadModel'

import { getToken } from './getToken'

const removeSignature = (token: string) =>
  dropRight(token.split('.'), 1).join('.')
const getJsonMatches = (decoded: string) =>
  decoded.match(new RegExp('{.+?}', 'gi')) || []
const parseJson = (matches: string[]) => matches.map(item => JSON.parse(item))
const mergeObjects = (objects: object[]) =>
  objects.reduce(
    (acc, cur) => ({
      ...acc,
      ...cur,
    }),
    {},
  )

export const getDecodedToken = createSelector(
  getToken,
  (token): Option<TokenPayloadModel> =>
    token.map(
      flow([
        removeSignature,
        Base64.decode,
        getJsonMatches,
        parseJson,
        mergeObjects,
      ]),
    ),
)
