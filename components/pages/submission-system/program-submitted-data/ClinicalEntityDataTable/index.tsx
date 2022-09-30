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

import { useQuery } from '@apollo/client';
import {
  ContentPlaceholder,
  css,
  DnaLoader,
  Icon,
  Link,
  noDataSvg,
  NOTIFICATION_VARIANTS,
  Table,
  Tooltip,
  Typography,
  useTheme,
} from '@icgc-argo/uikit';
import memoize from 'lodash/memoize';
import React, { useEffect, useState } from 'react';
import { TableInfoHeaderContainer } from '../../common';
import ErrorNotification from '../../ErrorNotification';
import {
  aliasedEntityFields,
  aliasedEntityNames,
  aliasSortNames,
  clinicalEntityDisplayNames,
  clinicalEntityFields,
  ClinicalEntityQueryResponse,
  ClinicalEntitySearchResultResponse,
  CompletionStates,
  CoreCompletionFields,
  defaultClinicalEntityFilters,
  emptyResponse,
  reverseLookUpEntityAlias,
} from '../common';
import CLINICAL_ENTITY_DATA_QUERY from './gql/CLINICAL_ENTITY_DATA_QUERY';

import { DOCS_DICTIONARY_PAGE } from 'global/constants/docSitePaths';
import { useClinicalSubmissionSchemaVersion } from 'global/hooks/useClinicalSubmissionSchemaVersion';

