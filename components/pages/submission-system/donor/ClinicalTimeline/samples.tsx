import React from 'react';
import Typography from 'uikit/Typography';
import { css, styled } from 'uikit';
import { Entity } from './types';

const SampleList = styled('div')`
  > div:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.grey_2};
  }
`;

const Samples = ({ samples }: { samples: Entity['samples'] }) => (
  <SampleList>
    {samples.map(sample => (
      <div
        css={css`
          padding: 5px 0;
        `}
      >
        <div>
          <Typography variant="caption">Submitter Sample ID: </Typography>
          <Typography variant="data" bold>
            {sample.id}
          </Typography>
        </div>
        <div>
          <Typography variant="caption">Sample Type: </Typography>
          <Typography variant="data" bold>
            {sample.type}
          </Typography>
        </div>
      </div>
    ))}
  </SampleList>
);

export default Samples;
