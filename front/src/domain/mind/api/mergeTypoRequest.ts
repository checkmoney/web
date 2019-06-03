import { Api } from '$front/domain/api'
import { MergeTypoModel } from '$shared/models/mind/MergeTypoModel'

export const mergeTypoRequest = (api: Api) => (
  merge: MergeTypoModel,
): Promise<void> =>
  api.client.post('/mind/typo/merge', merge).then(response => response.data)