import { ClinicalSearchResults } from 'generated/gql_types';
import { PROGRAM_CLINICAL_SUBMISSION_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';

export type DonorEntry = {
  row: string;
  isNew: boolean;
  [k: string]: string | number | boolean;
};

const errorColumns = [
  {
    accessor: 'entries',
    Header: '# Affected Records',
    id: 'entries',
    maxWidth: 135,
  },
  {
    accessor: 'fieldName',
    Header: `Field with Error`,
    id: 'fieldName',
    maxWidth: 215,
  },
  {
    accessor: 'message',
    Header: `Error Description`,
    id: 'message',
  },
];

const NoDataCell = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
    `}
  >
    <ContentPlaceholder title="No Data Found.">
      <img alt="No Data" src={noDataSvg} />
    </ContentPlaceholder>
  </div>
);

const completionKeys = Object.values(aliasSortNames);
const completionColumnNames = Object.keys(aliasSortNames);
const emptyCompletion = {
  DO: 0,
  PD: 0,
  FO: 0,
  NS: 0,
  TR: 0,
  TS: 0,
};

const noDataCompletionStats = [
  {
    donor_id: 0,
    ...emptyCompletion,
  },
];

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
  const minWidth = keyString === 'donor_id' ? 70 : showCompletionStats ? 40 : 95;
  const maxWidth = noData && showCompletionStats ? 45 : 200;
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

const defaultErrorPageSettings = {
  page: 0,
  pageSize: 5,
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
  completionState: CompletionStates,
  donorIds: number[],
  submitterDonorIds: string[],
) =>
  useQuery<ClinicalEntityQueryResponse>(CLINICAL_ENTITY_DATA_QUERY, {
    errorPolicy: 'all',
    variables: {
      programShortName: program,
      filters: {
        ...defaultClinicalEntityFilters,
        sort,
        page,
        pageSize,
        completionState,
        donorIds,
        submitterDonorIds,
        entityTypes: validateEntityQueryName(entityType),
      },
    },
  });

const ClinicalEntityDataTable = ({
  entityType,
  program,
  completionState = CompletionStates['all'],
  donorSearchResults,
  useDefaultQuery,
}: {
  entityType: string;
  program: string;
  completionState: CompletionStates;
  donorSearchResults: ClinicalEntitySearchResultResponse;
  useDefaultQuery: boolean;
}) => {
  // Init + Page Settings
  let totalDocs = 0;
  let showCompletionStats = false;
  let records = [];
  let columns = [];
  const theme = useTheme();
  const containerRef = React.createRef<HTMLDivElement>();
  const [pageSettings, setPageSettings] = useState(defaultPageSettings);
  const { page, pageSize, sorted } = pageSettings;
  const [errorPageSettings, setErrorPageSettings] = useState(defaultErrorPageSettings);
  const { page: errorPage, pageSize: errorPageSize, sorted: errorSorted } = errorPageSettings;
  const { desc, id } = sorted[0];
  const sortKey = aliasSortNames[id] || id;
  const sort = `${desc ? '-' : ''}${sortKey}`;
  const {
    clinicalSearchResults: { searchResults, totalResults },
  } = donorSearchResults;

  const nextSearchPage = (page + 1) * pageSize;
  const donorIds = useDefaultQuery
    ? []
    : searchResults
        .map(({ donorId }: ClinicalSearchResults) => donorId)
        .slice(page * pageSize, nextSearchPage < totalResults ? nextSearchPage : totalResults);
  const submitterDonorIds = useDefaultQuery
    ? []
    : searchResults
        .map(({ submitterDonorId }: ClinicalSearchResults) => submitterDonorId)
        .filter((id) => !!id)
        .slice(page * pageSize, nextSearchPage < totalResults ? nextSearchPage : totalResults);

  const latestDictionaryResponse = useClinicalSubmissionSchemaVersion();
  const Subtitle = ({ program = '' }) => (
    <div
      css={css`
        margin-bottom: 12px;
      `}
    >
      <Link target="_blank" href={DOCS_DICTIONARY_PAGE}>
        {!latestDictionaryResponse.loading &&
          `Version ${latestDictionaryResponse.data.clinicalSubmissionSchemaVersion}`}
      </Link>{' '}
      of the data dictionary was released and has made some donors invalid. Please download the
      error report to view the affected donors, then submit a corrected TSV file in the{' '}
      <Link href={PROGRAM_CLINICAL_SUBMISSION_PATH.replace(PROGRAM_SHORT_NAME_PATH, program)}>
        Submit Clinical Data{' '}
      </Link>
      workspace.
    </div>
  );

  const updatePageSettings = (key, value) => {
    const newPageSettings = { ...pageSettings, [key]: value };

    if (key === 'pageSize' && value !== pageSettings.pageSize) {
      // Prevents bug querying nonexistent data
      newPageSettings.page = 0;
    }
    setPageSettings(newPageSettings);
    return newPageSettings;
  };

  useEffect(() => {
    setPageSettings(defaultPageSettings);
    setErrorPageSettings(defaultErrorPageSettings);
  }, [entityType, useDefaultQuery]);

  const { data: clinicalEntityData, loading } = getEntityData(
    program,
    entityType,
    page,
    pageSize,
    sort,
    completionState,
    donorIds,
    submitterDonorIds,
  );
  const { clinicalData } =
    clinicalEntityData == undefined || loading ? emptyResponse : clinicalEntityData;
  const noData = clinicalData.clinicalEntities.length === 0;

  // Collect Error Data
  const { clinicalErrors = [] } = clinicalData;
  const tableErrorGroups = [];

  clinicalErrors.forEach((donor) => {
    const relatedErrors = donor.errors.filter(
      (error) => error.entityName === aliasedEntityNames[entityType],
    );

    relatedErrors.forEach((error) => {
      const { donorId } = donor;
      const { errorType, fieldName } = error;
      const relatedErrorGroup = tableErrorGroups.find(
        (tableErrorGroup) =>
          tableErrorGroup[0].errorType === errorType && tableErrorGroup[0].fieldName === fieldName,
      );
      const tableError = { ...error, donorId };

      if (!relatedErrorGroup) {
        tableErrorGroups.push([tableError]);
      } else {
        relatedErrorGroup.push(tableError);
      }
    });
  });

  const tableErrors = tableErrorGroups.map((errorGroup) => {
    // Counts Number of Records affected for each Error Object
    const { fieldName, entityName, message, errorType } = errorGroup[0];

    const entries = errorGroup
      .map((error) => error.donorId)
      .filter((donorId, i, originalArray) => originalArray.indexOf(donorId) === i)
      .reduce((totalRecordCount, currentDonorId) => {
        const currentEntityRecords =
          clinicalData.clinicalEntities.find(
            (entity) => reverseLookUpEntityAlias(entity.entityName) === entityType,
          )?.records || [];

        const currentDonorRecords = currentEntityRecords.filter(
          (tableRecords) =>
            tableRecords.some((record) => record.value === `${currentDonorId}`) &&
            (tableRecords.some((record) => record.name === fieldName) ||
              ((errorType === 'MISSING_REQUIRED_FIELD' || errorType === 'INVALID_BY_SCRIPT') &&
                !tableRecords.some((record) => record.name === fieldName))),
        );

        return totalRecordCount + currentDonorRecords.length;
      }, 0);

    return {
      entries,
      fieldName,
      entityName,
      message,
    };
  });

  const totalErrors = tableErrors.reduce(
    (errorCount, errorGroup) => errorCount + errorGroup.entries,
    0,
  );
  const hasErrors = totalErrors > 0;

  const sortEntityData = (prev, next) => {
    let sortVal = 0;

    if (hasErrors) {
      // If Current Entity has Errors, Prioritize Data w/ Errors
      const { errorsA, errorsB } = clinicalErrors.reduce(
        (acc, current) => {
          if (current.donorId == prev['donor_id']) {
            acc.errorsA = -1;
          }
          if (current.donorId == next['donor_id']) {
            acc.errorsB = 1;
          }
          return acc;
        },
        { errorsA: 0, errorsB: 0 },
      );

      sortVal += errorsA + errorsB;
    }

    // Handles Manual User Sorting by Core Completion columns
    const completionSortIndex = completionKeys.indexOf(sortKey);

    if (completionSortIndex) {
      const completionSortKey = completionColumnNames[completionSortIndex];
      const completionA = prev[completionSortKey];
      const completionB = next[completionSortKey];

      sortVal = completionA === completionB ? 0 : completionA > completionB ? -1 : 1;
      sortVal *= desc ? -1 : 1;
    }

    return sortVal;
  };

  // Map Completion Stats + Entity Data
  if (noData) {
    showCompletionStats = true;
    records = noDataCompletionStats;
  } else {
    const entityData = clinicalData.clinicalEntities.find(
      (entity) => entity.entityName === aliasedEntityNames[entityType],
    );
    columns = [...entityData.entityFields];
    const { completionStats, entityName } = entityData;
    showCompletionStats = !!(completionStats && entityName === aliasedEntityNames.donor);
    totalDocs = !useDefaultQuery ? totalResults : entityData.totalDocs;
    entityData.records.forEach((record) => {
      record.forEach((r) => {
        if (!columns.includes(r.name)) columns.push(r.name);
      });
    });
    if (showCompletionStats) {
      columns.splice(1, 0, ...Object.values(completionColumnHeaders));
    }

    records = entityData.records
      .map((record) => {
        let clinicalRecord = {};
        record.forEach((r) => {
          const displayKey = r.name;
          clinicalRecord[displayKey] = displayKey === 'donor_id' ? `DO${r.value}` : r.value || '';
          if (completionStats && displayKey === 'donor_id') {
            const completion =
              completionStats.find((stat) => stat.donorId === parseInt(r.value))?.coreCompletion ||
              emptyCompletion;

            CoreCompletionFields.forEach((field) => {
              const completionField = completionColumnHeaders[field];
              clinicalRecord[completionField] = completion[field] || 0;
            });

            clinicalRecord = { ...clinicalRecord, ...completion };
          }
        });

        return clinicalRecord;
      })
      .sort(sortEntityData);
  }

  const getHeaderBorder = (key) =>
    (showCompletionStats && key === completionColumnHeaders.followUps) ||
    (!showCompletionStats && key === 'donor_id')
      ? `3px solid ${theme.colors.grey}`
      : '';

  const [stickyDonorIDColumnsWidth, setStickyDonorIDColumnsWidth] = useState(74);

  const getCellStyles = (state, row, column) => {
    const { original } = row;
    const { id } = column;
    const isCompletionCell =
      showCompletionStats && Object.values(completionColumnHeaders).includes(id);

    const originalDonorId = original['donor_id'];
    const cellDonorId = parseInt(
      originalDonorId && originalDonorId.includes('DO')
        ? originalDonorId.substring(2)
        : originalDonorId,
    );

    const donorErrorData = clinicalErrors.find((donor) => donor.donorId === cellDonorId);

    const columnErrorData =
      donorErrorData &&
      donorErrorData.errors.filter(
        (error) =>
          error &&
          (error.entityName === entityType ||
            (aliasedEntityFields.includes(error.entityName) &&
              aliasedEntityNames[entityType] === error.entityName)) &&
          error.fieldName === id,
      );

    const hasClinicalErrors = columnErrorData && columnErrorData.length >= 1;

    const specificErrorValue =
      hasClinicalErrors &&
      columnErrorData.filter(
        (error) =>
          error.info?.value === original[id] ||
          (error.info?.value && error.info.value[0] === original[id]),
      );

    // TODO: Only highlight specificErrors; requires update to clinical service
    const errorState =
      (isCompletionCell && original[id] === 0) ||
      specificErrorValue?.length > 0 ||
      hasClinicalErrors;

    const border = getHeaderBorder(id);

    return {
      style: {
        color: isCompletionCell && !errorState ? theme.colors.accent1_dark : '',
        background: errorState ? theme.colors.error_4 : '',
        borderRight: border,
        ...(column.Header === 'donor_id' && {
          background: 'white',
          position: 'absolute',
        }),
        ...(column.Header === 'DO' && {
          marginLeft: stickyDonorIDColumnsWidth,
        }),
        ...(column.Header === 'program_id' &&
          !showCompletionStats && {
            marginLeft: stickyDonorIDColumnsWidth,
          }),
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
        ...(key === 'donor_id' && {
          position: 'absolute',
          //z-index used here because header element is beneath its neighbouring element.
          zIndex: 1,
          background: 'white',
        }),
        ...(key === 'DO' && {
          marginLeft: stickyDonorIDColumnsWidth,
        }),
        ...(key === 'program_id' &&
          !showCompletionStats && {
            marginLeft: stickyDonorIDColumnsWidth,
          }),
      },
      minWidth: getColumnWidth(key, showCompletionStats, noData),
    };
  });

  if (showCompletionStats) {
    const completionHeaderStyle = {
      borderRight: getHeaderBorder(completionColumnHeaders.followUps),
    };

    const dataHeaderStyle = {
      textAlign: 'left',
      paddingLeft: '6px',
    };

    const noDataCellStyle = {
      height: 50,
      borderBottom: `1px solid ${theme.colors.grey_2}`,
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
        columns: columns.slice(0, 7).map((column) => ({
          ...column,
          maxWidth: noData ? 50 : 250,
          style: noData ? noDataCellStyle : {},
          Cell: ({ value }) =>
            value === 1 ? (
              <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />
            ) : (
              value
            ),
        })),
      },
      {
        Header: <div>SUBMITTED DONOR DATA</div>,
        headerStyle: dataHeaderStyle,
        columns: columns.slice(7).map((column, i) => column),
      },
    ];
  }

  const tableMin = totalDocs > 0 ? page * pageSize + 1 : totalDocs;
  const tableMax = totalDocs < (page + 1) * pageSize ? totalDocs : (page + 1) * pageSize;
  const numTablePages = Math.ceil(totalDocs / pageSize);
  const numErrorPages = Math.ceil(totalErrors / errorPageSize);

  return loading ? (
    <DnaLoader
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
      `}
    />
  ) : noData ? (
    <NoDataCell />
  ) : (
    <div
      ref={containerRef}
      css={css`
        position: relative;
      `}
    >
      {hasErrors && (
        <div
          id="error-submission-workspace"
          css={css`
            margin: 12px 0px;
          `}
        >
          <ErrorNotification
            level={NOTIFICATION_VARIANTS.ERROR}
            title={`${totalErrors.toLocaleString()} error(s) found in ${clinicalEntityDisplayNames[
              entityType
            ].toLowerCase()} data`}
            subtitle={<Subtitle program={program} />}
            errors={tableErrors}
            columnConfig={errorColumns}
            tableProps={{
              page: errorPage,
              pages: numErrorPages,
              pageSize: errorPageSize,
              sorted: errorSorted,
              onPageChange: (value) => updatePageSettings('page', value),
              onPageSizeChange: (value) => updatePageSettings('pageSize', value),
              onSortedChange: (value) => updatePageSettings('sorted', value),
              // TODO: Test + Update Pagination in #2267
              // https://github.com/icgc-argo/platform-ui/issues/2267
              showPagination: false,
            }}
          />
        </div>
      )}
      <TableInfoHeaderContainer
        left={
          <Typography
            css={css`
              margin: 0px;
            `}
            variant="data"
          >
            Showing {tableMin} - {tableMax} of {totalDocs}
          </Typography>
        }
      />
      <Table
        withOutsideBorder
        manual
        parentRef={containerRef}
        showPagination={true}
        page={page}
        pages={numTablePages}
        pageSize={pageSize}
        defaultSortMethod={sortEntityData}
        sorted={sorted}
        getTdProps={getCellStyles}
        columns={columns}
        data={records}
        onPageChange={(value) => updatePageSettings('page', value)}
        onPageSizeChange={(value) => updatePageSettings('pageSize', value)}
        onSortedChange={(value) => updatePageSettings('sorted', value)}
        onResizedChange={(newResized) => {
          newResized.forEach(
            (column) => column.id === 'donor_id' && setStickyDonorIDColumnsWidth(column.value),
          );
        }}
      />
    </div>
  );
};

export default ClinicalEntityDataTable;
