import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled('div')`
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.colors.white};
`;

Container.propTypes = {};

export default Container;
