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

import React from 'react';
import Container from 'uikit/Container';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { css } from 'uikit';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import SimpleTable from 'uikit/Table/SimpleTable';
import ContentError from 'components/placeholders/ContentError';
import Header from './Header';
import Samples from './Samples';
import Timeline from './Timeline';
import Treatment from './Treatment';
import { Entity, EntityType, SampleNode, TreatmentNode } from './types';
import { splitIntoColumns, tableFormat } from './util';

export const ENTITY_DISPLAY = Object.freeze({
  primary_diagnosis: {
    title: 'Primary Diagnosis',
  },
  specimen: {
    title: 'Specimen',
  },
  treatment: {
    title: 'Treatment',
  },
  follow_up: {
    title: 'Follow Up',
  },
  biomarker: {
    title: 'Biomarkers',
  },
});

const renderSelectedDataRow = (selectedData, selectedSamples) => {
  if (selectedSamples.length > 0 && !isEmpty(selectedData)) {
    const dataCols = splitIntoColumns(selectedData, 2);
    return (
      <Col>
        <Row>
          <Col>
            <SimpleTable data={tableFormat(dataCols[0])} />
          </Col>
          <Col>{!isEmpty(dataCols[1]) && <SimpleTable data={tableFormat(dataCols[1])} />}</Col>
        </Row>
        <Row
          css={css`
            margin-top: 20px;
          `}
        >
          <Samples samples={selectedSamples} />
        </Row>
      </Col>
    );
  } else if (!isEmpty(selectedData)) {
    const dataCols = splitIntoColumns(selectedData, 2);
    return (
      <Row>
        <Col>
          <SimpleTable data={tableFormat(dataCols[0])} />
        </Col>
        {/* always display column for row formatting */}
        <Col>
          {
            // may only have enough data for 1 column
            !isEmpty(dataCols[1]) && <SimpleTable data={tableFormat(dataCols[1])} />
          }
        </Col>
      </Row>
    );
  } else {
    return (
      <Row>
        <Col>
          <ContentError />
        </Col>
      </Row>
    );
  }
};

const ClinicalTimeline = ({ data }) => {
  const theme = useTheme();

  const [activeEntities, setActiveEntities] = React.useState<Array<EntityType>>([
    EntityType.FOLLOW_UP,
    EntityType.PRIMARY_DIAGNOSIS,
    EntityType.SPECIMEN,
    EntityType.BIOMARKER,
    EntityType.TREATMENT,
  ]);

  const [activeTab, setActiveTab] = React.useState<number>(0);
  const filteredData = data.filter(
    ({ type }) => activeEntities.includes(type) || type === EntityType.DECEASED,
  );
  const selectedClinical: Entity = filteredData[activeTab];
  const selectedSamples: SampleNode[] = get(selectedClinical, 'samples', []);
  const selectedTreatments: TreatmentNode[] = get(selectedClinical, 'treatments', []);
  const selectedData = get(selectedClinical, 'data', {});

  return (
    <Container
      css={css`
        padding: 12px 14px;
        min-height: 750px;
        display: flex;
        flex-direction: column;
      `}
    >
      <Header
        entities={data}
        activeEntities={activeEntities}
        onFiltersChange={(activeEntities) => {
          setActiveTab(0);
          setActiveEntities(activeEntities);
        }}
      />
      <div
        css={css`
          display: flex;
          flex: 1;
        `}
      >
        <>
          <div
            css={css`
              writing-mode: vertical-lr;
              transform: rotate(180deg);
              margin-right: 10px;
              text-align: center;
            `}
          >
            <Typography
              variant="data"
              css={css`
                font-weight: 600;
              `}
            >
              Interval since diagnosis (days)
            </Typography>
          </div>
          <Timeline
            entities={filteredData}
            activeTab={activeTab}
            onClickTab={({ entity, idx }) => {
              setActiveTab(idx);
            }}
          />

          <Row
            style={{
              flex: 1,
              padding: '10px 20px',
              border: `1px solid ${theme.colors.grey_1}`,
              marginLeft: '-1px',
            }}
          >
            <Col>
              <Typography variant="navigation">
                {ENTITY_DISPLAY[selectedClinical.type].title}
              </Typography>
              <div
                css={css`
                  display: flex;
                  margin-top: 10px;
                  flex-direction: column;
                `}
              >
                {renderSelectedDataRow(selectedData, selectedSamples)}
              </div>

              {selectedTreatments.length > 0 && (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  {selectedTreatments.map((treatment, i) => (
                    <Treatment key={`treatment-${i}`} treatment={treatment} />
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </>
      </div>
    </Container>
  );
};

export default ClinicalTimeline;
