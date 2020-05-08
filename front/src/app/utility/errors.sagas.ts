// eslint-disable-next-line require-yield
export function* logError(error: any) {
  console.error(error);
  yield null;
}
