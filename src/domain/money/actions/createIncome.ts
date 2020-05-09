import { fetchOrFail } from '&front/domain/store';
import { IncomeModel } from '&shared/models/money/IncomeModel';

import { createIncomeRequest } from '../api/createIncomeRequest';
import { actions as incomeFetchingActions } from '../reducer/createIncomeFetching';
import { actions as listSourcesActions } from '../reducer/listSources';
import { refetchData } from './refetchData';

export const createIncome = (incomeFields: IncomeModel) =>
  fetchOrFail(incomeFetchingActions, async (dispatch, getApi) => {
    await createIncomeRequest(getApi())(incomeFields);

    await dispatch(listSourcesActions.data.addSources([incomeFields.source]));
    await dispatch(refetchData());
  });
