export const sortByField =
  (field: string) =>
  <T>(a: NonNullable<T>, b: NonNullable<T>) =>
    a[field] > b[field] ? 1 : -1;
