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
import NextLink from 'next/link';
import urlJoin from 'url-join';

import CLINICAL_ERRORS_QUERY from 'components/pages/submission-system/program-submitted-data/ClinicalErrors/CLINICAL_ERRORS_QUERY';
import {
  ClinicalEntityQueryResponse,
  defaultClinicalEntityFilters,
  parseDonorIdString,
} from 'components/pages/submission-system/program-submitted-data/common';

import {
  DonorDataReleaseState,
  DonorSummaryEntrySort,
  DonorSummaryEntrySortField,
  DonorSummaryEntrySortOrder,
  DonorSummaryRecord,
  MolecularProcessingStatus,
  ProgramDonorSummaryEntryField,
} from './types';

import {
  css,
  DropdownPanel,
  FilterClearButton,
  FilterOption,
  Icon,
  Link,
  ListFilter,
  styled,
  Table,
  TableColumnConfig,
  TextInputFilter,
  useTheme,
} from '@icgc-argo/uikit';
import { displayDate } from 'global/utils/common';
import { CellContentCenter, DataTableStarIcon as StarIcon, Pipeline } from '../../common';

import ContentError from 'components/placeholders/ContentError';
import { SortedChangeFunction, SortingRule } from 'global/types/table';
import { startCase } from 'lodash';

