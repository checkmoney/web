import { fetchOrFail } from '&front/domain/store';

import { fetchCategoriesRequest } from '../api/fetchCategoriesRequest';
import { actions } from '../reducer/listCategories';

export const fetchCategories = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const categories = await fetchCategoriesRequest(getApi())();

    dispatch(actions.data.addCategories(categories));
  });
