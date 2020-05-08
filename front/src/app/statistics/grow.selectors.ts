import { State } from '&front/domain/store/State';
import { GroupBy } from '&shared/enum/GroupBy';

export const selectGrow = (periodType: GroupBy) => (state: State) =>
  state.application.statistics.grow[periodType];

export const selectGrowHasError = (periodType: GroupBy) => (
  state: State,
): boolean => state.application.statistics.grow.errors.includes(periodType);
