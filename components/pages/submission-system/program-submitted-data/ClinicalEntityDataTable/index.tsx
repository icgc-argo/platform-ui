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

import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import memoize from 'lodash/memoize';
import React, { useState, useEffect } from 'react';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import Icon from 'uikit/Icon';
import Table from 'uikit/Table';
import noDataSvg from 'uikit/assets/noData.svg';
import Tooltip from 'uikit/Tooltip';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import { TableInfoHeaderContainer } from '../../common';
import CLINICAL_ENTITY_DATA from '../CLINICAL_ENTITY_DATA.gql';
import {
  aliasSortNames,
  aliasEntityNames,
  clinicalEntityFields,
  ClinicalEntityQueryResponse,
  CoreCompletionFields,
  defaultClinicalEntityFilters,
  emptyResponse,
} from '../common';

export type DonorEntry = {
  row: string;
  isNew: boolean;
  [k: string]: string | number | boolean;
};

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 14px auto;
`;

const NoDataCell = () => (
  <Container>
    <img
      alt="no data found"
      css={css`
        height: 75px;
      `}
      src={noDataSvg}
    />
    <Typography
      css={css`
        margin-top: 14px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="data"
      as="p"
      bold
    >
      No Data Found
    </Typography>
  </Container>
);

const completionColumnHeaders = {
  donor: 'DO',
  primaryDiagnosis: 'PD',
  normalSpecimens: 'NS',
  tumourSpecimens: 'TS',
  treatments: 'TR',
  followUps: 'FO',
};

const getColumnWidth = memoize<
  (keyString: string, showCompletionStats: boolean, noData: boolean) => number
>((keyString, showCompletionStats, noData) => {
  const minWidth = showCompletionStats ? 45 : 95;
  const maxWidth = noData && showCompletionStats && keyString !== ' ' ? 45 : 200;
  const spacePerChar = 8;
  const margin = 10;
  const targetWidth = keyString.length * spacePerChar + margin;
  return Math.max(Math.min(maxWidth, targetWidth), minWidth);
});

const defaultPageSettings = {
  page: defaultClinicalEntityFilters.page,
  pageSize: defaultClinicalEntityFilters.pageSize,
  sorted: [{ id: 'donorId', desc: true }],
};

const validateEntityQueryName = (entityQuery) => {
  const entities = typeof entityQuery === 'string' ? [entityQuery] : entityQuery;
  return entities.map((entityName) => clinicalEntityFields.find((entity) => entity === entityName));
};

export const getEntityData = (
  program: string,
  entityType: string | string[],
  page: number,
  pageSize: number,
  sort: string,
) =>
  useQuery<ClinicalEntityQueryResponse>(CLINICAL_ENTITY_DATA, {
    errorPolicy: 'all',
    variables: {
      programShortName: program,
      filters: {
        ...defaultClinicalEntityFilters,
        sort,
        page,
        pageSize,
        entityTypes: validateEntityQueryName(entityType),
      },
    },
  });

