import { get } from 'lodash';

import { State } from '&front/domain/store/State';
import { GroupBy } from '&shared/enum/GroupBy';

import { GrowItem } from './grow.types';

export const selectGrow = (periodType: GroupBy) => (
  state: State,
): GrowItem | undefined =>
  get(state, `application.statistics.grow.${periodType}`);

export const selectGrowHasError = (periodType: GroupBy) => (
  state: State,
): boolean =>
  get<State, any, Array<GroupBy>>(
    state,
    `application.statistics.grow.errors`,
    [],
  ).includes(periodType);
