import { Action } from 'redux';

import { GroupBy } from '&shared/enum/GroupBy';

import { GrowItem } from './grow.types';

export enum GrowActions {
  Requested = 'STATISTICS_GROW_REQUESTED',
  DataReceived = 'STATISTICS_GROW_DATA_RECEIVED',
}

export interface GrowRequestedAction extends Action<GrowActions.Requested> {
  payload: {
    periodType: GroupBy;
    attempt: number;
  };
}
export const growRequested = (
  periodType: GroupBy,
  attempt: number = 0,
): GrowRequestedAction => ({
  type: GrowActions.Requested,
  payload: { periodType, attempt },
});

export const growDataReceived = (periodType: GroupBy, data: GrowItem) => ({
  type: GrowActions.DataReceived,
  payload: { data, periodType },
});
