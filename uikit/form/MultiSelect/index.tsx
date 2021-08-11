/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import React, { InputHTMLAttributes, useEffect } from 'react';
import styled from '@emotion/styled';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import uniq from 'lodash/uniq';
import initial from 'lodash/initial';
import without from 'lodash/without';
import includes from 'lodash/includes';
import map from 'lodash/map';
import compact from 'lodash/compact';
import find from 'lodash/find';

import Icon from '../../Icon';
import Option from './Option';
import css from '@emotion/css';
import Tag from '../../Tag';
import useTheme from '../../utils/useTheme';
import clsx from 'clsx';
import FormControlContext from '../FormControl/FormControlContext';
import { StyledInputWrapper, INPUT_SIZES, INPUT_STATES, InputSize } from '../common';

const Container = styled<'div', { focus: boolean }>('div')`
  position: relative;
  transform: scale(1); /* this creates a stacking context so z-index is local */
  ${({ focus }) =>
    focus &&
    css`
      z-index: 1;
    `}
`;

const OptionsWrapper = styled<'div', { focused: boolean }>('div')`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: white;
  border: solid 1px;
  border-color: ${({ theme }) => theme.multiSelect.listBorderColor};
  border-radius: 0 0 4px 4px;

  box-shadow: ${(props) =>
    props.focused ? '0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08)' : 'none'};
`;

const OptionsContainer = styled('div')`
  box-sizing: border-box;
  position: relative;
  max-height: 200px;
  overflow: auto;
  width: 100%;
`;

const OptionList = styled('ul')`
  margin: 0;
  padding: 0;
`;

const Gap = styled('div')`
  position: absolute;
  left: -1px;
  border: solid 1px;
  border-top: none;
  border-bottom: none;
  height: 5px;
  transform: translateY(-5px);
  width: 100%;
  border-color: ${({ theme }) => theme.multiSelect.listBorderColor};
  z-index: 2;
  background-color: white;
`;

const InputBox = styled(StyledInputWrapper)`
  cursor: text;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 2;
  padding: 2px;
`;

const Input = styled<'input', { autoComplete: string; single?: boolean }>('input')`
  ${({ theme }) => css(theme.typography.default)};
  background-color: transparent;
  border: none;
  display: block;
  flex-grow: 1;
  padding: 0 ${({ single }) => (single ? 10 : 5)}px;

  &:focus {
    outline: none;
  }
`;

const PlaceHolder = styled('span')`
  ${({ theme }) => css(theme.typography.data)};
  color: ${({ theme }) => theme.multiSelect.placeHolderColor};
  position: absolute;
  pointer-events: none;
  padding: 8px 10px;
  &.disabled {
    color: ${({ theme }) => theme.multiSelect.disabledTextColor};
  }
`;

const SelectedItem: any = styled(Tag)`
  box-sizing: border-box;
  font-size: 11px;
  cursor: pointer;
  margin-left: 5px;
  margin-top: 2px;
  margin-bottom: 2px;

  &.disabled {
    background-color: ${({ theme }) => theme.colors.grey_2};
  }
`;

const SectionTitle = styled('li')`
  list-style: none;
  font-size: 11px;
  height: 27px;
  line-height: 27px;
  padding-left: 7px;
  font-family: ${({ theme }) => theme.typography.paragraph.fontFamily};
  color: ${({ theme }) => theme.colors.grey};
`;

function Highlight({ string, searchText }) {
  if (isEmpty(searchText)) {
    return <>{string}</>;
  }

  const idx = toLower(string).indexOf(toLower(searchText));

  const theme = useTheme();

  if (idx === -1) {
    return <>{string}</>;
  } else {
    const before = string.substring(0, idx);

    const match = string.substring(idx, idx + searchText.length);

    const after = string.substring(idx + searchText.length, string.length);

    return (
      <>
        {before}
        <span
          css={css`
            background-color: ${theme.colors.warning_3};
          `}
        >
          {match}
        </span>
        {after}
      </>
    );
  }
}

type MultiSelectProps = {
  /**
   * Aria Label
   * @default 'search'
   */
  ['aria-label']: string;

  /**
   * Whether to allow user to add new value
   */
  allowNew?: boolean;

  children: JSX.Element | JSX.Element[];

  disabled?: boolean;

  error?: boolean | string;

  id?: string;

  inputProps?: InputHTMLAttributes<HTMLInputElement>;

  /**
   * Name of the Input
   */
  name?: string;

  /**
   * Handler of onBlur event
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Handler of onChange event
   */
  onChange: (
    e: React.SyntheticEvent & {
      target: {
        value: any;
        name: string;
      };
    },
    child?: any,
  ) => void;

  /**
   * Handler of onFocus event
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Placehoder of the input.
   * If given `false` or empty string, no placeholder is shown.
   * @default 'Select one' for single, else 'Add one or more...'
   */
  placeholder?: string | false;

  single?: boolean;

  /**
   * Changes the height of the input field.
   * Values:
   * 'sm'=32px,
   * 'lg'=38px.
   */
  size?: InputSize;

  /**
   * Value of the input
   */
  value: any;
};

