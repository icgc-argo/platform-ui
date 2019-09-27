import * as React from 'react';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import NoData from 'uikit/NoData';

export default function NoDataMessage(props: { loading: boolean }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 0;
      `}
    >
      {props.loading ? (
        <DnaLoader />
      ) : (
        <NoData
          title="  You do not have any registration data uploaded."
          subtitle="    Follow the instructions above to get started."
        >
          <img alt="Chemistry beakers" src="/static/beakers.svg" />
        </NoData>
      )}
    </div>
  );
}
