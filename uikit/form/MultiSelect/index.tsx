import React, { InputHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';
import uniq from 'lodash/uniq';
import initial from 'lodash/initial';
import without from 'lodash/without';
import includes from 'lodash/includes';
import map from 'lodash/map';
import compact from 'lodash/compact';
import get from 'lodash/get';
import head from 'lodash/head';
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

  box-shadow: ${props =>
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
  ${({ theme }) => css(theme.typography.default)};
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 2;
  padding: 2px;
`;

const Input = styled<'input', { autocomplete: string }>('input')`
  ${({ theme }) => css(theme.typography.paragraph)};
  border: none;
  display: block;
  flex-grow: 1;
  background-color: transparent;
  padding-left: 5px;
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

const SingleValue = styled('span')`
  ${({ theme }) => css(theme.typography.paragraph)};
  margin-right: 0.3em;

  &.disabled {
    color: ${({ theme }) => theme.multiSelect.disabledTextColor};
  }
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

const MultiSelect: React.ComponentType<{
  ['aria-label']: string;
  /* Name of the Input */
  name?: string;

  /* Value of the input */
  value: any;

  /* Placehoder of the input */
  placeholder?: string;

  /* Handler of onChange event */
  onChange: (
    e: React.SyntheticEvent & {
      target: {
        value: any;
        name: string;
      };
    },
    child?: any,
  ) => void;

  /* Handler of onBlur event */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /* Whether to allow user to add new value */
  allowNew?: boolean;

  disabled?: boolean;

  size?: InputSize;
  single?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  error?: boolean;
}> = ({
  name,
  value = [],
  children,
  onChange,
  onBlur = e => {},
  single,
  placeholder = single ? 'Select one' : 'Add one or more...',
  inputProps,
  allowNew,
  disabled,
  error,
  'aria-label': ariaLabel = 'search',
  size = INPUT_SIZES.LG,
}) => {
  const [focusState, setFocusState] = React.useState(false);
  const [searchString, setSearchString] = React.useState('');

  // const options = children.map(child => child.props.value);

  const contextValue = React.useContext(FormControlContext);
  if (!isEmpty(contextValue)) {
    disabled = contextValue.disabled;
    error = contextValue.error;
  }

  const handleItemClick = child => event => {
    event.persist();

    const newValue = single ? [child.props.value] : uniq([...value, child.props.value]);

    event.target = {
      value: newValue,
      name,
    };
    setSearchString('');
    onChange(event, child);
  };

  const handleNewItemClick = event => {
    const newValue = single ? [searchString] : uniq([...value, searchString]);

    event.target = {
      value: newValue,
      name,
    };

    setSearchString('');
    onChange(event, null);
  };

  const handleInputChange = e => {
    setSearchString(e.target.value);
  };

  const handleInputKeyDown = e => {
    if (e.key === 'Backspace') {
      if (searchString.length === 0) {
        e.persist();
        e.target = {
          value: initial(value),
          name,
        };
        onChange(e);
      }
    }

    if (e.key === 'Enter' || e.key === 'Tab') {
      if (allowNew) {
        if (searchString.length !== 0) {
          e.persist();

          const newValue = single ? [searchString] : uniq([...value, searchString]);

          e.target = {
            value: newValue,
            name,
          };

          setSearchString('');
          onChange(e);
        }
      } else {
        if (searchString.length !== 0) {
          e.persist();

          const newValue = single ? [searchString] : uniq([...value, searchString]);

          e.target = {
            value: newValue,
            name,
          };
          setSearchString('');
          onChange(e);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setFocusState(true);
  };

  const handleInputBlur = event => {
    setFocusState(false);
    onBlur(event);
  };

  const handleSelectedItemClick = item => event => {
    event.persist();
    event.target = {
      value: without([...value], item.value),
      name,
    };
    onChange(event, item);
  };

  const items = React.Children.map(children, (child: any) => {
    const selected = includes(value, child.props.value);
    if (selected) {
      return null;
    }

    if (searchString !== '') {
      if (!includes(toLower(child.props.value), toLower(searchString))) {
        return null;
      }
    }

    return React.cloneElement(child, {
      onMouseDown: handleItemClick(child),
      role: 'option',
      selected,
      value: undefined,
      children: <Highlight string={child.props.children} searchText={searchString} />,
      'data-value': child.props.value,
    });
  });

  const selectedItems = map(value, v => {
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

  return (
    <Container focus={focusState}>
      <InputBox
        inputState={focusState ? INPUT_STATES.focus : INPUT_STATES.default}
        size={size}
        disabled={disabled}
        error={error}
      >
        {showPlaceHolder ? (
          <PlaceHolder className={clsx({ disabled, error, focused: focusState })}>
            {placeholder}
          </PlaceHolder>
        ) : single ? (
          <SingleValue className={clsx({ disabled, error, focused: focusState })}>
            {get(head(selectedItems), 'displayName')}
          </SingleValue>
        ) : (
          selectedItems.map(item => (
            <SelectedItem
              key={item.value}
              onClick={handleSelectedItemClick(item)}
              className={clsx({ disabled, error, focused: focusState })}
            >
              {item.displayName}&nbsp;&nbsp;
              <Icon width="8px" height="8px" name="times" fill="#fff" />
            </SelectedItem>
          ))
        )}
        <Input
          autocomplete="off"
          aria-label={ariaLabel}
          id={`${name}-multiselect`}
          value={searchString}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={disabled}
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
      <input value={value} name={name} type="hidden" disabled={disabled} {...inputProps} />
    </Container>
  );
};

export default MultiSelect;

export { Option };
