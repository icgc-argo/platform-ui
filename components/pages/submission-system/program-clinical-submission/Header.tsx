import * as React from 'react';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import Button from 'uikit/Button';

export default ({
  programShortName,
  showProgress,
  progressStates,
  isPendingApproval,
}: {
  programShortName: string;
  showProgress: boolean;
  progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    validate: React.ComponentProps<typeof Progress.Item>['state'];
    signOff: React.ComponentProps<typeof Progress.Item>['state'];
  };
  isPendingApproval: boolean;
}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      `}
    >
      <TitleBar>
        <>{programShortName}</>
        <Row nogutter align="center">
          <div
            css={css`
              margin-right: 20px;
            `}
          >
            Submit Clinical Data
          </div>
          {!showProgress && (
            <Progress>
              <Progress.Item text="Upload" state={progressStates.upload} />
              <Progress.Item text="Validate" state={progressStates.validate} />
              <Progress.Item text="Sign Off" state={progressStates.signOff} />
              {isPendingApproval && (
                <Progress.Item
                  css={css`
                    width: 100px;
                  `}
                  text="Pending Approval"
                  state="locked"
                />
              )}
            </Progress>
          )}
        </Row>
      </TitleBar>
      <Row nogutter align="center">
        {!isPendingApproval && (
          <Button
            variant="text"
            disabled
            css={css`
              margin-right: 10px;
            `}
          >
            Clear submission
          </Button>
        )}
        <Link
          bold
          withChevron
          uppercase
          underline={false}
          css={css`
            font-size: 14px;
          `}
        >
          HELP
        </Link>
      </Row>
    </div>
  );
};