import { createRef, PropsWithChildren, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { Row } from 'react-grid-system';
import { useProgramDonorsSummaryQuery } from '.';
import {
  EMPTY_PROGRAM_SUMMARY_STATS,
  FILTER_OPTIONS,
  RELEASED_STATE_FILL_COLOURS,
  RELEASED_STATE_STROKE_COLOURS,
} from './common';
import DonorSummaryTableLegend from './DonorSummaryTableLegend';
import { PIPELINE_COLORS, PipelineNames, PipelineTabs, usePipelines } from './PipelineTabs';
import { getConfig } from 'global/config';
import { DesignationCell, DesignationCellLegacy } from './DesignationCell';

type PagingState = {
  pages: number;
  pageSize: number;
  page: number;
  sorts: DonorSummaryEntrySort[];
};

const getDefaultSort = (donorSorts: DonorSummaryEntrySort[]) =>
  donorSorts.map(({ field, order }) => ({ id: field, desc: order === 'desc' }));

const DonorSummaryTable = ({
  programShortName,
  initialPages,
  initialPageSize,
  initialSorts,
  isCardLoading = true,
}: {
  programShortName: string;
  initialPages: PagingState['pages'];
  initialPageSize: PagingState['pageSize'];
  initialSorts: PagingState['sorts'];
  isCardLoading?: boolean;
}) => {
  const theme = useTheme();
  const { FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED, FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();
  const { activePipeline, setActivePipeline } = usePipelines();

  // These are used to sort columns with multiple fields
  // the order of the fields is how its is order in asc or desc
  const ID_SEPARATOR = '-';
  const REGISTERED_SAMPLE_COLUMN_ID = 'registeredNormalSamples-registeredTumourSamples';
  const RAW_READS_COLUMN_ID = 'publishedNormalAnalysis-publishedTumourAnalysis';
  const ALIGNMENT_COLUMN_ID = 'alignmentsCompleted-alignmentsRunning-alignmentsFailed';
  const SANGER_VC_COLUMN_ID = 'sangerVcsCompleted-sangerVcsRunning-sangerVcsFailed';
  const MUTECT2_VC_COLUMN_ID = 'mutectCompleted-mutectRunning-mutectFailed';
  const OPEN_ACCESS_VF_COLUMN_ID = 'openAccessCompleted-openAccessRunning-openAccessFailed';
  const RNA_RAW_READS_COLUMN_ID = 'rnaPublishedNormalAnalysis-rnaPublishedTumourAnalysis';
  const RNA_REGISTERED_SAMPLE_COLUMN_ID = 'rnaRegisteredNormalSamples-rnaRegisteredTumourSamples';
  const RNA_ALIGNMENT_COLUMN_ID = 'rnaAlignmentsCompleted-rnaAlignmentsRunning-rnaAlignmentFailed';

  const containerRef = createRef<HTMLDivElement>();
  const checkmarkIcon = <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />;

  const [filterState, setFilterState] = useState([]);

  const handleFilterStateChange = (filters) => {
    setFilterState(filters);
    setPagingState({ ...pagingState, page: 0 });
  };
  const updateFilter = (field: ProgramDonorSummaryEntryField, value: string | string[]) => {
    const newFilters = filterState.filter((x) => x.field !== field);
    if (value.length) {
      newFilters.push({
        field: field,
        values: typeof value === 'string' ? [value] : value,
      });
    }
    handleFilterStateChange(newFilters);
  };
  const clearFilter = (field: ProgramDonorSummaryEntryField) => {
    const newFilters = filterState.filter((x) => x.field !== field);
    handleFilterStateChange(newFilters);
  };
  const getFilterValue = (field: ProgramDonorSummaryEntryField) =>
    filterState.find((x) => x.field === field)?.values;

  const StatusColumnCell = ({ original }: { original: DonorSummaryRecord }) => (
    <CellContentCenter>
      {original.validWithCurrentDictionary || FEATURE_SUBMITTED_DATA_ENABLED ? (
        <StarIcon
          fill={RELEASED_STATE_FILL_COLOURS[original.releaseStatus]}
          outline={RELEASED_STATE_STROKE_COLOURS[original.releaseStatus]}
        />
      ) : (
        <Icon name="warning" fill={useTheme().colors.error} width="16px" height="15px" />
      )}
    </CellContentCenter>
  );

  const PercentageCell = ({
    original,
    fieldName,
  }: {
    original: DonorSummaryRecord;
    fieldName: 'submittedCoreDataPercent' | 'submittedExtendedDataPercent';
  }) => {
    // original[fieldName] value is expected to be a fraction in decimal form
    const percentageVal = Math.round(original[fieldName] * 100);
    const cellContent =
      percentageVal === 100 ? checkmarkIcon : percentageVal === 0 ? '' : `${percentageVal}%`;
    return (
      <div
        css={css`
          padding-left: 4px;
        `}
      >
        {cellContent}
      </div>
    );
  };

  const ProcessingCell = ({ original }: { original: DonorSummaryRecord }) => {
    const getIcon = (status: MolecularProcessingStatus) =>
      ({
        [MolecularProcessingStatus.COMPLETE]: checkmarkIcon,
        [MolecularProcessingStatus.PROCESSING]: (
          <Icon width="12px" height="12px" fill="warning_dark" name="ellipses" />
        ),
        [MolecularProcessingStatus.REGISTERED]: (
          <Icon width="12px" height="12px" fill="primary_2" name="dash" />
        ),
      }[status]);

    return (
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 70%;
        `}
      >
        <div
          css={css`
            padding: 4px 8px 0px 0px;
          `}
        >
          {getIcon(original.processingStatus)}
        </div>
        <div>{startCase(original.processingStatus.toLowerCase())}</div>
      </div>
    );
  };

  const FilterableHeader = ({
    header,
    open,
    setOpen,
    focusFirst,
    buttonRef,
    panelRef,
    handleBlur,
    active,
    children,
    panelLegend,
  }: PropsWithChildren<{
    header: string;
    open: boolean;
    setOpen?: (open?: boolean | any) => void;
    focusFirst?: () => void;
    buttonRef?: Ref<HTMLInputElement>;
    panelRef?: Ref<HTMLElement>;
    handleBlur?: (event?: any) => void;
    active?: boolean;
    panelLegend?: string;
  }>) => {
    return (
      <Row
        css={css`
          margin: unset !important;
          justify-content: space-between !important;
          align-items: center !important;
        `}
      >
        <div
          css={css`
            white-space: normal;
            max-width: calc(100% - 14px);
            overflow: hidden;
            z-index: 10;
          `}
        >
          {header}
        </div>
        <DropdownPanel
          inputLabel={`Filter by ${header}`}
          triggerIcon="filter"
          triggerTooltip={`Filter by ${header}`}
          open={open}
          setOpen={setOpen}
          focusFirst={focusFirst}
          buttonRef={buttonRef}
          panelRef={panelRef}
          handleBlur={handleBlur}
          active={active}
          // occasionally, some dropdown panels need to be wider, or longer.
          // this customization was added instead of making the panel elastic
          // to prevent panels from running off the side of the page
          // or the bottom of the table.
          // panelLegend indicates which dropdown panel is affected
          css={css`
            ${['DNA Raw Reads Status'].includes(panelLegend) &&
            `
              width: 275px;
            `}
          `}
        >
          {children}
        </DropdownPanel>
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            width: 100%;
            height: 100%;
            ${open ? `background: ${theme.colors.grey_3};` : ''}
          `}
        />
      </Row>
    );
  };

  const TextFilterHeader = ({
    header,
    panelLegend,
    filterValue = '',
    onFilter = () => {},
  }: {
    header: string;
    panelLegend?: string;
    filterValue?: string;
    onFilter?: (text?: string) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    // Focus on the input when the panel opens
    const focusInput = () => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Close dropdown panel when tabbing out of it
    const handleBlur = (e: FocusEvent) => {
      const nextTarget = e.relatedTarget as Node;

      if (open && !panelRef?.current?.contains(nextTarget)) {
        setOpen(false);
      }
    };

    return (
      <FilterableHeader
        header={header}
        open={open}
        setOpen={setOpen}
        focusFirst={focusInput}
        buttonRef={buttonRef}
        panelRef={panelRef}
        handleBlur={handleBlur}
        active={filterValue?.length > 0}
        panelLegend={panelLegend}
      >
        <TextInputFilter
          onConfirmClick={onFilter}
          inputLabel={`Filter by ${header}`}
          inputPlaceholder={`Search for ${header}...`}
          panelLegend={panelLegend || header}
          inputRef={inputRef}
          setOpen={setOpen}
          handleBlur={handleBlur}
          initialValue={filterValue}
        />
      </FilterableHeader>
    );
  };

  const ListFilterHeader = ({
    header,
    panelLegend,
    filterOptions = [],
    filterCounts,
    activeFilters = [],
    onFilter = () => {},
  }: {
    header: string;
    panelLegend?: string;
    filterOptions?: Array<FilterOption>;
    filterCounts?: Record<string, number>;
    activeFilters?: Array<string>;
    onFilter?: (filters?: Array<FilterOption>) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const options = useMemo(
      () =>
        filterOptions.map((option) => ({
          ...option,
          isChecked: activeFilters?.indexOf(option.key) > -1 ? true : false,
          doc_count: filterCounts?.[option.key],
        })),
      [filterOptions, activeFilters],
    );
    const buttonRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    // Close dropdown panel when tabbing out of it
    const handleBlur = (e: FocusEvent) => {
      const nextTarget = e.relatedTarget as Node;

      if (open && !panelRef?.current?.contains(nextTarget)) {
        setOpen(false);
      }
    };

    return (
      <FilterableHeader
        header={header}
        open={open}
        setOpen={setOpen}
        buttonRef={buttonRef}
        panelRef={panelRef}
        handleBlur={handleBlur}
        panelLegend={panelLegend}
        active={activeFilters.length > 0}
      >
        <ListFilter
          filterOptions={options}
          onConfirmClick={onFilter}
          panelLegend={panelLegend || header}
          open={open}
          setOpen={setOpen}
          handleBlur={handleBlur}
        />
      </FilterableHeader>
    );
  };

  const [pagingState, setPagingState] = useState<PagingState>({
    pages: initialPages,
    pageSize: initialPageSize,
    page: 0,
    sorts: initialSorts,
  });

  const [loaderTimeout, setLoaderTimeout] = useState<NodeJS.Timeout>();

  const offset = pagingState.pageSize * pagingState.page;
  const first = pagingState.pageSize;
  const sorts = pagingState.sorts;

  const {
    data: {
      programDonorSummary: { entries: programDonorSummaryEntries, stats: programDonorSummaryStats },
    } = {
      programDonorSummary: {
        entries: [],
        stats: EMPTY_PROGRAM_SUMMARY_STATS,
      },
    },
    error: programDonorsSummaryQueryError,
    loading,
  } = useProgramDonorsSummaryQuery({
    programShortName,
    first,
    offset,
    sorts,
    filters: filterState,
    options: {
      onCompleted: (result) => {
        const totalDonors = result.programDonorSummary?.stats?.registeredDonorsCount || 0;
        const nextPages = Math.ceil(totalDonors / pagingState.pageSize);
        setPagingState({
          ...pagingState,
          // stay on current page, unless that page is no longer available
          page: pagingState.page < nextPages ? pagingState.page : 0,
          pages: nextPages,
        });
        setLoaderTimeout(
          setTimeout(() => {
            setIsTableLoading(false);
          }, 500),
        );
      },
    },
  });

  const donorsWithErrors = programDonorSummaryEntries
    .filter((entry) => !entry.validWithCurrentDictionary)
    .map((entry) => {
      const { donorId } = entry;
      const ID = parseDonorIdString(donorId);
      return ID;
    });

  // Search Result Query
  const { data: clinicalErrorData, loading: errorDataLoading } =
    useQuery<ClinicalEntityQueryResponse>(CLINICAL_ERRORS_QUERY, {
      errorPolicy: 'all',
      variables: {
        programShortName,
        filters: {
          ...defaultClinicalEntityFilters,
          donorIds: donorsWithErrors,
        },
      },
    });

  const errorLinkData = clinicalErrorData
    ? donorsWithErrors.map((donorId) => {
        // There is currently  an edge case where there are multiple entries in the clinicalErrors list with the same donorId,
        //  and in a subset of these cases one of those can have an empty `errors` list. Filtering to only find clinicalError
        //  objects with entries in the errors list will prevent a crash when this data is returned. A proper fix is ticketed
        //  for work in the clinical service api https://github.com/icgc-argo/argo-clinical/issues/1084
        const currentDonor = clinicalErrorData.clinicalData.clinicalErrors.find(
          (donor) => donorId === donor.donorId && donor.errors && donor.errors.length,
        );
        const entity = currentDonor?.errors[0]?.entityName;
        return { donorId, entity };
      })
    : [];

  const tableColumns: Array<TableColumnConfig<DonorSummaryRecord>> = [
    {
      Header: 'CLINICAL DATA STATUS',
      headerStyle: {
        background: theme.colors.secondary_4,
      },
      columns: [
        {
          Header: (
            <CellContentCenter>
              <StarIcon fill={'grey_1'} />
            </CellContentCenter>
          ),
          Cell: StatusColumnCell,
          accessor: 'releaseStatus',
          resizable: false,
          width: 50,
          sortMethod: (a: DonorDataReleaseState, b: DonorDataReleaseState) => {
            const priorities = {
              [DonorDataReleaseState.NO]: 1,
              [DonorDataReleaseState.PARTIALLY]: 2,
              [DonorDataReleaseState.FULLY]: 3,
            } as { [k in DonorDataReleaseState]: number };
            return priorities[a] - priorities[b];
          },
        },
        {
          Header: (
            <TextFilterHeader
              header={'Donor ID'}
              onFilter={(text) =>
                text?.length
                  ? updateFilter('combinedDonorId', text)
                  : clearFilter('combinedDonorId')
              }
              filterValue={getFilterValue('combinedDonorId')}
            />
          ),
          accessor: 'donorId',
          Cell: ({ original }: { original: DonorSummaryRecord }) => {
            const errorTab =
              errorLinkData.find((error) => error.donorId === parseDonorIdString(original.donorId))
                ?.entity || '';

            const linkUrl = urlJoin(
              `/submission/program/`,
              programShortName,
              `/clinical-data/?donorId=${original.donorId}&tab=${errorTab || 'donor'}`,
            );
            return FEATURE_SUBMITTED_DATA_ENABLED ? (
              <NextLink href={linkUrl}>
                <Link>{`${original.donorId} (${original.submitterDonorId})`}</Link>
              </NextLink>
            ) : (
              `${original.donorId} (${original.submitterDonorId})`
            );
          },
          width: 135,
        },
        {
          Header: (
            <ListFilterHeader
              header={'Core Completion'}
              panelLegend={'Core Completion Status'}
              onFilter={(options) =>
                updateFilter(
                  'coreDataPercentAggregation',
                  options.filter((option) => option.isChecked).map((option) => option.key),
                )
              }
              filterOptions={FILTER_OPTIONS.completeIncomplete}
              filterCounts={{
                [FILTER_OPTIONS.completeIncomplete[0].key]:
                  programDonorSummaryStats?.coreCompletion?.completed,
                [FILTER_OPTIONS.completeIncomplete[1].key]:
                  programDonorSummaryStats?.coreCompletion?.incomplete,
                [FILTER_OPTIONS.completeIncomplete[2].key]:
                  programDonorSummaryStats?.coreCompletion?.noData,
              }}
              activeFilters={getFilterValue('coreDataPercentAggregation')}
            />
          ),
          accessor: 'submittedCoreDataPercent',
          Cell: ({ original }) => (
            <PercentageCell original={original} fieldName="submittedCoreDataPercent" />
          ),
          width: 95,
        },
      ],
    },
    {
      Header: `${activePipeline}-SEQ PIPELINE`,
      headerStyle: {
        background: theme.colors[PIPELINE_COLORS[activePipeline]],
      },
      columns: [
        ...(activePipeline === PipelineNames.DNA
          ? [
              {
                Header: (
                  <ListFilterHeader
                    header={'Registered Samples'}
                    panelLegend={`${
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'DNA' : 'Sample'
                    } Registration Status`}
                    onFilter={(options) =>
                      updateFilter(
                        FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                          ? 'dnaTNRegistered'
                          : 'registeredSamplePairs',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                        ? FILTER_OPTIONS.tnRegisteredTnNotRegistered
                        : FILTER_OPTIONS.validInvalid
                    }
                    filterCounts={
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                        ? {
                            [FILTER_OPTIONS.tnRegisteredTnNotRegistered[0].key]:
                              programDonorSummaryStats?.dnaTNRegisteredStatus?.tumorAndNormal,
                            [FILTER_OPTIONS.tnRegisteredTnNotRegistered[1].key]:
                              programDonorSummaryStats?.dnaTNRegisteredStatus?.tumorOrNormal,
                            [FILTER_OPTIONS.tnRegisteredTnNotRegistered[2].key]:
                              programDonorSummaryStats?.dnaTNRegisteredStatus?.noData,
                          }
                        : {
                            [FILTER_OPTIONS.validInvalid[0].key]:
                              programDonorSummaryStats?.sampleStatus?.valid,
                            [FILTER_OPTIONS.validInvalid[1].key]:
                              programDonorSummaryStats?.sampleStatus?.invalid,
                          }
                    }
                    activeFilters={getFilterValue(
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                        ? 'dnaTNRegistered'
                        : 'registeredSamplePairs',
                    )}
                  />
                ),
                id: REGISTERED_SAMPLE_COLUMN_ID,
                Cell: ({ original }) =>
                  FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? (
                    <DesignationCell
                      normalCount={original.registeredNormalSamples}
                      original={original}
                      tumourCount={original.registeredTumourSamples}
                      type={'dnaTNRegistered'}
                    />
                  ) : (
                    <DesignationCellLegacy
                      left={original.registeredNormalSamples}
                      right={original.registeredTumourSamples}
                    />
                  ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Raw Reads'}
                    panelLegend={`${
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'DNA ' : ''
                    }Raw Reads Status`}
                    onFilter={(options) =>
                      updateFilter(
                        FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'dnaTNMatchedPair' : 'rawReads',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                        ? FILTER_OPTIONS.tnMatchedPairSubmittedTnMatchedPairNotSubmitted
                        : FILTER_OPTIONS.validInvalid
                    }
                    filterCounts={
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                        ? {
                            [FILTER_OPTIONS.tnMatchedPairSubmittedTnMatchedPairNotSubmitted[0].key]:
                              programDonorSummaryStats?.dnaTNMatchedPairStatus
                                ?.tumorNormalMatchedPair,
                            [FILTER_OPTIONS.tnMatchedPairSubmittedTnMatchedPairNotSubmitted[1].key]:
                              programDonorSummaryStats?.dnaTNMatchedPairStatus
                                ?.tumorNormalNoMatchedPair,
                            [FILTER_OPTIONS.tnMatchedPairSubmittedTnMatchedPairNotSubmitted[2].key]:
                              programDonorSummaryStats?.dnaTNMatchedPairStatus
                                ?.tumorNormalMatchedPairMissingRawReads,
                            [FILTER_OPTIONS.tnMatchedPairSubmittedTnMatchedPairNotSubmitted[3].key]:
                              programDonorSummaryStats?.dnaTNMatchedPairStatus?.noData,
                          }
                        : {
                            [FILTER_OPTIONS.validInvalid[0].key]:
                              programDonorSummaryStats?.rawReadsStatus?.valid,
                            [FILTER_OPTIONS.validInvalid[1].key]:
                              programDonorSummaryStats?.rawReadsStatus?.invalid,
                          }
                    }
                    activeFilters={getFilterValue(
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'dnaTNMatchedPair' : 'rawReads',
                    )}
                  />
                ),
                id: RAW_READS_COLUMN_ID,
                Cell: ({ original }) =>
                  FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? (
                    <DesignationCell
                      normalCount={original.publishedNormalAnalysis}
                      original={original}
                      tumourCount={original.publishedTumourAnalysis}
                      type={'dnaTNMatchedPair'}
                    />
                  ) : (
                    <DesignationCellLegacy
                      left={original.publishedNormalAnalysis}
                      right={original.publishedTumourAnalysis}
                    />
                  ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Alignment'}
                    panelLegend={'Alignment Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'alignmentStatus',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.completedInProgressFailed}
                    filterCounts={{
                      [FILTER_OPTIONS.completedInProgressFailed[0].key]:
                        programDonorSummaryStats?.alignmentStatusCount?.completed,
                      [FILTER_OPTIONS.completedInProgressFailed[1].key]:
                        programDonorSummaryStats?.alignmentStatusCount?.inProgress,
                      [FILTER_OPTIONS.completedInProgressFailed[2].key]:
                        programDonorSummaryStats?.alignmentStatusCount?.failed,
                      [FILTER_OPTIONS.completedInProgressFailed[3].key]:
                        programDonorSummaryStats?.alignmentStatusCount?.noData,
                    }}
                    activeFilters={getFilterValue('alignmentStatus')}
                  />
                ),
                id: ALIGNMENT_COLUMN_ID,
                Cell: ({ original }) => (
                  <Pipeline
                    complete={original.alignmentsCompleted}
                    inProgress={original.alignmentsRunning}
                    error={original.alignmentsFailed}
                  />
                ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Sanger VC'}
                    panelLegend={'Sanger VC Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'sangerVCStatus',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.completedInProgressFailed}
                    filterCounts={{
                      [FILTER_OPTIONS.completedInProgressFailed[0].key]:
                        programDonorSummaryStats?.sangerStatusCount?.completed,
                      [FILTER_OPTIONS.completedInProgressFailed[1].key]:
                        programDonorSummaryStats?.sangerStatusCount?.inProgress,
                      [FILTER_OPTIONS.completedInProgressFailed[2].key]:
                        programDonorSummaryStats?.sangerStatusCount?.failed,
                      [FILTER_OPTIONS.completedInProgressFailed[3].key]:
                        programDonorSummaryStats?.sangerStatusCount?.noData,
                    }}
                    activeFilters={getFilterValue('sangerVCStatus')}
                  />
                ),
                id: SANGER_VC_COLUMN_ID,
                Cell: ({ original }) => (
                  <Pipeline
                    complete={original.sangerVcsCompleted}
                    inProgress={original.sangerVcsRunning}
                    error={original.sangerVcsFailed}
                  />
                ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Mutect2 VC'}
                    panelLegend={'Mutect2 VC Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'mutectStatus',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.completedInProgressFailed}
                    filterCounts={{
                      [FILTER_OPTIONS.completedInProgressFailed[0].key]:
                        programDonorSummaryStats?.mutectStatusCount?.completed,
                      [FILTER_OPTIONS.completedInProgressFailed[1].key]:
                        programDonorSummaryStats?.mutectStatusCount?.inProgress,
                      [FILTER_OPTIONS.completedInProgressFailed[2].key]:
                        programDonorSummaryStats?.mutectStatusCount?.failed,
                      [FILTER_OPTIONS.completedInProgressFailed[3].key]:
                        programDonorSummaryStats?.mutectStatusCount?.noData,
                    }}
                    activeFilters={getFilterValue('mutectStatus')}
                  />
                ),
                id: MUTECT2_VC_COLUMN_ID,
                Cell: ({ original }) => (
                  <Pipeline
                    complete={original.mutectCompleted}
                    inProgress={original.mutectRunning}
                    error={original.mutectFailed}
                  />
                ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Open Access VF'}
                    panelLegend={'Open Access VF Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'openAccessStatus',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.completedInProgressFailed}
                    filterCounts={{
                      [FILTER_OPTIONS.completedInProgressFailed[0].key]:
                        programDonorSummaryStats?.openAccessStatusCount?.completed,
                      [FILTER_OPTIONS.completedInProgressFailed[1].key]:
                        programDonorSummaryStats?.openAccessStatusCount?.inProgress,
                      [FILTER_OPTIONS.completedInProgressFailed[2].key]:
                        programDonorSummaryStats?.openAccessStatusCount?.failed,
                      [FILTER_OPTIONS.completedInProgressFailed[3].key]:
                        programDonorSummaryStats?.openAccessStatusCount?.noData,
                    }}
                    activeFilters={getFilterValue('openAccessStatus')}
                  />
                ),
                id: OPEN_ACCESS_VF_COLUMN_ID,
                Cell: ({ original }) => (
                  <Pipeline
                    complete={original.openAccessCompleted}
                    inProgress={original.openAccessRunning}
                    error={original.openAccessFailed}
                  />
                ),
              },
            ]
          : [
              {
                Header: (
                  <ListFilterHeader
                    header={'Registered Samples'}
                    panelLegend={'RNA Registration Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'rnaRegisteredSample',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.samplesRegisteredNoSamplesRegistered}
                    filterCounts={{
                      [FILTER_OPTIONS.samplesRegisteredNoSamplesRegistered[0].key]:
                        programDonorSummaryStats?.rnaSampleStatus?.dataSubmitted,
                      [FILTER_OPTIONS.samplesRegisteredNoSamplesRegistered[1].key]:
                        programDonorSummaryStats?.rnaSampleStatus?.noDataSubmitted,
                    }}
                    activeFilters={getFilterValue('rnaRegisteredSample')}
                  />
                ),
                id: RNA_REGISTERED_SAMPLE_COLUMN_ID,
                Cell: ({ original }) => (
                  <DesignationCell
                    normalCount={original.rnaRegisteredNormalSamples}
                    tumourCount={original.rnaRegisteredTumourSamples}
                  />
                ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Raw Reads'}
                    panelLegend={'RNA Raw Reads Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'rnaRawReads',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.dataSubmittedNoData}
                    filterCounts={{
                      [FILTER_OPTIONS.dataSubmittedNoData[0].key]:
                        programDonorSummaryStats?.rnaRawReadStatus?.dataSubmitted,
                      [FILTER_OPTIONS.dataSubmittedNoData[1].key]:
                        programDonorSummaryStats?.rnaRawReadStatus?.noDataSubmitted,
                    }}
                    activeFilters={getFilterValue('rnaRawReads')}
                  />
                ),
                id: RNA_RAW_READS_COLUMN_ID,
                Cell: ({ original }) => (
                  <DesignationCell
                    normalCount={original.rnaPublishedNormalAnalysis}
                    tumourCount={original.rnaPublishedTumourAnalysis}
                  />
                ),
              },
              {
                Header: (
                  <ListFilterHeader
                    header={'Alignment'}
                    panelLegend={'Alignment Status'}
                    onFilter={(options) =>
                      updateFilter(
                        'rnaAlignmentStatus',
                        options.filter((option) => option.isChecked).map((option) => option.key),
                      )
                    }
                    filterOptions={FILTER_OPTIONS.completedInProgressFailed}
                    filterCounts={{
                      [FILTER_OPTIONS.completedInProgressFailed[0].key]:
                        programDonorSummaryStats?.rnaAlignmentStatusCount?.completed,
                      [FILTER_OPTIONS.completedInProgressFailed[1].key]:
                        programDonorSummaryStats?.rnaAlignmentStatusCount?.inProgress,
                      [FILTER_OPTIONS.completedInProgressFailed[2].key]:
                        programDonorSummaryStats?.rnaAlignmentStatusCount?.failed,
                      [FILTER_OPTIONS.completedInProgressFailed[3].key]:
                        programDonorSummaryStats?.rnaAlignmentStatusCount?.noData,
                    }}
                    activeFilters={getFilterValue('rnaAlignmentStatus')}
                  />
                ),
                id: RNA_ALIGNMENT_COLUMN_ID,
                Cell: ({ original }) => (
                  <Pipeline
                    complete={original.rnaAlignmentsCompleted}
                    inProgress={original.rnaAlignmentsRunning}
                    error={original.rnaAlignmentFailed}
                  />
                ),
              },
            ]),
      ],
    },
    {
      Header: filterState.length ? (
        <FilterClearButton
          size="sm"
          variant="text"
          type="button"
          onClick={() => handleFilterStateChange([])}
        >
          Clear Filters
        </FilterClearButton>
      ) : (
        <></>
      ),
      columns: [
        FEATURE_SUBMITTED_DATA_ENABLED && {
          Header: (
            <ListFilterHeader
              header={'Alerts'}
              panelLegend={'Filter Alerts'}
              onFilter={(options) =>
                updateFilter(
                  'validWithCurrentDictionary',
                  options.filter((option) => option.isChecked).map((option) => option.key),
                )
              }
              filterOptions={FILTER_OPTIONS.validWithCurrentDictionary}
              filterCounts={{
                [FILTER_OPTIONS.validWithCurrentDictionary[0].key]:
                  programDonorSummaryStats?.donorsInvalidWithCurrentDictionaryCount || 0,
                [FILTER_OPTIONS.validWithCurrentDictionary[1].key]:
                  programDonorSummaryStats?.registeredDonorsCount -
                    programDonorSummaryStats?.donorsInvalidWithCurrentDictionaryCount || 0,
              }}
              activeFilters={getFilterValue('validWithCurrentDictionary')}
            />
          ),
          accessor: 'validWithCurrentDictionary',
          Cell: ({ original }: { original: DonorSummaryRecord }) => {
            const errorTab =
              errorLinkData.find((error) => error.donorId === parseDonorIdString(original.donorId))
                ?.entity || '';

            const linkUrl = urlJoin(
              `/submission/program/`,
              programShortName,
              `/clinical-data/?donorId=${original.donorId}`,
              errorTab && `&tab=${errorTab}`,
            );

            return original.validWithCurrentDictionary ? (
              ''
            ) : (
              <NextLink href={linkUrl}>
                <Link>
                  <Icon name="warning" fill={theme.colors.error} width="16px" height="15px" />{' '}
                  Update Clinical
                </Link>
              </NextLink>
            );
          },
          width: 125,
        },
        {
          Header: 'Last Updated',
          accessor: 'updatedAt',
          Cell: ({ original }: { original: DonorSummaryRecord }) => {
            return <div>{displayDate(original.updatedAt)}</div>;
          },
          width: 95,
        },
      ].filter(Boolean),
    },
  ];

  const [isTableLoading, setIsTableLoading] = useState(isCardLoading);
  useEffect(() => {
    if (loading) {
      setIsTableLoading(true);
    }
  }, [loading]);

  const onPageChange = async (newPageNum: number) => {
    setPagingState({ ...pagingState, page: newPageNum }); // newPageNum is zero indexed
  };

  const onPageSizeChange = async (newPageSize: number, newPage: number) => {
    setPagingState({
      ...pagingState,
      page: 0,
      pageSize: newPageSize,
      pages: Math.ceil(programDonorSummaryStats.registeredDonorsCount / newPageSize),
    });
  };

  const onSortedChange: SortedChangeFunction = async (newSorted: SortingRule[]) => {
    const sorts = newSorted.reduce(
      (accSorts: Array<DonorSummaryEntrySort>, sortRule: SortingRule) => {
        const fields = sortRule.id.split(ID_SEPARATOR);
        const order = sortRule.desc ? 'desc' : 'asc';
        return accSorts.concat(
          fields.map((field) => ({
            field: field as DonorSummaryEntrySortField,
            order: order as DonorSummaryEntrySortOrder,
          })),
        );
      },
      [],
    );
    setPagingState({ ...pagingState, sorts });
  };

  return (
    <div
      ref={containerRef}
      // this z-index needs to be greater then GlobalFooter's z-index otherwise the drop down is hidden behind it
      css={css`
        z-index: 2;
        padding-top: 10px;
        .rt-td {
          position: relative; // helps DesignationCell styling
        }
      `}
    >
      {programDonorsSummaryQueryError ? (
        <ContentError />
      ) : (
        <>
          <DonorSummaryTableLegend
            css={css`
              opacity: ${isTableLoading ? 0.5 : 1};
            `}
            programDonorSummaryStats={programDonorSummaryStats}
          />
          {FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED && (
            <PipelineTabs
              activePipeline={activePipeline}
              handlePipelineTabs={(e, value) => {
                setActivePipeline(value);
              }}
            />
          )}

          <Table
            loading={isTableLoading}
            parentRef={containerRef}
            columns={tableColumns}
            data={programDonorSummaryEntries}
            showPagination={true}
            manual={true}
            pages={pagingState.pages}
            pageSize={pagingState.pageSize}
            page={pagingState.page}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            onSortedChange={onSortedChange}
            defaultSorted={getDefaultSort(initialSorts)}
            // filter panel style workarounds
            className={`has-filters${!programDonorSummaryEntries.length ? ' no-data' : ''}`}
          />
        </>
      )}
    </div>
  );
};

export default DonorSummaryTable;
