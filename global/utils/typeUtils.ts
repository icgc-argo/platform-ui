/**
 * Keys of an object type, as a union.
 *
 * Example:
 * ```
 * const model = { a: 'hello', b: 100};
 * type ModelKeys = Keys<typeof model>; // "a" | "b"
 * ```
 */
export type Keys<T> = T extends infer U ? keyof U : never;

/**
 * Values of an object's property types, as a union.
 * If the object is readonly (ie. `as const`) the values will be read as literals
 *
 * Example:
 * ```
 * const model = { a: 'hello', b: 100};
 * type ModelValues = Values<typeof model>; // string | number
 *
 * const modelAsConst = { a: 'hello', b: 100} as const;
 * type ModelAsConstValues = Values<typeof modelAsConst>; // 'hello' | 100
 * ```
 */
export type Values<T> = T extends infer U ? U[keyof U] : never;
