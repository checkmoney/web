import { Action } from 'redux';

import { GroupBy } from '&shared/enum/GroupBy';

import { GrowItem } from './grow.types';

export enum GrowActions {
  Requested = 'STATISTICS_GROW_Requested',
  DataReceived = 'STATISTICS_GROW_DataReceived',
  FatalErrorHappened = 'STATISTICS_GROW_FatalErrorHappened',
}

export interface GrowRequestedAction extends Action<GrowActions.Requested> {
  payload: {
    periodType: GroupBy;
    attempt: number;
  };
}
export const growRequested = (
  periodType: GroupBy,
  attempt: number = 1,
): GrowRequestedAction => ({
  type: GrowActions.Requested,
  payload: { periodType, attempt },
});

export interface GrowDataReceivedAction
  extends Action<GrowActions.DataReceived> {
  payload: {
    periodType: GroupBy;
    data: GrowItem;
  };
}
export const growDataReceived = (
  periodType: GroupBy,
  data: GrowItem,
): GrowDataReceivedAction => ({
  type: GrowActions.DataReceived,
  payload: { data, periodType },
});

export interface GrowFatalErrorHappenedAction
  extends Action<GrowActions.FatalErrorHappened> {
  payload: {
    periodType: GroupBy;
  };
}
export const growFatalErrorHappened = (
  periodType: GroupBy,
): GrowFatalErrorHappenedAction => ({
  type: GrowActions.FatalErrorHappened,
  payload: { periodType },
});
