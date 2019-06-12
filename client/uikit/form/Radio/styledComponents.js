import styled from '@emotion/styled';
import css from '@emotion/css';

export const StyledRadio = styled('input')`
  outline: none;
  position: absolute;
  left: -999px;
  cursor: pointer;

  & + label:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 3px;
    left: -28px;

    width: 9px;
    height: 9px;

    background: ${({ theme, disabled }) =>
      theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};
    border-radius: 50%;

    transition: transform 0.35s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: scale(0, 0);
  }

  &:checked {
    & + label:before {
      transform: scale(1);
    }
  }

  & + label:after {
    content: '';
    position: absolute;
    top: 50%;
    left: -32px;

    width: 15px;
    height: 15px;

    border-radius: 50%;
    border: 1px solid
      ${({ theme, disabled, checked }) =>
        theme.radiocheckbox.radio[disabled && !checked ? 'disabled' : 'default']};

    transform: translateY(-55%);
  }
`;

export const StyledRadioGroup = styled('div')`
  div {
    border-top: none;
  }
  div:first-child {
    border-top: 1px solid ${({ theme }) => theme.radiocheckbox.borderColors.default};
  }
`;

export const StyledLabel = styled('label')`
  margin-left: 32px;
`;
