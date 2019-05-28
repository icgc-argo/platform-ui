import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Typography from "../../Typography";

const PaginationContainer = styled("div")`
  min-height: 40px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
`;

/*
 * Please edit me!
 */
const TablePagination = () => (
  <PaginationContainer>
    <Typography variant="caption">TablePagination coming soon</Typography>
  </PaginationContainer>
);

TablePagination.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default TablePagination;
