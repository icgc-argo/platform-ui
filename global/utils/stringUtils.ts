/**
 * turns "here is some string" -> "Here Is Some String"
 */
export const capitalize = (s: string) =>
  s
    .split(' ')
    .map(str => str.replace(str[0], (str[0] || '').toUpperCase()))
    .join(' ');
