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

import { PropsWithChildren, useEffect, useState } from 'react';
import {
  css,
  TableHeaderWrapper,
  TableV8,
  useTheme,
  Icon,
  ThemeColorNames,
  TableColumnConfig,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { SortedChangeFunction, SortingRule } from 'global/types/table';
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

type PagingState = {
  pages: number;
  pageSize: number;
  page: number;
};

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
  const [filterState, setFilterState] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(isCardLoading);

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
      ],
      meta: {
        customHeader: true,
      },
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
