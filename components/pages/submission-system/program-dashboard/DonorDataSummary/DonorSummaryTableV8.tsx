/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { PropsWithChildren, Ref, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import NextLink from 'next/link';
import urlJoin from 'url-join';
import {
  css,
  FilterClearButton,
  Icon,
  Link,
  ListFilterHeader,
  NextTablePaginationRule,
  PercentageCell,
  TableColumnConfig,
  TableHeaderWrapper,
  TablePaginationRule,
  TableV8,
  TextFilterHeader,
  ThemeColorNames,
  useTheme,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import CLINICAL_ERRORS_QUERY from 'components/pages/submission-system/program-submitted-data/ClinicalErrors/CLINICAL_ERRORS_QUERY';
import { displayDate } from 'global/utils/common';
import {
  ClinicalEntityQueryResponse,
  defaultClinicalEntityFilters,
  parseDonorIdString,
} from 'components/pages/submission-system/program-submitted-data/common';
import { CellContentCenter, DataTableStarIcon as StarIcon, Pipeline } from '../../common';
import {
  DonorDataReleaseState,
  ProgramDonorSummaryEntryField,
  SortingState,
  FilterState,
  CellProps,
} from './types';
import {
  EMPTY_PROGRAM_SUMMARY_STATS,
  FILTER_OPTIONS,
  formatSortingRequest,
  RELEASED_STATE_FILL_COLOURS,
  RELEASED_STATE_STROKE_COLOURS,
} from './common';
import { useProgramDonorsSummaryQuery } from '.';
import { PipelineNames, PIPELINE_COLORS, usePipelines } from './PipelineTabs';
import { DesignationCell, DesignationCellLegacy } from './DesignationCellV8';

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

const DonorSummaryTableV8 = ({
  initialPaging,
  initialSorting,
  isCardLoading = true,
  programShortName,
}: {
  initialPaging: TablePaginationRule;
  initialSorting: SortingState[];
  isCardLoading?: boolean;
  programShortName: string;
}) => {
  // config
  const theme = useTheme();
  const { FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED, FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();

  // state
  const { activePipeline, setActivePipeline } = usePipelines();
  const [pagingState, setPagingState] = useState<TablePaginationRule>(initialPaging);
  const handlePagingState = (nextPagingState: NextTablePaginationRule) => {
    setPagingState({ ...pagingState, ...nextPagingState });
  };
  const [sortingState, setSortingState] = useState<SortingState[]>(initialSorting);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(isCardLoading);

  // filter state handling
  const [filterState, setFilterState] = useState<FilterState[]>([]);
  const handleFilterStateChange = (filters: FilterState[]) => {
    setFilterState(filters);
    handlePagingState({ page: 0 });
  };
  const updateFilter = ({ field, values }: FilterState) => {
    const newFilters = filterState.filter((filter) => filter.field !== field);
    if (values.length) {
      newFilters.push({
        field,
        values: [].concat(values),
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

  // query
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
    first: pagingState.pageSize,
    offset: pagingState.pageSize * pagingState.page,
    sorts: formatSortingRequest(sortingState),
    filters: filterState,
    options: {
      onCompleted: (result) => {
        const totalDonors = result.programDonorSummary?.stats?.registeredDonorsCount || 0;
        const nextPages = Math.ceil(totalDonors / pagingState.pageSize);
        handlePagingState({
          // stay on current page, unless that page is no longer available
          page: pagingState.page < nextPages ? pagingState.page : 0,
          pages: nextPages,
        });
        setTimeout(() => {
          setIsTableLoading(false);
        }, 500);
      },
    },
  });

  // loading
  useEffect(() => {
    if (loading) {
      setIsTableLoading(true);
    }
  }, [loading]);

  // custom components
  const StatusColumnCell = ({ row: { original } }) => {
    return (
      <CellContentCenter>
        {original.validWithCurrentDictionary || FEATURE_SUBMITTED_DATA_ENABLED ? (
          <StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[original.releaseStatus]}
            outline={RELEASED_STATE_STROKE_COLOURS[original.releaseStatus]}
          />
        ) : (
          <Icon name="warning" fill={theme.colors.error} width="16px" height="15px" />
        )}
      </CellContentCenter>
    );
  };

  const HeaderWithBackground = ({
    children,
    fill,
  }: PropsWithChildren<{ fill: keyof ThemeColorNames }>) => (
    <TableHeaderWrapper
      css={css`
        background: ${theme.colors[fill]};
        justify-content: center;
        text-transform: uppercase;
      `}
    >
      {children}
    </TableHeaderWrapper>
  );

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
        const currentDonor = clinicalErrorData.clinicalData.clinicalErrors.find(
          (donor) => donorId === donor.donorId,
        );
        const entity = currentDonor?.errors[0].entityName;
        return { donorId, entity };
      })
    : [];

  // table info
  const tableColumns: any = [
    {
      header: <HeaderWithBackground fill="secondary_4">Clinical Data Status</HeaderWithBackground>,
      id: 'clinicalDataStatus',
      meta: {
        customHeader: true,
      },
      columns: [
        {
          header: () => (
            <CellContentCenter>
              <StarIcon fill={'grey_1'} />
            </CellContentCenter>
          ),
          cell: StatusColumnCell,
          accessorKey: 'releaseStatus',
          size: 50,
          enableResizing: false,
          sortingFn: (a: DonorDataReleaseState, b: DonorDataReleaseState) => {
            const priorities = {
              [DonorDataReleaseState.NO]: 1,
              [DonorDataReleaseState.PARTIALLY]: 2,
              [DonorDataReleaseState.FULLY]: 3,
            } as { [k in DonorDataReleaseState]: number };
            return priorities[a] - priorities[b];
          },
        },
        {
          header: (
            <TextFilterHeader
              header={'Donor ID'}
              onFilter={(text) =>
                text?.length
                  ? updateFilter({ field: 'combinedDonorId', values: [].concat(text) })
                  : clearFilter('combinedDonorId')
              }
              filterValue={getFilterValue('combinedDonorId')}
            />
          ),
          accessorKey: 'donorId',
          cell: ({ row: { original } }: CellProps) => {
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
          size: 135,
        },
        {
          header: (
            <ListFilterHeader
              header={'Core Completion'}
              panelLegend={'Core Completion Status'}
              onFilter={(options) =>
                updateFilter({
                  field: 'coreDataPercentAggregation',
                  values: options.filter((option) => option.isChecked).map((option) => option.key),
                })
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
          accessorKey: 'submittedCoreDataPercent',
          cell: ({ row: { original } }: CellProps) => (
            <PercentageCell original={original} fieldName="submittedCoreDataPercent" />
          ),
          size: 95,
        },
      ],
    },
    {
      header: (
        <HeaderWithBackground fill={PIPELINE_COLORS[activePipeline] as keyof ThemeColorNames}>
          {`${activePipeline}-SEQ PIPELINE`}
        </HeaderWithBackground>
      ),
      id: 'dnaRnaSeqPipeline',
      meta: { customHeader: true },
      columns: [
        ...(activePipeline === PipelineNames.DNA
          ? [
              {
                header: (
                  <ListFilterHeader
                    header={'Registered Samples'}
                    panelLegend={`${
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'DNA' : 'Sample'
                    } Registration Status`}
                    onFilter={(options) =>
                      updateFilter({
                        field: FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                          ? 'dnaTNRegistered'
                          : 'registeredSamplePairs',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                meta: { customCell: true },
                id: REGISTERED_SAMPLE_COLUMN_ID,
                cell: ({ row: { original } }: CellProps) =>
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
                header: (
                  <ListFilterHeader
                    header={'Raw Reads'}
                    panelLegend={`${
                      FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED ? 'DNA ' : ''
                    }Raw Reads Status`}
                    onFilter={(options) =>
                      updateFilter({
                        field: FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED
                          ? 'dnaTNMatchedPair'
                          : 'rawReads',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                meta: { customCell: true },
                id: RAW_READS_COLUMN_ID,
                cell: ({ row: { original } }: CellProps) =>
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
                header: (
                  <ListFilterHeader
                    header={'Alignment'}
                    panelLegend={'Alignment Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'alignmentStatus',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
                  <Pipeline
                    complete={original.alignmentsCompleted}
                    inProgress={original.alignmentsRunning}
                    error={original.alignmentsFailed}
                  />
                ),
              },
              {
                header: (
                  <ListFilterHeader
                    header={'Sanger VC'}
                    panelLegend={'Sanger VC Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'sangerVCStatus',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
                  <Pipeline
                    complete={original.sangerVcsCompleted}
                    inProgress={original.sangerVcsRunning}
                    error={original.sangerVcsFailed}
                  />
                ),
              },
              {
                header: (
                  <ListFilterHeader
                    header={'Mutect2 VC'}
                    panelLegend={'Mutect2 VC Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'mutectStatus',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
                  <Pipeline
                    complete={original.mutectCompleted}
                    inProgress={original.mutectRunning}
                    error={original.mutectFailed}
                  />
                ),
              },
              {
                header: (
                  <ListFilterHeader
                    header={'Open Access VF'}
                    panelLegend={'Open Access VF Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'openAccessStatus',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
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
                header: (
                  <ListFilterHeader
                    header={'Registered Samples'}
                    panelLegend={'RNA Registration Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'rnaRegisteredSample',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
                  <DesignationCell
                    normalCount={original.rnaRegisteredNormalSamples}
                    tumourCount={original.rnaRegisteredTumourSamples}
                  />
                ),
              },
              {
                header: (
                  <ListFilterHeader
                    header={'Raw Reads'}
                    panelLegend={'RNA Raw Reads Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'rnaRawReads',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
                  <DesignationCell
                    normalCount={original.rnaPublishedNormalAnalysis}
                    tumourCount={original.rnaPublishedTumourAnalysis}
                  />
                ),
              },
              {
                header: (
                  <ListFilterHeader
                    header={'Alignment'}
                    panelLegend={'Alignment Status'}
                    onFilter={(options) =>
                      updateFilter({
                        field: 'rnaAlignmentStatus',
                        values: options
                          .filter((option) => option.isChecked)
                          .map((option) => option.key),
                      })
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
                cell: ({ row: { original } }: CellProps) => (
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
      header: filterState.length ? (
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
      id: 'updated',
      columns: [
        FEATURE_SUBMITTED_DATA_ENABLED && {
          header: (
            <ListFilterHeader
              header={'Alerts'}
              panelLegend={'Filter Alerts'}
              onFilter={(options) =>
                updateFilter({
                  field: 'validWithCurrentDictionary',
                  values: options.filter((option) => option.isChecked).map((option) => option.key),
                })
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
          accessorKey: 'validWithCurrentDictionary',
          cell: ({ row: { original } }: CellProps) => {
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
          size: 125,
        },
        {
          header: 'Last Updated',
          accessorKey: 'updatedAt',
          cell: ({ row: { original } }: CellProps) => {
            return <div>{displayDate(original.updatedAt)}</div>;
          },
          size: 95,
        },
      ].filter(Boolean),
    },
  ];

  return (
    <TableV8
      columns={tableColumns}
      data={programDonorSummaryEntries}
      enableColumnResizing
      enableSorting
      loading={isCardLoading || isTableLoading}
      manualSorting
      onSortingChange={setSortingState}
      state={{ sorting: sortingState }}
      withHeaders
      withStripes
    />
  );
};

export default DonorSummaryTableV8;
