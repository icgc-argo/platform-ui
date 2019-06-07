import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../../Icon';
import Option from './Option';
import css from '@emotion/css';
import Tag from '../../Tag';

const Container = styled('div')`
  position: relative;
`;

const OptionsWrapper = styled('div')`
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: white;
`;

const OptionsContainer = styled('div')`
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  border: solid 1px;
  border-top: 0;
  border-color: ${({ theme }) => theme.multiSelect.listBorderColor};
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
  box-sizing: border-box;
  position: absolute;
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

function MultiSelect({ name, value, children, onChange, placeholder, inputProps }) {
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
      'data-value': child.props.value,
    });
  });

  const selectedItems = _.map(value, v => {
    const c = _.find(children, { props: { value: v } });
    return {
      value: c.props.value,
      displayName: c.props.value,
    };
  });

  const showPlaceHolder = _.isEmpty(value) && searchString === '';

  const showOptions = focusState && !_.isEmpty(_.compact(items));

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
        <OptionsWrapper>
          <Gap />
          <OptionsContainer>
            <OptionList>{items}</OptionList>
          </OptionsContainer>
        </OptionsWrapper>
      )}
      <input value={value} name={name} type="hidden" {...inputProps} />
    </Container>
  );
}

MultiSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MultiSelect;

export { Option };
