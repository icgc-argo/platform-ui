import React from 'react';
import noDataSvg from './noData.svg';
import css from '@emotion/css';
import Typography from '../Typography';
import useTheme from '../utils/useTheme';

export default function NoDataComponent(props) {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 32px 0;
      `}
    >
      {props.loading ? null : (
        <>
          <img alt="no data found" src={noDataSvg} />
          <Typography
            variant="navigation"
            css={css`
              font-weight: 600;
              color: ${theme.colors.grey};
              margin: 16px 0;
            `}
          >
            No Data Found
          </Typography>
        </>
      )}
    </div>
  );
}
