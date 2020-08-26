/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import SubmissionLayout from '../layout';
import { css, styled } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import usePageContext from 'global/hooks/usePageContext';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { JUST_JOINED_PROGRAM_STORAGE_KEY } from '../join/details';
import { SchemaInvalidSubmissionNotification } from '../SchemaInvalidSubmissionNotification';
import { SubmissionSystemLockedNotification } from '../SubmissionSystemLockedNotification';
import { Row, Col, ScreenClassRender } from 'react-grid-system';
import StatsBar from './StatsBar';
import DonorReleaseSummary from './DonorReleaseSummary';
import CompletedClinicalData from './CompletedClinicalData';
import MolecularDataSummary from './MolecularDataSummary';
import ProgramWorkspaceStatus from './ProgramWorkspaceStatus';
import DonorDataSummary from './DonorDataSummary';
import { setConfiguration } from 'react-grid-system';
import Link from 'uikit/Link';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import Typography from 'uikit/Typography';
import {
  DOCS_SUBMITTED_DATA_PAGE,
  DOCS_DATA_ACCESS_PAGE,
  DOCS_MANAGING_PROGRAM_ACCESS_PAGE,
  DOCS_SUBMISSION_OVERVIEW_PAGE,
} from 'global/constants/docSitePaths';
import Head from 'components/pages/head';

setConfiguration({ gutterWidth: 9 });

export default function ProgramDashboard() {
  const { DOCS_URL_ROOT } = getConfig();
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
                Dashboard
              </div>
            </Row>
          </TitleBar>
          <Link
            target="_blank"
            href={DOCS_SUBMITTED_DATA_PAGE}
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
        </div>
      }
    >
      <Head subtitle={`${programShortName} Dashboard`}></Head>
      {justJoined && (
        <Banner
          title={`Welcome to ${programShortName}!`}
          interactionType="CLOSE"
          onInteraction={() => setJustJoined(false)}
          variant={BANNER_VARIANTS.SUCCESS}
          content={
            <Typography>
              Submitters can get started registering samples and submitting clinical data using the{' '}
              <strong>Program ID: {programShortName}</strong>.
              <br />
              If you have any questions, please check out our documentation for help with{' '}
              <Link target="_blank" href={DOCS_SUBMISSION_OVERVIEW_PAGE}>
                data submission
              </Link>
              {', '}
              <Link target="_blank" href={DOCS_DATA_ACCESS_PAGE}>
                data access
              </Link>{' '}
              and{' '}
              <Link target="_blank" href={DOCS_MANAGING_PROGRAM_ACCESS_PAGE}>
                program management
              </Link>
              .
            </Typography>
          }
          css={css`
            margin-bottom: 30px;
          `}
        />
      )}
      {<SubmissionSystemLockedNotification marginBottom={20} canClose={true} />}
      {
        <SchemaInvalidSubmissionNotification
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
              render={(screenClass) => (
                <Col xs={12} css={applyStackedStyle(screenClass)}>
                  <ProgramWorkspaceStatus />
                </Col>
              )}
            />
          </Row>
        </Col>
        <ScreenClassRender
          render={(screenClass) => (
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
