/* When building gRPC requests we frequently need to provide a value as:
 * { value: "asdf" }
 */
export const wrapValue = value => ({
  value,
});
