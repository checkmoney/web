export const parse = (value: string | undefined) =>
  (value || '0').replace(/\s\s+/g, ' ')
