import { fetchOrFail } from '&front/domain/store';
import { Currency } from '&shared/enum/Currency';

import { setCurrencyRequest } from '../api/setCurrencyRequest';
import { actions } from '../reducer/profile';
import { fetchUserProfile } from './fetchUserProfile';

export const setDefaultCurrency = (currency: Currency) => {
  return fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    await setCurrencyRequest(getApi())(currency);

    await dispatch(fetchUserProfile());
  });
};