const ClinicalEntityDataTable = ({
  entityType,
  program,
}: {
  entityType: string;
  program: string;
}) => {
  let totalDocs = 0;
  let showCompletionStats = false;
  let records = [];
  let columns = [];
  const theme = useTheme();
  const containerRef = React.createRef<HTMLDivElement>();
  const [pageSettings, setPageSettings] = useState(defaultPageSettings);
  const { page, pageSize, sorted } = pageSettings;
  const { desc, id } = sorted[0];
  const sort = `${desc ? '-' : ''}${aliasSortNames[id] || id}`;

  const updatePageSettings = (key, value) => {
    const newPageSettings = { ...pageSettings, [key]: value };
    setPageSettings(newPageSettings);
    return newPageSettings;
  };

  useEffect(() => {
    setPageSettings(defaultPageSettings);
  }, [entityType]);

  const { data: clinicalEntityData, loading } = getEntityData(
    program,
    entityType,
    page,
    pageSize,
    sort,
  );
  const { clinicalData } =
    clinicalEntityData == undefined || loading ? emptyResponse : clinicalEntityData;
  const noData = clinicalData.clinicalEntities.length === 0;

  if (noData) {
    showCompletionStats = true;
    columns = ['donor_id', ...Object.values(completionColumnHeaders), ' '];

    records = [
      {
        donor_id: 0,
        DO: 0,
        PD: 0,
        FO: 0,
        NS: 0,
        TR: 0,
        TS: 0,
        ' ': ' ',
      },
    ];
  } else {
    const entityData = clinicalData.clinicalEntities.find(
      (entity) => entity.entityName === aliasEntityNames[entityType],
    );
    const { completionStats, entityName } = entityData;
    showCompletionStats = !!(completionStats && entityName === aliasEntityNames.donor);

    totalDocs = entityData.totalDocs;

    entityData.records.forEach((record) => {
      record.forEach((r) => {
        if (!columns.includes(r.name)) columns.push(r.name);
      });
    });
    if (showCompletionStats) {
      columns.splice(1, 0, ...Object.values(completionColumnHeaders));
    }

    records = entityData.records.map((record) => {
      let clinicalRecord = {};
      record.forEach((r) => {
        clinicalRecord[r.name] = r.value || '--';
        if (completionStats && r.name === 'donor_id') {
          const completion = completionStats.find(
            (stat) => stat.donorId === parseInt(r.value),
          ).coreCompletion;

          CoreCompletionFields.forEach((field) => {
            clinicalRecord[completionColumnHeaders[field]] =
              completion[field] === null ? 0 : completion[field];
          });

          clinicalRecord = { ...clinicalRecord, ...completion };
        }
      });

      return clinicalRecord;
    });
  }

  const getHeaderBorder = (key) =>
    (showCompletionStats && key === completionColumnHeaders.followUps) ||
    (!showCompletionStats && key === 'donor_id')
      ? `3px solid ${theme.colors.grey}`
      : '';

  const getCellStyles = (state, row, column) => {
    const { original } = row;
    const { id } = column;

    const isCompletionCell =
      showCompletionStats && Object.values(completionColumnHeaders).includes(id);
    const errorState = original[id] === 0;
    const border = getHeaderBorder(id);

    return {
      style: {
        color: isCompletionCell && !errorState ? theme.colors.accent1_dark : '',
        background: isCompletionCell && errorState ? theme.colors.error_4 : '',
        borderRight: border,
      },
    };
  };

  columns = columns.map((key) => {
    return {
      id: key,
      accessor: key,
      Header: key,
      headerStyle: {
        borderRight: getHeaderBorder(key),
      },
      minWidth: getColumnWidth(key, showCompletionStats, noData),
    };
  });

  if (showCompletionStats) {
    const completionHeaderStyle = {
      borderRight: getHeaderBorder(completionColumnHeaders.followUps),
    };

    const dataHeaderStyle = {
      textAlign: 'center',
    };

    columns = [
      {
        Header: (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            `}
          >
            CLINICAL CORE COMPLETION
            <Tooltip
              style={{ position: 'absolute', left: 'calc(100% - 20px)', top: '-2px' }}
              html={
                <p
                  css={css`
                    margin: 0px;
                    margin-right: 6px;
                  `}
                >
                  For clinical completeness, each donor requires: <br />
                  DO: at least one Donor record <br />
                  PD: at least one Primary Diagnosis record <br />
                  NS: at least one Normal DNA Specimen record <br />
                  TS: at least one Tumour DNA Specimen record <br />
                  TR: at least one Treatment record <br />
                  FO: at least one Follow Up record <br />
                </p>
              }
            >
              <Icon name="question_circle" fill="primary_2" width="18px" height="18px" />
            </Tooltip>
          </div>
        ),
        headerStyle: completionHeaderStyle,
        columns: columns.slice(0, 7).map((column) => ({ ...column, maxWidth: noData ? 45 : 250 })),
      },
      {
        Header: 'SUBMITTED DONOR DATA',
        headerStyle: dataHeaderStyle,
        columns: columns.slice(7).map((column) =>
          noData
            ? {
                Cell: <NoDataCell />,
              }
            : column,
        ),
      },
    ];
  }

  const min = totalDocs > 0 ? page * pageSize + 1 : totalDocs;
  const max = totalDocs < (page + 1) * pageSize ? totalDocs : (page + 1) * pageSize;
  const pages = Math.ceil(totalDocs / pageSize);

  return loading ? (
    <DnaLoader />
  ) : (
    <div
      ref={containerRef}
      css={css`
        position: relative;
      `}
    >
      <TableInfoHeaderContainer
        left={
          <Typography
            css={css`
              margin: 0px;
            `}
            variant="data"
          >
            Showing {min} - {max} of {totalDocs}
          </Typography>
        }
      />
      <Table
        withOutsideBorder
        manual
        parentRef={containerRef}
        showPagination={true}
        page={page}
        pages={pages}
        pageSize={pageSize}
        sorted={sorted}
        getTdProps={getCellStyles}
        columns={columns}
        data={records}
        onPageChange={(value) => updatePageSettings('page', value)}
        onPageSizeChange={(value) => updatePageSettings('pageSize', value)}
        onSortedChange={(value) => updatePageSettings('sorted', value)}
      />
    </div>
  );
};

export default ClinicalEntityDataTable;
