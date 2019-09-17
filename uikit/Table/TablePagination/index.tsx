import React from 'react';
import PropTypes from 'prop-types';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';
import range from 'lodash/range';
import css from '@emotion/css';
import styled from '@emotion/styled';

import Typography from '../../Typography';
import useTheme from '../../utils/useTheme';
import Select from '../../form/Select';
import { POPUP_POSITIONS } from '../../form/Select/styledComponents';
import Icon from '../../Icon';

export const TableActionBar = props => {
  const { variant = 'label', color = 'grey', component = 'div' } = props;

  return (
    <Typography
      {...props}
      variant={variant}
      color={color}
      component={component}
      css={css`
        min-height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 8px;
      `}
    />
  );
};

const Arrow = ({ transform, className }) => (
  <Icon
    className={className}
    width="6px"
    height="6px"
    name="chevron_right"
    fill="grey"
    transform={transform}
  />
);

const DoubleArrow = ({ transform }) => (
  <>
    <Arrow transform={transform} />
    <Arrow
      css={css`
        position: relative;
        left: -3px;
      `}
      transform={transform}
    />
  </>
);

const A = styled('a')`
  ${({ theme }) => css(theme.typography.data)};
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
  width: 24px;
  margin-right: 2px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_4};
  }
`;

const PageControl = styled('div')`
  display: flex;
  align-items: center;
  & a {
    cursor: pointer;
    display: inline-block;
    width: 24px;
    text-align: center;
  }
`;

// given 1 5 5 or 2 5 5, return [0,1,2,3,4]
function getPagesAround(p, num, pages) {
  const l = p - floor(num / 2);
  const r = p + ceil(num / 2);
  if (r > pages) {
    return range(pages - num, pages);
  }

  if (l < 0) {
    return range(0, num);
  }
  return range(l, r);
}

function TablePagination(props) {
  const { pages, page, showPageSizeOptions, pageSizeOptions, pageSize, onPageSizeChange } = props;

  const theme = useTheme();

  return (
    <TableActionBar
      css={css`
        & svg {
          box-sizing: content-box !important;
        }
        & a > svg {
          position: relative;
        }
      `}
    >
      {showPageSizeOptions ? (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          Show
          <div
            css={css`
              transform: scale(0.8);
            `}
          >
            <Select
              css={css`
                & [role='button'] {
                  min-width: 70px;
                }
              `}
              aria-label="Select page size"
              options={pageSizeOptions.map(v => ({ content: v.toString(), value: v }))}
              onChange={onPageSizeChange}
              value={pageSize}
            />
          </div>
          rows
        </div>
      ) : (
        <div />
      )}

      <PageControl>
        <div>
          <A
            onClick={() => {
              props.onPageChange(0);
            }}
          >
            <DoubleArrow theme={theme} transform="rotate(180)" />
          </A>
          <A
            onClick={() => {
              props.onPageChange(page - 1);
            }}
          >
            <Arrow theme={theme} transform="rotate(180)" />
          </A>
          {getPagesAround(page, 5, pages).map(
            p =>
              p > -1 &&
              p < pages && (
                <A
                  key={p}
                  onClick={() => props.onPageChange(p)}
                  css={css`
                    background-color: ${page === p ? theme.colors.secondary_4 : ''};
                  `}
                >
                  {p + 1}
                </A>
              ),
          )}
          <A
            onClick={() => {
              props.onPageChange(page + 1);
            }}
          >
            <Arrow theme={theme} />
          </A>
          <A
            onClick={() => {
              props.onPageChange(pages);
            }}
          >
            <DoubleArrow theme={theme} />
          </A>
        </div>
      </PageControl>
    </TableActionBar>
  );
}

TablePagination.propTypes = {
  /*
   * check https://github.com/tannerlinsley/react-table/blob/v6/src/pagination.js
   */
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  showPageSizeOptions: PropTypes.bool,
  pageSizeOptions: PropTypes.array,
  onPageSizeChange: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default TablePagination;
