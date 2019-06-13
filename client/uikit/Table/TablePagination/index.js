import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withProps } from 'recompose';

import Typography from '../../Typography';
import { StyledInputWrapper } from '../../form/common';

export const TableActionBar = withProps(() => ({
  variant: 'label',
  color: 'grey',
  component: 'div',
}))(styled(Typography)`
  min-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
`);

/*
 * Please edit me!
 */
const TablePagination = () => (
  <TableActionBar>
    <Typography variant="caption">TablePagination coming soon</Typography>
  </TableActionBar>
);

TablePagination.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default TablePagination;
