import styled from '@emotion/styled';

export const StyledRadio = styled('input')`
  position: relative;
  cursor: pointer;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 1px;
    z-index: 1;

    width: 0.65rem;
    height: 0.65rem;

    background: ${({ theme, disabled }) =>
      theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};
    border-radius: 50%;

    transition: transform 0.65s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: scale(0, 0);
  }

  &:checked {
    &:before {
      transform: scale(1, 1);
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -2px;

    width: 14px;
    height: 14px;

    background-color: ${({ theme, disabled }) =>
      theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : 'default']};

    border-radius: 50%;
    border: 1px solid
      ${({ theme, disabled, checked }) =>
        theme.radiocheckbox.radio[disabled && !checked ? 'disabled' : 'default']};
  }
`;
