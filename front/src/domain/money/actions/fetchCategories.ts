import { fetchOrFail } from '@front/domain/store'

import { actions } from '../reducer/listCategories'
import { fetchCategoriesRequest } from '../api/fetchCategoriesRequest'

export const fetchCategories = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const categories = await fetchCategoriesRequest(getApi())()

    dispatch(actions.data.addCategories(categories))
  })
