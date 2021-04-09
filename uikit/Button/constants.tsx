import { ButtonVariant, ButtonSize } from './types';

export const BUTTON_VARIANTS: {
  PRIMARY: ButtonVariant;
  SECONDARY: ButtonVariant;
  TEXT: ButtonVariant;
} = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TEXT: 'text',
});

export const BUTTON_SIZES: {
  SM: ButtonSize;
  MD: ButtonSize;
} = Object.freeze({
  SM: 'sm',
  MD: 'md',
});
