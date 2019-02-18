const SUBMIT_TYPE = 'submit'
const NORMAL_TYPE = 'button'

export const resolveType = (submit: boolean) =>
  submit ? SUBMIT_TYPE : NORMAL_TYPE
