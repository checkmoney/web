import { fetchOrFail } from '&front/domain/store';
import { Currency } from '&shared/enum/Currency';
import { actions as defaultCurrencyActions } from '&front/app/profile/default_currency.actions';

import { setCurrencyRequest } from '../api/setCurrencyRequest';
import { actions } from '../reducer/profile';

export const setDefaultCurrency = (currency: Currency) => {
  return fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    await setCurrencyRequest(getApi())(currency);

    dispatch(defaultCurrencyActions.started({}));
  });
};