const MultiSelect = ({
  'aria-label': ariaLabel = 'search',
  allowNew = false,
  children,
  disabled = false,
  error = false,
  id = '',
  inputProps,
  name = '',
  onBlur = (e) => {},
  onChange,
  onFocus = (e) => {},
  placeholder,
  single = false,
  size = INPUT_SIZES.LG,
  value = [],
}: MultiSelectProps) => {
  const contextValue = React.useContext(FormControlContext);

  const [focusState, setFocusState] = React.useState(contextValue?.focused);
  const [searchString, setSearchString] = React.useState('');

  const hasError = contextValue?.error || !!error;
  const isDisabled = contextValue?.disabled || disabled;

  const createCustomEvent = (event, newValue?) => ({
    ...event,
    target: {
      ...event.target,
      id,
      name,
      tagName: 'MULTISELECT',
      type: `select-${single ? 'one' : 'multiple'}`,
      ...(newValue && { value: newValue }),
    },
  });

  const handleItemClick = (child) => (event) => {
    event.persist();

    const newValue = single ? [child.props.value] : uniq([...value, child.props.value]);

    setSearchString(single ? child.props.value : '');
    onChange(createCustomEvent(event, newValue), child);
  };

  const items = React.Children.map(children, (child: any) => {
    const selected = includes(value, child.props.value);
    if (selected) {
      return null;
    }

    if (searchString !== '') {
      if (!includes(toLower(child.props.children), toLower(searchString))) {
        return null;
      }
    }

    return React.cloneElement(child, {
      onMouseDown: handleItemClick(child),
      role: 'option',
      selected,
      value: undefined,
      css: css`
        padding: 5px 0px 5px 7px;
      `,
      children: <Highlight string={child.props.children} searchText={searchString} />,
      'data-value': child.props.value,
    });
  });

  const handleNewItemClick = (event) => {
    const newValue = single ? [searchString] : uniq([...value, searchString]);

    setSearchString(single ? searchString : '');
    onChange(createCustomEvent(event, newValue), null);
  };

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace') {
      if (single ? searchString.length <= 1 : searchString.length === 0) {
        event.persist();

        const newValue = initial(value);

        isEqual(value, newValue) || onChange(createCustomEvent(event, newValue));
      }
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      if (allowNew) {
        if (searchString.length !== 0) {
          event.persist();

          const newValue = single ? [searchString] : uniq([...value, searchString]);

          setSearchString(single ? searchString : '');
          onChange(createCustomEvent(event, newValue));
        }
      } else {
        if (searchString.length !== 0 && items.length > 0) {
          event.persist();

          const valueAttr = items[0].props['data-value'];
          const newValue = single ? [valueAttr] : uniq([...value, valueAttr]);

          setSearchString(single ? valueAttr : '');
          onChange(createCustomEvent(event, newValue));
        }
      }
    }
  };

  const handleInputFocus = (event) => {
    contextValue?.handleFocus?.();
    onFocus(createCustomEvent(event));
    setFocusState(true);
  };

  const handleInputBlur = (event) => {
    contextValue?.handleBlur?.();
    onBlur(createCustomEvent(event));
    setFocusState(false);
  };

  const handleSelectedItemClick = (item) => (event) => {
    event.persist();

    onChange(createCustomEvent(event, without([...value], item.value)), item);
  };

  const selectedItems = map(value, (v) => {
    const c: any = find(React.Children.toArray(children), { props: { value: v } });

    if (typeof c === 'undefined') {
      return {
        value: v,
        displayName: v,
      };
    }

    return {
      value: c.props.value,
      displayName: c.props.children,
    };
  });

  const showPlaceHolder = isEmpty(value) && searchString === '';

  const showOptions = focusState && (allowNew || !isEmpty(compact(items)));

  const theme = useTheme();

  useEffect(() => {
    if (single) {
      const newValue = value[0] || '';
      newValue === searchString || setSearchString(newValue);
    }
  }, [value]);

  return (
    <Container focus={focusState}>
      <InputBox
        inputState={focusState ? INPUT_STATES.focus : INPUT_STATES.default}
        size={size}
        disabled={isDisabled}
        error={hasError}
      >
        {showPlaceHolder
          ? ![false, ''].includes(placeholder) && (
              <PlaceHolder
                className={clsx({ disabled: isDisabled, hasError, focused: focusState })}
              >
                {placeholder || (single ? 'Select one' : 'Add one or more...')}
              </PlaceHolder>
            )
          : !single &&
            selectedItems.map((item) => (
              <SelectedItem
                key={item.value}
                onClick={handleSelectedItemClick(item)}
                className={clsx({ disabled: isDisabled, hasError, focused: focusState })}
              >
                {item.displayName}&nbsp;&nbsp;
                <Icon width="8px" height="8px" name="times" fill="#fff" />
              </SelectedItem>
            ))}
        <Input
          aria-label={ariaLabel}
          autoComplete="off"
          disabled={isDisabled}
          id={id || `${name}-multiselect`}
          single={single}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          value={searchString}
        />
      </InputBox>

      {showOptions && (
        <>
          <OptionsWrapper focused={focusState}>
            <Gap />
            <OptionsContainer>
              <OptionList>
                {allowNew && !isEmpty(items) && <SectionTitle>SUGGESTIONS</SectionTitle>}
                {items}
              </OptionList>
            </OptionsContainer>
            {allowNew && !isEmpty(searchString) && (
              <Option
                data-value={searchString}
                css={css`
                  border-top: ${isEmpty(items) ? 'none' : '1px solid ' + theme.colors.grey_2};
                `}
                onMouseDown={handleNewItemClick}
              >
                {searchString}
                <span
                  css={css`
                    font-size: 11px;
                    color: ${theme.colors.grey};
                    margin-left: 0.5em;
                  `}
                >
                  (NEW VALUE)
                </span>
              </Option>
            )}
          </OptionsWrapper>
        </>
      )}
      <input value={value} name={name} type="hidden" disabled={isDisabled} {...inputProps} />
    </Container>
  );
};

export default MultiSelect;

export { Option };
