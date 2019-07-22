import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '../..';
import Icon from '../../Icon';
import Option from './Option';
import _ from 'lodash';
import Tag from '../../Tag';
import useTheme from '../../utils/useTheme';
import clsx from 'clsx';
import FormControlContext from '../FormControl/FormControlContext';
import { StyledInputWrapper, INPUT_SIZES, INPUT_STATES } from '../common';

const Container = styled('div')`
  position: relative;
  transform: scale(1); /* this creates a stacking context so z-index is local */
  ${({ focus }) =>
    focus &&
    css`
      z-index: 1;
    `};
`;

const OptionsWrapper = styled('div')`
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

const Input = styled('input')`
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

const SelectedItem = styled(Tag)`
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
  if (_.isEmpty(searchText)) {
    return <>{string}</>;
  }

  const idx = _.toLower(string).indexOf(_.toLower(searchText));

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

const MultiSelect = ({
  name,
  value,
  children,
  onChange,
  onBlur = () => {},
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

  const contextValue = React.useContext(FormControlContext);
  if (!_.isEmpty(contextValue)) {
    disabled = contextValue.disabled;
    error = contextValue.error;
  }

  const handleItemClick = child => event => {
    event.persist();

    const newValue = single ? [child.props.value] : _.uniq([...value, child.props.value]);

    event.target = {
      value: newValue,
      name,
    };
    setSearchString('');
    onChange(event, child);
  };

  const handleNewItemClick = event => {
    const newValue = single ? [searchString] : _.uniq([...value, searchString]);

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
          value: _.initial(value),
          name,
        };
        onChange(e);
      }
    }

    if ((e.key === 'Enter' || e.key === 'Tab') && allowNew) {
      if (searchString.length !== 0) {
        e.persist();

        const newValue = single ? [searchString] : _.uniq([...value, searchString]);

        e.target = {
          value: newValue,
          name,
        };

        setSearchString('');
        onChange(e);
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
      value: _.without([...value], item.value),
      name,
    };
    onChange(event, item);
  };

  const items = React.Children.map(children, child => {
    const selected = _.includes(value, child.props.value);
    if (selected) {
      return null;
    }

    if (searchString !== '') {
      if (!_.includes(_.toLower(child.props.value), _.toLower(searchString))) {
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

  const selectedItems = _.map(value, v => {
    const c = _.find(React.Children.toArray(children), { props: { value: v } });

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

  const showPlaceHolder = _.isEmpty(value) && searchString === '';

  const showOptions = focusState && (allowNew || !_.isEmpty(_.compact(items)));

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
            {_.get(_.head(selectedItems), 'displayName')}
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
          aria-label={ariaLabel}
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
                {allowNew && !_.isEmpty(items) && <SectionTitle>SUGGESTIONS</SectionTitle>}
                {items}
              </OptionList>
            </OptionsContainer>
            {allowNew && !_.isEmpty(searchString) && (
              <Option
                css={css`
                  border-top: ${_.isEmpty(items) ? 'none' : '1px solid ' + theme.colors.grey_2};
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

MultiSelect.propTypes = {
  /* Name of the input */
  name: PropTypes.string,

  /* Value of the input */
  value: PropTypes.any.isRequired,

  /* Placehoder of the input */
  placeholder: PropTypes.string,

  /* Handler of onChange event */
  onChange: PropTypes.func.isRequired,

  /* Handler of onBlur event */
  onBlur: PropTypes.func,

  /* Whether to allow user to add new value */
  allowNew: PropTypes.bool,

  disabled: PropTypes.bool,

  size: PropTypes.oneOf([INPUT_SIZES.SM, INPUT_SIZES.LG]),
};

export default MultiSelect;

export { Option };
