import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Li = styled('li')`
  list-style: none;
  font-size: 14px;
  min-height: 27px;
  line-height: 27px;
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
