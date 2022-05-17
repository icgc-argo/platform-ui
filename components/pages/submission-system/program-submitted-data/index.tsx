/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
import { useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import { Row, setConfiguration } from 'react-grid-system';

import { getConfig } from 'global/config';
import { DOCS_SUBMITTED_DATA_PAGE } from 'global/constants/docSitePaths';
import useUrlParamState from 'global/hooks/useUrlParamState';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Container from 'uikit/Container';
import DnaLoader from 'uikit/DnaLoader';
import Icon from 'uikit/Icon';
import Link from 'uikit/Link';
import VerticalTabs from 'uikit/VerticalTabs';
import TitleBar from 'uikit/TitleBar';
import useTheme from 'uikit/utils/useTheme';
import SubmissionLayout from '../layout';
import CLINICAL_ENTITY_DATA from './CLINICAL_ENTITY_DATA.gql';
import {
  aliasEntityNames,
  ClinicalEntityQueryResponse,
  clinicalEntityDisplayNames,
  clinicalEntityFields,
  clinicalEntityFilters,
  hasClinicalErrors,
} from './common';
import Typography from 'uikit/Typography';

setConfiguration({ gutterWidth: 9 });

const defaultClinicalEntityTab = 'donor';

export default function ProgramSubmittedData(props) {
  const {
    query: { shortName: programShortName },
  } = usePageContext();
  const theme = useTheme();
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();

  const { data: clinicalEntityData, loading } =
    FEATURE_SUBMITTED_DATA_ENABLED &&
    useQuery<ClinicalEntityQueryResponse>(CLINICAL_ENTITY_DATA, {
      errorPolicy: 'all',
      variables: {
        programShortName: programShortName,
        filters: clinicalEntityFilters,
      },
    });
  const { clinicalData } =
    clinicalEntityData == undefined || loading
      ? { clinicalData: { clinicalEntities: [], completionStats: [], clinicalErrors: [] } }
      : clinicalEntityData;

  const [selectedClinicalEntityTab, setSelectedClinicalEntityTab] = useUrlParamState(
    'tab',
    defaultClinicalEntityTab,
    {
      serialize: (v) => v,
      deSerialize: (v) => v,
    },
  );

  const menuItems = clinicalEntityFields.map((entity) => (
    <VerticalTabs.Item
      key={entity}
      active={selectedClinicalEntityTab === entity}
      onClick={(e) => setSelectedClinicalEntityTab(entity)}
      disabled={
        !clinicalData.clinicalEntities.some((e) => e.entityName === aliasEntityNames[entity])
      }
    >
      {clinicalEntityDisplayNames[entity]}
      {hasClinicalErrors(clinicalData, entity) && (
        <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
      )}
    </VerticalTabs.Item>
  ));

  return (
    <SubmissionLayout
      subtitle={`${programShortName} Dashboard`}
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
                Submitted Data
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
      <Container>
        {loading ? (
          <DnaLoader />
        ) : (
          <div
            css={css`
              width: 100%;
            `}
          >
            <div
              css={css`
                width: 20%;
                display: inline-block;
                border: 1px solid ${theme.colors.grey_2}; ;
              `}
            >
              <VerticalTabs>{menuItems}</VerticalTabs>
            </div>
            <div
              css={css`
                display: inline-block;
                height: 100%;
                width: 75%;
                vertical-align: top;
                padding: 8px 12px;
              `}
            >
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <Typography
                  variant="subtitle2"
                  css={css`
                    margin-top: 4px;
                    margin-left: 4px;
                  `}
                >
                  {clinicalEntityDisplayNames[selectedClinicalEntityTab]} Data
                </Typography>

                <Button
                  css={css`
                    white-space: nowrap;
                    height: fit-content;
                  `}
                  variant="secondary"
                >
                  <Icon
                    css={css`
                      padding-right: 4px;
                    `}
                    name="download"
                    fill="accent2_dark"
                    height="12px"
                  />
                  {clinicalEntityDisplayNames[selectedClinicalEntityTab]} Data
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </SubmissionLayout>
  );
}
