import ErrorLayout from 'components/pages/error';
import React from 'react';
import { css } from 'uikit';
import A from 'uikit/Link';
import Typography from 'uikit/Typography';

export default function Error404Page() {
  const handleReloadClick = () => window.location.reload();
  return (
    <ErrorLayout>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 23px 15px 23px 47px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <Typography
            css={css`
              font-size: 40px;
              margin: 0;
              margin-bottom: 12px;
            `}
          >
            Ooops!
          </Typography>
          <Typography
            css={css`
              margin-bottom: 34px;
            `}
            as="div"
            variant="subtitle"
            color="secondary"
          >
            Something went wrong
          </Typography>
          <Typography
            variant="subtitle2"
            css={css`
              margin: 0;
            `}
          >
            We are working on fixing the problem and appreciate your patience.{' '}
            <A href="#" onClick={handleReloadClick}>
              Reload this page
            </A>
            .
          </Typography>
        </div>
        <div>
          <img alt="Bug in the code" src="/static/client-error.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
}
