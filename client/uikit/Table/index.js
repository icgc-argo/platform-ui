import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import css from "@emotion/css";
import ReactTable from "react-table";

import reactTableDefaultStyle from "./reactTableDefaultStyle";
import Typography from "../Typography";

const StyledTable = styled(ReactTable)`
  ${reactTableDefaultStyle}
  & .rt-thead.-header {
    box-shadow: none;
  }
  & .rt-th {
    ${({ theme }) => css(theme.typography.data)};
    font-weight: bold;
    background: ${({ theme }) => theme.table.th.background};
  }
  & .rt-td {
    ${({ theme }) => css(theme.typography.data)}
  }
`;

const Table = props => (
  <StyledTable minRows={0} showPagination={false} {...props} />
);

Table.propTypes = {
  ...ReactTable.propTypes
  /**
   * This component effectively exposes the full react-table API
   */
};

export default Table;
export { default as TablePagination } from "./TablePagination";
