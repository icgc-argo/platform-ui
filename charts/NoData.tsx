import { css } from '@emotion/react';

export const NoData = () => {
  return (
    <div
      css={css({
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        color: '#525767',
      })}
    >
      No Data Available
    </div>
  );
};
