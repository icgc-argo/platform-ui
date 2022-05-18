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
import Link from 'uikit/Link';
import TitleBar from 'uikit/TitleBar';
import SubmissionLayout from '../layout';
import CLINICAL_ENTITY_DATA from './CLINICAL_ENTITY_DATA.gql';
import { ClinicalEntityQueryResponse, clinicalEntityFilters } from './common';

setConfiguration({ gutterWidth: 9 });

const defaultClinicalEntityTab = 'donor';

export default function ProgramDashboard(props) {
  const {
    query: { shortName: programShortName },
  } = usePageContext();
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();

  const { data: clinicalEntityData } =
    FEATURE_SUBMITTED_DATA_ENABLED &&
    useQuery<ClinicalEntityQueryResponse>(CLINICAL_ENTITY_DATA, {
      errorPolicy: 'all',
      variables: {
        programShortName: programShortName,
        filters: clinicalEntityFilters,
      },
    });

  const [selectedClinicalEntityTab, setSelectedClinicalEntityTab] = useUrlParamState(
    'tab',
    defaultClinicalEntityTab,
    {
      serialize: (v) => v,
      deSerialize: (v) => v,
    },
  );

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
      <div></div>
    </SubmissionLayout>
  );
}
