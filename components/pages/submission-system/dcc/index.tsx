import SubmissionLayout from '../layout';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';

export default () => {
  return (
    <SubmissionLayout
      subtitle="DCC Dashboard"
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <Typography
            as="h1"
            variant="title"
            color="primary"
            css={css`
              margin: 0px;
            `}
          >
            DCC Dashboard
          </Typography>
        </div>
      }
    >
      <div />
    </SubmissionLayout>
  );
};
