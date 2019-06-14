import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../../Icon';
import Option from './Option';
import css from '@emotion/css';
import _ from 'lodash';
import Tag from '../../Tag';
import useTheme from '../../utils/useTheme';

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
`;

const InputBox = styled('div')`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 36px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  padding: 7px 7px 0 7px;
  border: solid 1px;
  border-color: ${props =>
    props.focused
      ? props.theme.multiSelect.input.focusedBorderColor
      : props.theme.multiSelect.input.borderColor};

  font-size: 14px;

  &:hover {
    border-color: ${({ theme }) => theme.multiSelect.input.hoverBorderColor};
  }
`;

const Input = styled('input')`
  border: none;
  display: block;
  flex-grow: 1;
  min-width: 50px;
  margin-bottom: 7px;
  &:focus {
    outline: none;
  }
`;

const PlaceHolder = styled('span')`
  ${({ theme }) => css(theme.typography.paragraph)};
  color: ${({ theme }) => theme.multiSelect.placeHolderColor};
  position: absolute;
  pointer-events: none;
`;

const SelectedItem = styled(Tag)`
  box-sizing: border-box;
  font-size: 11px;
  margin-bottom: 7px;
  margin-top: 0;
  margin-right: 5px;
  cursor: pointer;
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

function MultiSelect({ name, value, children, onChange, placeholder, inputProps, allowNew }) {
  const [focusState, setFocusState] = React.useState(false);
  const [searchString, setSearchString] = React.useState('');

  const handleItemClick = child => event => {
    event.persist();
    event.target = {
      value: _.uniq([...value, child.props.value]),
      name,
    };
    setSearchString('');
    onChange(event, child);
  };

  const handleNewItemClick = event => {
    event.target = {
      value: _.uniq([...value, searchString]),
      name,
    };
    setSearchString('');
    onChange(event, null);
  };

  const handleInputChange = e => {
    setSearchString(e.target.value);
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
      <InputBox focused={focusState}>
        {showPlaceHolder ? (
          <PlaceHolder>{placeholder}</PlaceHolder>
        ) : (
          selectedItems.map(item => (
            <SelectedItem key={item.value} onClick={handleSelectedItemClick(item)}>
              {item.displayName}&nbsp;&nbsp;
              <Icon width="8px" height="8px" name="times" fill="#fff" />
            </SelectedItem>
          ))
        )}
        <Input
          aria-label="search"
          value={searchString}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </InputBox>
      {showOptions && (
        <>
          <OptionsWrapper>
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
                    color: ${theme.colors.grey};
                    margin-left: 0.5em;
                  `}
                >
                  (New Value)
                </span>
              </Option>
            )}
          </OptionsWrapper>
          }
        </>
      )}
      <input value={value} name={name} type="hidden" {...inputProps} />
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
};

export default MultiSelect;

export { Option };
