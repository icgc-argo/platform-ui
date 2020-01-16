import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import usePageContext from 'global/hooks/usePageContext';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { JUST_JOINED_PROGRAM_STORAGE_KEY } from '../join/details';
import { SchemaInvalidSubmisisonNotification } from '../SchemaInvalidSubmissionNotification';
import { SubmissionSystemLockedNotification } from '../SubmissionSystemLockedNotification';
import { Row, Col, ScreenClassRender } from 'react-grid-system';
import StatsBar from './StatsBar';
import DonorReleaseSummary from './DonorReleaseSummary';
import CompletedClinicalData from './CompletedClinicalData';
import MolecularDataSummary from './MolecularDataSummary';
import ProgramWorkspaceStatus from './ProgramWorkspaceStatus';
import DonorDataSummary from './DonorDataSummary';
import { setConfiguration } from 'react-grid-system';

setConfiguration({ gutterWidth: 9 });

export default function ProgramDashboard() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const [justJoined, setJustJoined] = React.useState(null);

  React.useEffect(() => {
    // to prevent server side rendering mismatch
    if (typeof window !== 'undefined') {
      const justJoinedProgram = window.localStorage.getItem(JUST_JOINED_PROGRAM_STORAGE_KEY);
      if (justJoinedProgram === programShortName) {
        setJustJoined(true);
        window.localStorage.removeItem(JUST_JOINED_PROGRAM_STORAGE_KEY);
      }
    }
  });

  const applyStackedStyle = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    !['xl'].includes(size)
      ? css`
          padding-bottom: 15px;
        `
      : css`
          padding-bottom: 0px;
        `;
  return (
    <SubmissionLayout
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <>Dashboard</>
          </TitleBar>
        </div>
      }
    >
      {justJoined && (
        <Banner
          title={`Welcome to ${programShortName}!`}
          interactionType="CLOSE"
          onInteraction={() => setJustJoined(false)}
          variant={BANNER_VARIANTS.SUCCESS}
          content="If you have trouble getting started, please check out our documentation for program management, data access and data submission."
          css={css`
            margin-bottom: 30px;
          `}
        />
      )}
      {<SubmissionSystemLockedNotification marginBottom={20} />}
      {
        <SchemaInvalidSubmisisonNotification
          marginBottom={20}
          programShortName={programShortName as string}
        />
      }
      <Row
        css={css`
          padding-bottom: 7px;
        `}
      >
        <Col xs={12}>
          <StatsBar />
        </Col>
      </Row>

      <Row
        justify="between"
        css={css`
          padding-bottom: 9px;
        `}
      >
        <Col xl={4} lg={12}>
          <Row
            css={css`
              padding-bottom: 10px;
            `}
          >
            <Col xs={12}>
              <DonorReleaseSummary />
            </Col>
          </Row>
          <Row
            css={css`
              padding-bottom: 9px;
            `}
          >
            <Col xs={12}>
              <ProgramWorkspaceStatus />
            </Col>
          </Row>
        </Col>
        <ScreenClassRender
          render={screenClass => (
            <Col xl={4} lg={12} css={applyStackedStyle(screenClass)}>
              <CompletedClinicalData />
            </Col>
          )}
        />

        <Col xl={4} lg={12}>
          <MolecularDataSummary />
        </Col>
      </Row>
      <Row
        css={css`
          padding-bottom: 7px;
        `}
      >
        <Col xs={12}>
          <DonorDataSummary />
        </Col>
      </Row>
    </SubmissionLayout>
  );
}
