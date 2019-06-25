import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../../Icon';
import Option from './Option';
import css from '@emotion/css';
import _ from 'lodash';
import Tag from '../../Tag';
import useTheme from '../../utils/useTheme';
import clsx from 'clsx';
import FormControlContext from '../FormControl/FormControlContext';

const Container = styled('div')`
  position: relative;
`;

const OptionsWrapper = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
  background-color: white;
  border: solid 1px;
  border-top: 0;
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

const InputBox = styled('div')`
  ${({ theme }) => css(theme.typography.paragraph)};
  background-color: white;
  border-radius: 8px;
  border: solid 1px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 22px;
  min-height: 36px;
  padding: 7px 7px 0 7px;
  position: relative;
  width: 100%;
  z-index: 2;

  border-color: ${({ theme }) => theme.colors.grey_1};

  &:hover {
    border-color: ${({ theme }) => theme.colors.grey};
  }

  &.focused {
    border-color: ${({ theme }) => theme.colors.grey};
  }

  &.disabled {
    background-color: #f6f6f7;
    pointer-events: none;
    border-color: ${({ theme }) => theme.colors.grey_2};
  }

  &.error {
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

const Input = styled('input')`
  ${({ theme }) => css(theme.typography.paragraph)};
  border: none;
  display: block;
  flex-grow: 1;
  min-width: 50px;
  margin-bottom: 7px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const PlaceHolder = styled('span')`
  ${({ theme }) => css(theme.typography.paragraph)};
  color: ${({ theme }) => theme.multiSelect.placeHolderColor};
  position: absolute;
  pointer-events: none;

  &.disabled {
    color: #d0d1d8;
  }
`;

const SelectedItem = styled(Tag)`
  box-sizing: border-box;
  font-size: 11px;
  margin-bottom: 7px;
  margin-top: 0;
  margin-right: 5px;
  cursor: pointer;
  line-height: 17px;

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
    color: #d0d1d8;
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

function MultiSelect({
  name,
  value,
  children,
  onChange,
  placeholder: placeholderProp,
  inputProps,
  allowNew,
  disabled,
  error,
  single,
}) {
  const [focusState, setFocusState] = React.useState(false);
  const [searchString, setSearchString] = React.useState('');
  const placeholder = _.defaultTo(placeholderProp, single ? '' : 'Add one or more...');

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

    if (e.key === 'Enter' && allowNew) {
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

  const handleInputBlur = () => {
    setFocusState(false);
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

    if (allowNew && typeof c === 'undefined' && _.isString(v)) {
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
    <Container>
      <InputBox className={clsx({ disabled, error, focused: focusState })}>
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
          aria-label="search"
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
}

MultiSelect.propTypes = {
  /* Name of the input */
  name: PropTypes.string,

  /* Value of the input */
  value: PropTypes.any.isRequired,

  /* Placehoder of the input */
  placeholder: PropTypes.string,

  /* Handler of onChange event */
  onChange: PropTypes.func.isRequired,

  /* Whether to allow user to add new value */
  allowNew: PropTypes.bool,

  disabled: PropTypes.bool,
};

export default MultiSelect;

export { Option };
