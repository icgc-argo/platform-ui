import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';

import { StyledInputWrapper, INPUT_SIZES, InputSize, StyledInputWrapperProps } from '../common';
import Typography from '../../Typography';
import {
  DropdownIcon,
  OptionsList,
  Option,
  HiddenSelect,
  POPUP_POSITIONS,
  PopupPosition,
} from './styledComponents';
import useTheme from '../../utils/useTheme';

const Select: React.ComponentType<{
  ['aria-label']: string;
  options?: {
    value: any;
    content: any;
  }[];
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  popupPosition?: PopupPosition;
  placeholder?: string;
  id?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  placeholder = '- Select an option -',
  id,
  value,
  onChange,
  onBlur = () => {},
  disabled = false,
  size = INPUT_SIZES.SM,
  options = [],
  error = false,
  errorMessage = '',
  popupPosition = POPUP_POSITIONS.DOWN,
  ...props
}) => {
  const theme = useTheme();

  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const HiddenSelectRef = React.createRef<HTMLSelectElement>();
  const ariaLabel = props['aria-label'];

  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(value),
  );

  const isSomethingSelected = !!(value && selectedOption);

  const activatorRef = React.createRef<HTMLDivElement>();
  const dropdownRef = React.createRef<HTMLOListElement>();

  const close = e => {
    setExpanded(false);
    setActive('default');
    onBlur(e);
  };

  // close dropdown on document click
  const onDocumentClick = e => {
    const node = e.target;
    if (
      (activatorRef.current && activatorRef.current.contains(node)) ||
      (dropdownRef.current && dropdownRef.current.contains(node))
    ) {
      return false;
    }
    close(e);
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mouseup', onDocumentClick);
      // focus first el
      // const firstOption: HTMLElement =
      // dropdownRef.current && dropdownRef.current.querySelector(':first-child');
      //firstOption.focus();
    } else {
      document.removeEventListener('mouseup', onDocumentClick);
    }

    return () => document.removeEventListener('mouseup', onDocumentClick);
  }, [isExpanded]);

  // dismiss on Escape
  const handleEscape = e => {
    console.log('e', e.key);
    if (e.key === 'Escape' && isExpanded) {
      close(e);
    }
  };

  const handleKeyboard = ({ key }) => {
    if (key === 'Tab' && !isExpanded) {
      //if (!isExpanded) setExpanded(true);
    } else if (key === 'ArrowUp') {
      if (!isExpanded) setExpanded(true);
    } else if (key === 'ArrowDown') {
      if (!isExpanded) setExpanded(true);
    }
  };

  return (
    <div
      className={props.className}
      style={{ position: 'relative', ...(props.style || {}) }}
      onBlur={() => console.log('blur')}
      onClick={() => console.log('click')}
    >
      <StyledInputWrapper
        ref={activatorRef}
        id={id}
        size={size}
        style={{ zIndex: 1 }}
        disabled={disabled}
        inputState={activeState as StyledInputWrapperProps['inputState']}
        role="button"
        aria-haspopup={true}
        onClick={e => {
          setExpanded(!isExpanded);
          setActive(isExpanded ? 'focus' : 'default');
        }}
        onKeyUp={handleKeyboard}
        tabIndex={0}
      >
        <Typography
          variant="paragraph"
          color={
            disabled
              ? theme.input.textColors.disabled
              : isSomethingSelected || isExpanded
              ? 'black'
              : 'grey'
          }
          css={css`
            flex: 1;
            padding: 0 10px;
            line-height: 0;
          `}
        >
          {(value && selectedOption ? selectedOption.content : false) || placeholder}
        </Typography>
        <DropdownIcon disabled={disabled} theme={theme} />
      </StyledInputWrapper>
      {isExpanded && (
        <OptionsList
          ref={dropdownRef}
          role="listbox"
          id={`${id}-options`}
          className={popupPosition}
          onKeyDown={handleEscape}
        >
          {options.map(({ content, value: optionValue }) => (
            <Option
              tabIndex="0"
              key={optionValue}
              value={optionValue}
              onMouseDown={() => {
                onChange(optionValue);
                setActive('default');
              }}
            >
              {content}
            </Option>
          ))}
        </OptionsList>
      )}
    </div>
  );
};

export default Select;
