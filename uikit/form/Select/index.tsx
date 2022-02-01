/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState, useEffect, useContext } from 'react';
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
import Tooltip from 'uikit/Tooltip';
import FormControlContext from '../FormControl/FormControlContext';

type OptionsType = {
  content: any;
  disabled?: boolean;
  value: any;
};

const Select: React.ComponentType<{
  ['aria-label']: string;
  options?: OptionsType[];
  size?: InputSize;
  error?: boolean;
  disabled?: boolean;
  eventOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  popupPosition?: PopupPosition;
  placeholder?: string;
  id?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  hintText?: string;
}> = ({
  placeholder = '- Select an option -',
  id,
  value = '',
  disabled = false,
  size = INPUT_SIZES.SM,
  options = [],
  error = false,
  popupPosition = POPUP_POSITIONS.DOWN,
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  const [selectedValue, setSelectedValue] = useState(value);
  const [isExpanded, setExpanded] = useState(false);

  const {
    disabled: calcDisabled,
    error: calcError,
    handleBlur,
    handleFocus,
  } = useContext(FormControlContext) || {};

  const onBlur = (event) => {
    handleBlur?.();
    props.onBlur?.(event);

    setActive('default');
    setExpanded(false);
  };

  // custom event function for backwards compatibility
  const onChange = (event, customSelectValue) => {
    const eventValue = customSelectValue || event.target.value;

    props.eventOnChange?.(event);
    props.onChange?.(eventValue);

    setActive('default');
    setExpanded(false);
    setSelectedValue(eventValue);
  };

  const onFocus = (event) => {
    handleFocus?.();
    props.onFocus?.(event);

    setActive('focus');
    setExpanded(true);
  };

  const hasError = calcError || !!error;
  const isDisabled = calcDisabled || disabled;

  const HiddenSelectRef = React.createRef<HTMLSelectElement>();
  const ariaLabel = props['aria-label'];

  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(selectedValue),
  );

  const isSomethingSelected = !!(selectedValue && selectedOption);

  const theme = useTheme();

  const wrapperRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const documentClickHandler = (event) => {
      const target = event.target;
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

  useEffect(() => {
    value === selectedValue || setSelectedValue(value);
  }, [value]);

  const styledInputWrapper = (
    <StyledInputWrapper
      error={hasError}
      ref={wrapperRef}
      size={size}
      style={{ zIndex: 1 }}
      disabled={isDisabled}
      inputState={activeState as StyledInputWrapperProps['inputState']}
      role="button"
    >
      <Typography
        variant="paragraph"
        color={
          isDisabled
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
        {(selectedValue && selectedOption ? selectedOption.content : false) || placeholder}
      </Typography>
      <DropdownIcon disabled={isDisabled} theme={theme} />
    </StyledInputWrapper>
  );

  return (
    <div
      className={props.className}
      style={{ position: 'relative', ...(props.style || {}) }}
      onClick={(event) => {
        const wrapperNode = wrapperRef.current;
        const target = event.target;
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
        disabled={isDisabled}
        id={id}
        ref={HiddenSelectRef}
        onBlur={onBlur}
        onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
        onFocus={onFocus}
        value={selectedValue}
      >
        {/* Start with a disabled '- Select an option -' placeholder, for accessibility users  */}
        {([{ content: placeholder, disabled: true, value: '' }] as OptionsType[])
          .concat(options)
          .map(({ content, disabled, value: optionValue }) => (
            <option disabled={disabled} key={optionValue} value={optionValue}>
              {content}
            </option>
          ))}
      </HiddenSelect>

      {props.hintText ? (
        <Tooltip unmountHTMLWhenHide position="bottom" html={<span>{props.hintText}</span>}>
          {styledInputWrapper}
        </Tooltip>
      ) : (
        styledInputWrapper
      )}

      {isExpanded && (
        <OptionsList role="listbox" id={`${id}-options`} className={popupPosition}>
          {options.map(({ content, value: optionValue }) => (
            <Option
              key={optionValue}
              value={optionValue}
              onMouseDown={(event) => {
                onChange(event, optionValue);
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
