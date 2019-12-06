export const toDisplayRowIndex = (index: number | string) => Number(index) + 2;
export const toDisplayError = <Err extends { row: number }>(err: Err): Err => ({
  ...err,
  row: toDisplayRowIndex(err.row),
});
