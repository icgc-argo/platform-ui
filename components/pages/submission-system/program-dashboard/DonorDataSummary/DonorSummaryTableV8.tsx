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
import {
  css,
  Icon,
  Link,
  TableColumnConfig,
  TableHeaderWrapper,
  TableV8,
  ThemeColorNames,
  useTheme,
  FilterableHeader,
  TextFilterHeader,
  FilterClearButton,
} from '@icgc-argo/uikit';
import { Row } from 'react-grid-system';
import { getConfig } from 'global/config';
import CLINICAL_ERRORS_QUERY from 'components/pages/submission-system/program-submitted-data/ClinicalErrors/CLINICAL_ERRORS_QUERY';
import { SortedChangeFunction, SortingRule } from 'global/types/table';
import { displayDate } from 'global/utils/common';
import {
  ClinicalEntityQueryResponse,
  defaultClinicalEntityFilters,
  parseDonorIdString,
} from 'components/pages/submission-system/program-submitted-data/common';
import { CellContentCenter, DataTableStarIcon as StarIcon } from '../../common';
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
  EMPTY_PROGRAM_SUMMARY_STATS,
  RELEASED_STATE_FILL_COLOURS,
  RELEASED_STATE_STROKE_COLOURS,
} from './common';
import { useProgramDonorsSummaryQuery } from '.';
import urlJoin from 'url-join';

type PagingState = {
  pages: number;
  pageSize: number;
  page: number;
};

type DonorSummaryCell = { row: { original: DonorSummaryRecord } };

type DonorSummaryFilter = { field: ProgramDonorSummaryEntryField; values: string[] };

export type SortingState = Array<{ id: DonorSummaryEntrySortField; desc: boolean }>;
type SortingRequest = DonorSummaryEntrySort[];

export const formatSortingRequest = (sorts: SortingState): SortingRequest =>
  sorts.map((sort) => ({
    field: sort.id,
    order: sort.desc ? 'desc' : 'asc',
  }));

const DonorSummaryTableV8 = ({
  programShortName,
  initialPages,
  initialPageSize,
  initialSorts,
  isCardLoading = true,
}: {
  programShortName: string;
  initialPages: PagingState['pages'];
  initialPageSize: PagingState['pageSize'];
  initialSorts: SortingState;
  isCardLoading?: boolean;
}) => {
  // config
  const theme = useTheme();
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();

  // state
  const [pagingState, setPagingState] = useState<PagingState>({
    pages: initialPages,
    pageSize: initialPageSize,
    page: 0,
  });
  const [sortingState, setSortingState] = useState<SortingState>(initialSorts);
  const [isTableLoading, setIsTableLoading] = useState(isCardLoading);

  // filter state handling
  const [filterState, setFilterState] = useState<DonorSummaryFilter[]>([]);
  const handleFilterStateChange = (filters: DonorSummaryFilter[]) => {
    setFilterState(filters);
    setPagingState({ ...pagingState, page: 0 });
  };
  const updateFilter = ({ field, values }: DonorSummaryFilter) => {
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
        console.log('v8 - query complete');
        const totalDonors = result.programDonorSummary?.stats?.registeredDonorsCount || 0;
        const nextPages = Math.ceil(totalDonors / pagingState.pageSize);
        setPagingState({
          ...pagingState,
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
  const tableColumns: Array<TableColumnConfig<DonorSummaryRecord>> = [
    {
      header: <HeaderWithBackground fill="secondary_4">Clinical Data Status</HeaderWithBackground>,
      id: 'clinicalDataStatus',
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
          cell: ({ row: { original } }: DonorSummaryCell) => {
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
      ],
      meta: {
        customHeader: true,
      },
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
        {
          header: 'Last Updated',
          accessorKey: 'updatedAt',
          cell: ({ row: { original } }: DonorSummaryCell) => {
            return <div>{displayDate(original.updatedAt)}</div>;
          },
          size: 95,
        },
      ],
    },
  ];

  return (
    <TableV8
      columns={tableColumns}
      data={programDonorSummaryEntries}
      loading={isCardLoading || isTableLoading}
      manualSorting
      onSortingChange={setSortingState}
      state={{ sorting: sortingState }}
      withHeaders
      withResize
      withSorting
      withStripes
    />
  );
};

export default DonorSummaryTableV8;
