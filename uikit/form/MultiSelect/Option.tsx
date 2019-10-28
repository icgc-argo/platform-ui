import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

const Li = styled('li')`
  ${({ theme }) => css(theme.typography.data)};
  list-style: none;
  padding-left: 7px;
  font-family: ${({ theme }) => theme.typography.paragraph.fontFamily};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.multiSelect.option.hoverColor};
  }
`;

function Option({ ...other }) {
  return <Li {...other} />;
}

Option.propTypes = {
  value: PropTypes.any,
};

export default Option;
