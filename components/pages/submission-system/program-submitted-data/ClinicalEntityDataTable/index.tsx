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

import { TableInfoHeaderContainer } from '../../common';
import ErrorNotification from '../../ErrorNotification';
import {
  aliasedEntityFields,
  aliasedEntityNames,
  aliasSortNames,
  clinicalEntityFields,
  ClinicalEntityQueryResponse,
  ClinicalEntitySearchResultResponse,
  defaultClinicalEntityFilters,
  emptyClinicalDataResponse,
  emptySearchResponse,
  clinicalEntityDisplayNames,
  CompletionStates,
} from '../common';
import CLINICAL_ENTITY_DATA_QUERY from './gql/CLINICAL_ENTITY_DATA_QUERY';

import { DOCS_DICTIONARY_PAGE } from 'global/constants/docSitePaths';
import { useClinicalSubmissionSchemaVersion } from 'global/hooks/useClinicalSubmissionSchemaVersion';

import { ClinicalSearchResults } from 'generated/gql_types';
import { PROGRAM_CLINICAL_SUBMISSION_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { createRef, useState, useEffect } from 'react';

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
    accessor: 'errorMessage',
    Header: `Error Description`,
    id: 'errorMessage',
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

const coreCompletionFields = Object.keys(completionColumnHeaders);

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

const defaultEntityPageSettings = {
  page: defaultClinicalEntityFilters.page,
  pageSize: defaultClinicalEntityFilters.pageSize,
  sorted: [
    { id: 'schemaMetadata.isValid', desc: false },
    { id: 'donorId', desc: true },
  ],
};

const defaultDonorSettings = {
  ...defaultEntityPageSettings,
  sorted: [
    { id: 'completionStats.coreCompletionPercentage', desc: false },
    { id: 'schemaMetadata.isValid', desc: false },
  ],
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
    fetchPolicy: 'cache-and-network',
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
  currentDonors,
  donorSearchResults = emptySearchResponse,
  useDefaultQuery,
  noData,
}: {
  entityType: string;
  program: string;
  completionState: CompletionStates;
  currentDonors: number[];
  donorSearchResults: ClinicalEntitySearchResultResponse;
  useDefaultQuery: boolean;
  noData: boolean;
}) => {
  // Init + Page Settings
  let totalDocs = 0;
  let showCompletionStats = false;
  let records = [];
  let columns = [];
  const theme = useTheme();
  const containerRef = createRef<HTMLDivElement>();
  const defaultPageSettings =
    useDefaultQuery && entityType === 'donor' ? defaultDonorSettings : defaultEntityPageSettings;
  const [pageSettings, setPageSettings] = useState(defaultPageSettings);
  const { page, pageSize, sorted } = pageSettings;
  const [errorPageSettings, setErrorPageSettings] = useState(defaultErrorPageSettings);
  const { page: errorPage, pageSize: errorPageSize, sorted: errorSorted } = errorPageSettings;
  const { desc, id } = sorted[0];
  const sortKey = aliasSortNames[id] || id;
  const sort = `${desc ? '-' : ''}${sortKey}`;

  const {
    clinicalSearchResults: { searchResults, totalResults },
  } = donorSearchResults || emptySearchResponse;

  const nextSearchPage = (page + 1) * pageSize;

  const donorIds = useDefaultQuery
    ? []
    : currentDonors.length
    ? currentDonors
    : searchResults.map(({ donorId }: ClinicalSearchResults) => donorId);

  const submitterDonorIds =
    useDefaultQuery || currentDonors.length
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
    clinicalEntityData == undefined || loading ? emptyClinicalDataResponse : clinicalEntityData;

  const noTableData = noData || clinicalData.clinicalEntities.length === 0;

  // Collect Error Data
  const { clinicalErrors = [] } = clinicalData;
  const tableErrorGroups = [];

  clinicalErrors.forEach((donor) => {
    const relatedErrors = donor.errors.filter(
      (error) => error.entityName === aliasedEntityNames[entityType],
    );

    relatedErrors.forEach((error) => {
      const { donorId } = donor;
      const { errorType, message, fieldName } = error;
      const relatedErrorGroup = tableErrorGroups.find(
        (tableErrorGroup) =>
          tableErrorGroup[0].errorType === errorType &&
          tableErrorGroup[0].message === message &&
          tableErrorGroup[0].fieldName === fieldName,
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

    const errorMessage =
      errorType === 'UNRECOGNIZED_FIELD'
        ? `${fieldName} is not a field within the latest dictionary. Please remove this from the ${entityName}.tsv file before submitting.`
        : message;

    const entries = errorGroup.length;

    return {
      entries,
      fieldName,
      entityName,
      errorMessage,
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
  if (noTableData) {
    showCompletionStats = true;
    records = noDataCompletionStats;
  } else {
    const entityData = clinicalData.clinicalEntities.find(
      (entity) => entity.entityName === aliasedEntityNames[entityType],
    );
    columns = [...entityData.entityFields];
    const { completionStats, entityName } = entityData;
    showCompletionStats = !!(completionStats && entityName === aliasedEntityNames.donor);

    // totalDocs affects pagination and display text
    // If using default query, or using search but not filtering by donor in URL, then we display total number of search results
    // Else we use the total number of results that match our query
    totalDocs =
      (useDefaultQuery && entityType === 'donor') ||
      (!currentDonors.length && totalResults > entityData.totalDocs)
        ? totalResults
        : entityData.totalDocs;

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
          if (showCompletionStats && displayKey === 'donor_id') {
            const completionRecord = completionStats.find(
              (stat) => stat.donorId === parseInt(r.value),
            );

            if (!completionRecord) {
              clinicalRecord = { ...clinicalRecord, ...emptyCompletion };
            } else {
              const { coreCompletion, entityData: completionEntityData } = completionRecord;

              coreCompletionFields.forEach((field) => {
                const completionField = completionColumnHeaders[field];
                const isSpecimenField =
                  completionField === completionColumnHeaders['normalSpecimens'] ||
                  completionField === completionColumnHeaders['tumourSpecimens'];

                if (!isSpecimenField) {
                  const completionValue = coreCompletion[field];
                  clinicalRecord[completionField] = completionValue || 0;
                } else {
                  const {
                    specimens: {
                      coreCompletionPercentage,
                      normalSpecimensPercentage,
                      tumourSpecimensPercentage,
                      normalSubmissions,
                      tumourSubmissions,
                    },
                  } = completionEntityData;

                  if (coreCompletionPercentage === 1) {
                    clinicalRecord[completionField] = 1;
                  } else {
                    const currentPercentage =
                      completionField === completionColumnHeaders['normalSpecimens']
                        ? normalSpecimensPercentage
                        : tumourSpecimensPercentage;
                    const currentSubmissions =
                      completionField === completionColumnHeaders['normalSpecimens']
                        ? normalSubmissions
                        : tumourSubmissions;
                    const hasErrors = currentPercentage !== 1;
                    const value = hasErrors ? currentSubmissions : currentPercentage;
                    clinicalRecord[completionField] = value;
                  }
                }
              });
            }
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

    const isSpecimenCell =
      isCompletionCell &&
      (id === completionColumnHeaders.normalSpecimens ||
        id === completionColumnHeaders.tumourSpecimens);

    const originalDonorId = original['donor_id'];
    const cellDonorId = parseInt(
      originalDonorId && originalDonorId.includes('DO')
        ? originalDonorId.substring(2)
        : originalDonorId,
    );

    const donorErrorData = clinicalErrors
      .filter((donor) => donor.donorId === cellDonorId)
      .map((donor) => donor.errors)
      .flat();

    const columnErrorData =
      donorErrorData.length &&
      donorErrorData.filter(
        (error) =>
          error &&
          (error.entityName === entityType ||
            (aliasedEntityFields.includes(error.entityName) &&
              aliasedEntityNames[entityType] === error.entityName)) &&
          error.fieldName === id,
      );

    const hasClinicalErrors = columnErrorData && columnErrorData.length >= 1;

    let hasCompletionErrors = isCompletionCell && original[id] !== 1;

    if (isSpecimenCell) {
      const completionData = clinicalData.clinicalEntities.find(
        (entity) => entity.entityName === aliasedEntityNames['donor'],
      ).completionStats;

      const completionRecord =
        isCompletionCell &&
        completionData.find((stat) => stat.donorId === parseInt(originalDonorId.substr(2)));

      if (completionRecord) {
        const { entityData: completionEntityData } = completionRecord;

        const {
          specimens: { normalSpecimensPercentage, tumourSpecimensPercentage },
        } = completionEntityData;

        const currentPercentage =
          id === completionColumnHeaders['normalSpecimens']
            ? normalSpecimensPercentage
            : tumourSpecimensPercentage;

        hasCompletionErrors = currentPercentage !== 1;
      }
    }

    const specificErrorValue =
      hasClinicalErrors &&
      columnErrorData.filter(
        (error) =>
          (error.errorType === 'INVALID_BY_SCRIPT' || error.errorType === 'INVALID_ENUM_VALUE') &&
          (error.info?.value === original[id] ||
            (error.info?.value && error.info.value[0] === original[id]) ||
            (error.info.value === null && !Boolean(original[id]))),
      );

    const fieldError =
      hasClinicalErrors &&
      columnErrorData.filter(
        (error) =>
          (error.errorType === 'UNRECOGNIZED_FIELD' ||
            error.errorType === 'MISSING_REQUIRED_FIELD') &&
          error.fieldName === id,
      );

    const errorState =
      // Completion Stats === 1 indicates Complete
      // 0 is Incomplete, <1 Incorrect Sample / Specimen Ratio
      (isCompletionCell && hasCompletionErrors) ||
      specificErrorValue?.length > 0 ||
      fieldError?.length > 0;

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
      isCompletionCell,
      errorState,
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
      minWidth: getColumnWidth(key, showCompletionStats, noTableData),
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
                  NS: all the registered Normal DNA Specimen record <br />
                  TS: all the registered Tumour DNA Specimen record <br />
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
          maxWidth: noTableData ? 50 : 250,
          style: noTableData ? noDataCellStyle : {},
          Cell: ({ value, tdProps }) => {
            const { isCompletionCell, errorState } = tdProps.rest;
            const showSuccessSvg = isCompletionCell && !errorState;

            return showSuccessSvg ? (
              <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />
            ) : (
              value
            );
          },
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
  ) : noTableData ? (
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
            title={`${totalErrors.toLocaleString()} error(s) found on the current page of ${clinicalEntityDisplayNames[
              entityType
            ].toLowerCase()} table`}
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
            Showing {tableMin} - {tableMax} of {totalDocs} records
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
