import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import css from "@emotion/css";
import ReactTable from "react-table";

import reactTableDefaultStyle from "./reactTableDefaultStyle";
import Typography from "../Typography";
import ascending from "../assets/table/ascending.svg";
import descending from "../assets/table/descending.svg";

const StyledTable = styled(ReactTable)`
  ${reactTableDefaultStyle}
  &.ReactTable {
    border: none;
  }

  &.ReactTable .rt-th {
    ${({ theme }) => css(theme.typography.data)};
    font-weight: bold;
    background: ${({ theme }) => theme.table.th.background};
  }
  &.ReactTable .rt-td {
    ${({ theme }) => css(theme.typography.data)}
    padding: 10px 16px;
  }

  /* overrides stripped rows style */
  &.ReactTable.-striped .rt-tr:not(.-odd) {
    background: ${({ theme }) => theme.table.th.background};
  }
  &.ReactTable.-striped .rt-tr.-odd {
    background: ${({ theme }) => theme.colors.white};
  }

  /* overrides hover highlight rows style */
  &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: ${({ theme }) => theme.colors.grey_3};
  }

  &.ReactTable .rt-thead.-header {
    box-shadow: none;
    border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
    border-bottom: solid 2px ${({ theme }) => theme.colors.grey_2};
    & .rt-th {
      padding: 10px 16px;
      border-left: none;
      border-right: none;
      text-align: left;
      display: flex;
      justify-content: space-between;
      ${({ sortable }) =>
        sortable
          ? css`
              &.-sort-asc {
                box-shadow: none;
                &:after {
                  content: url(${ascending});
                }
              }
            `
          : css``}
      ${({ sortable }) =>
        sortable
          ? css`
              &.-sort-desc {
                box-shadow: none;
                &:after {
                  content: url(${descending});
                }
              }
            `
          : css``}
    }
  }
`;

const Table = ({
  className = "",
  stripped = true,
  highlight = true,
  ...rest
}) => (
  <StyledTable
    className={`${className} ${stripped ? "-striped" : ""} ${
      highlight ? "-highlight" : ""
    }`}
    minRows={0}
    showPagination={false}
    {...rest}
  />
);

Table.propTypes = {
  /**
   * This component effectively exposes the full react-table API
   */
  ...ReactTable.propTypes,
  /**
   * Whether to strip odd rows
   */
  stripped: PropTypes.bool,
  /**
   * Whether to highlight hovered row
   */
  highlight: PropTypes.bool
};

export default Table;
export { default as TablePagination } from "./TablePagination";
