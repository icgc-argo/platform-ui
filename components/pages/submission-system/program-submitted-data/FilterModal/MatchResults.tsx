import React, { Fragment } from 'react';
import { css } from '@icgc-argo/uikit';

export default function MatchResults({
  numMatched,
  numUnmatched,
}: {
  numMatched: number;
  numUnmatched: number;
}) {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        Matched IDs:
        <b
          css={css`
            margin-left: 4px;
            color: #0774d3;
          `}
        >
          {numMatched}
        </b>
      </div>
      {/* <div> of unmatched ID */}
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        Unmatched IDs:
        <b
          css={css`
            margin-left: 4px;
            color: #0774d3;
          `}
        >
          {numUnmatched}
        </b>
      </div>
    </>
  );
}
