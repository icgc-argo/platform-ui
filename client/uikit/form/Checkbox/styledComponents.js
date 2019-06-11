import styled from '@emotion/styled';

export const StyledCheckbox = styled('input')`
  position: relative;
  cursor: pointer;
  margin: 0;

  &:before {
    transition: transform 0.65s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: rotate(-45deg) scale(0, 0);

    content: '';

    position: absolute;
    top: 4px;
    left: 3px;
    z-index: 1;

    width: 10px;
    height: 4px;

    border: 2px solid white;
    border-top-style: none;
    border-right-style: none;
  }

  &:checked {
    &:before {
      transform: rotate(-45deg) scale(1, 1);
    }

    &:after {
      background: ${({ theme, disabled }) =>
        theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};
    }
  }

  &:after {
    content: '';

    position: absolute;
    top: -2px;
    left: 0;

    width: 16px;
    height: 16px;

    background: #fff;

    border: 1px solid
      ${({ theme, checked, disabled }) =>
        theme.radiocheckbox.radio[
          checked && !disabled ? 'checked' : disabled ? 'disabled' : 'default'
        ]};

    border-radius: 2px;
    cursor: pointer;
  }
`;
