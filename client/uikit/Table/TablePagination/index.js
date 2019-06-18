import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../form/Select';
import Icon from '../../Icon';

import css from '@emotion/css';
import Typography from '../../Typography';
import useTheme from '../../utils/useTheme';

export const TableActionBar = props => {
  const { variant = 'label', color = 'grey', component = 'div' } = props;

  return (
    <Typography
      css={css`
        min-height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${({ theme }) => theme.colors.white};
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

function TablePagination(props) {
  const { pages, page, showPageSizeOptions, pageSizeOptions, pageSize, onPageSizeChange } = props;

  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        color: ${theme.colors.grey};
        justify-content: space-between;
        height: 30px;
        & svg {
          box-sizing: content-box !important;
        }
        & a > svg {
          position: relative;
          top: -2px;
        }
      `}
    >
      {showPageSizeOptions ? (
        <div
          css={css`
            display: flex;
            align-items: center;
            font-size: 12px;
          `}
        >
          Show&nbsp;
          <div
            css={css`
              transform: scale(0.8);
            `}
          >
            <Select
              aria-label="Select page size"
              options={pageSizeOptions.map(v => ({ content: v.toString(), value: v }))}
              onChange={onPageSizeChange}
              value={pageSize}
            />
          </div>
          &nbsp;Rows
        </div>
      ) : (
        <div />
      )}

      <div
        css={css`
          display: flex;
          align-items: center;
          & a {
            cursor: pointer;
            display: inline-block;
            width: 24px;
            text-align: center;
          }
        `}
      >
        <div>
          <a
            onClick={() => {
              props.onPageChange(0);
            }}
          >
            <DoubleArrow theme={theme} transform="rotate(180)" />
          </a>
          <a
            onClick={() => {
              props.onPageChange(page - 1);
            }}
          >
            <Arrow theme={theme} transform="rotate(180)" />
          </a>
          {[page - 1, page, page + 1].map(
            p =>
              p > -1 &&
              p < pages && (
                <a
                  onClick={() => props.onPageChange(p)}
                  css={css`
                    display: inline-block;
                    cursor: pointer;
                    line-height: 24px;
                    text-align: center;
                    background-color: #fff;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    background-color: ${page === p ? theme.colors.secondary_4 : ''};

                    &:hover {
                      background-color: ${theme.colors.primary_4};
                    }
                  `}
                >
                  {p + 1}
                </a>
              ),
          )}
          <a
            onClick={() => {
              props.onPageChange(page + 1);
            }}
          >
            <Arrow theme={theme} />
          </a>
          <a
            onClick={() => {
              props.onPageChange(pages);
            }}
          >
            <DoubleArrow theme={theme} />
          </a>
        </div>
      </div>
    </div>
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
