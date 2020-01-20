import * as React from 'react';
import SubmissionLayout from '../layout';
import { css, styled } from 'uikit';
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

  const PaddedRow = styled(Row)`
    padding-bottom: 8px;
  `;

  const applyStackedStyle = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    !['xl'].includes(size)
      ? css`
          padding-bottom: 16px;
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
      <PaddedRow justify="around">
        <Col xs={12}>
          <StatsBar />
        </Col>
      </PaddedRow>

      <PaddedRow justify="between">
        <Col xl={4} lg={12}>
          <PaddedRow>
            <Col xs={12}>
              <DonorReleaseSummary />
            </Col>
          </PaddedRow>
          <Row>
            <ScreenClassRender
              render={screenClass => (
                <Col xs={12} css={applyStackedStyle(screenClass)}>
                  <ProgramWorkspaceStatus />
                </Col>
              )}
            />
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
      </PaddedRow>
      <PaddedRow>
        <Col xs={12}>
          <DonorDataSummary />
        </Col>
      </PaddedRow>
    </SubmissionLayout>
  );
}
