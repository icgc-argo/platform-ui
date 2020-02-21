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
  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const HiddenSelectRef = React.createRef<HTMLSelectElement>();
  const ariaLabel = props['aria-label'];

  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(value),
  );

  const isSomethingSelected = !!(value && selectedOption);

  const theme = useTheme();

  const wrapperRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const documentClickHandler = e => {
      const target = e.target;
      const wrapperNode = wrapperRef.current;

      if (wrapperNode && !wrapperNode.contains(target as Node)) {
        setExpanded(false);
        setActive('default');
      }
    };

    if (isExpanded) {
      document.addEventListener('mouseup', documentClickHandler);
    } else {
      document.removeEventListener('mouseup', documentClickHandler);
    }
    return () => document.removeEventListener('mouseup', documentClickHandler);
  }, [isExpanded]);

  return (
    <div
      className={props.className}
      style={{ position: 'relative', ...(props.style || {}) }}
      onClick={e => {
        const wrapperNode = wrapperRef.current;
        const target = e.target;
        if (wrapperNode && wrapperNode.contains(target as Node) && isExpanded) {
          setExpanded(false);
        } else if (document.activeElement !== HiddenSelectRef.current) {
          HiddenSelectRef.current.focus();
        }
      }}
    >
      {/**
       * This HiddenSelect component exists to sync up the focus state with the browser's
       * native behavior as much as possible for improved accessibility
       **/}
      <HiddenSelect
        aria-label={ariaLabel}
        ref={HiddenSelectRef}
        value={value}
        onChange={e => {
          setActive('default');
          setExpanded(false);
          onChange(e.target.value);
        }}
        onFocus={() => {
          setActive('focus');
          setExpanded(true);
        }}
        onBlur={event => {
          onBlur(event);
          setExpanded(false);
        }}
        disabled={disabled}
      >
        {options.map(({ content, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {content}
          </option>
        ))}
      </HiddenSelect>
      <StyledInputWrapper
        ref={wrapperRef}
        id={id}
        size={size}
        style={{ zIndex: 1 }}
        disabled={disabled}
        inputState={activeState as StyledInputWrapperProps['inputState']}
        role="button"
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
        <OptionsList role="listbox" id={`${id}-options`} className={popupPosition}>
          {options.map(({ content, value: optionValue }) => (
            <Option
              key={optionValue}
              value={optionValue}
              onMouseDown={() => {
                onChange(optionValue);
                setExpanded(false);
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
