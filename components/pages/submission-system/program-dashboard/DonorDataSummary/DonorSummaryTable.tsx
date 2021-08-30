/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import {
  DonorSummaryRecord,
  DonorDataReleaseState,
  MolecularProcessingStatus,
  ProgramDonorReleaseStats,
  DonorSummaryEntrySort,
  DonorSummaryEntrySortField,
  DonorSummaryEntrySortOrder,
  ProgramDonorSummaryEntryField,
} from './types';
import Table, { TableColumnConfig } from 'uikit/Table';

import { displayDate } from 'global/utils/common';
import Icon from 'uikit/Icon';
import DropdownPanel, { FilterOption, ListFilter, TextInputFilter } from 'uikit/DropdownPanel';
import {
  DataTableStarIcon as StarIcon,
  TableInfoHeaderContainer,
  CellContentCenter,
  Pipeline,
} from '../../common';

import React, { createRef, useRef, useState } from 'react';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import DonorStatsArea from './DonorSummaryTableStatArea';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { startCase } from 'lodash';
import { useProgramDonorsSummaryQuery } from '.';
import { SortedChangeFunction, SortingRule } from 'react-table';
import ContentError from 'components/placeholders/ContentError';
import { Row } from 'react-grid-system';

export default ({
  programShortName,
  initialPages,
  initialPageSize,
  initialSorts,
  isCardLoading = true,
}: {
  programShortName: string;
  initialPages: number;
  initialPageSize: number;
  initialSorts: DonorSummaryEntrySort[];
  isCardLoading?: boolean;
}) => {
  // These are used to sort columns with multiple fields
  // the order of the fields is how its is order in asc or desc
  const ID_SEPARATOR = '-';
  const REGISTERD_SAMPLE_COLUMN_ID = 'registeredNormalSamples-registeredTumourSamples';
  const RAW_READS_COLUMN_ID = 'publishedNormalAnalysis-publishedTumourAnalysis';
  const ALIGNMENT_COLUMN_ID = 'alignmentsCompleted-alignmentsRunning-alignmentsFailed';
  const SANGER_VC_COLUMN_ID = 'sangerVcsCompleted-sangerVcsRunning-sangerVcsFailed';
  const MUTECT2_VC_COLUMN_ID = 'mutectCompleted-mutectRunning-mutectFailed';

  const emptyProgramSummaryStats: ProgramDonorReleaseStats = {
    registeredDonorsCount: 0,
    fullyReleasedDonorsCount: 0,
    partiallyReleasedDonorsCount: 0,
    noReleaseDonorsCount: 0,
    donorsInvalidWithCurrentDictionaryCount: 0,
  };

  const containerRef = createRef<HTMLDivElement>();
  const checkmarkIcon = <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />;

  const [filterState, setFilterState] = React.useState([]);
  const updateFilter = (field: ProgramDonorSummaryEntryField, value: string | string[]) => {
    const newFilters = filterState.filter((x) => x.field !== field);
    newFilters.push({ field: field, values: typeof value === 'string' ? [value] : value });
    setFilterState(newFilters);
  };
  const clearFilter = (field: ProgramDonorSummaryEntryField) => {
    const newFilters = filterState.filter((x) => x.field !== field);
    setFilterState(newFilters);
  };
  const getFilterValue = (field: ProgramDonorSummaryEntryField) =>
    filterState.find((x) => x.field === field)?.values;

  const StatusColumnCell = ({ original }: { original: DonorSummaryRecord }) => {
    const theme = useTheme();
    const displayIcon = original.validWithCurrentDictionary ? (
      <StarIcon
        fill={RELEASED_STATE_FILL_COLOURS[original.releaseStatus]}
        outline={RELEASED_STATE_STROKE_COLOURS[original.releaseStatus]}
      />
    ) : (
      <Icon name="warning" fill={theme.colors.error} width="16px" height="15px" />
    );
    return <CellContentCenter>{displayIcon}</CellContentCenter>;
  };

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

  const DesignationCell = ({ left, right }: { left: number; right: number }) => {
    const theme = useTheme();
    const isValid = (num: number) => num > 0;
    const DesignationContainer = styled('div')`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    `;
    const DesignationEntry = styled('div')`
      text-align: center;
      flex: 1;
      color: ${(props: { num: number }) =>
        isValid(props.num) ? theme.colors.black : theme.colors.error};
    `;

    return (
      <DesignationContainer>
        <DesignationEntry num={left}>{left}N</DesignationEntry>
        <DesignationEntry
          num={right}
          css={css`
            border-left: solid 1px ${theme.colors.grey_2};
          `}
        >
          {right}T
        </DesignationEntry>
      </DesignationContainer>
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
  }: {
    header: string;
    open: boolean;
    setOpen?: (open?: boolean | any) => void;
    focusFirst?: () => void;
    buttonRef?: React.Ref<HTMLInputElement>;
    panelRef?: React.Ref<HTMLElement>;
    handleBlur?: (event?: any) => void;
    active?: boolean;
    children: React.ReactNode;
  }) => {
    const theme = useTheme();

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
    const handleBlur = (e: React.FocusEvent) => {
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
    activeFilters = [],
    onFilter = () => {},
  }: {
    header: string;
    panelLegend?: string;
    filterOptions?: Array<FilterOption>;
    activeFilters?: Array<string>;
    onFilter?: (filters?: Array<FilterOption>) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const options = React.useMemo(
      () =>
        filterOptions.map((option) => ({
          ...option,
          isChecked: activeFilters?.indexOf(option.key) > -1 ? true : false,
        })),
      [filterOptions, activeFilters],
    );
    const buttonRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    // Close dropdown panel when tabbing out of it
    const handleBlur = (e: React.FocusEvent) => {
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

  const tableColumns: Array<TableColumnConfig<DonorSummaryRecord>> = [
    {
      Header: 'CLINICAL DATA STATUS',
      headerStyle: {
        background: useTheme().colors.secondary_4,
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
            return `${original.donorId} (${original.submitterDonorId})`;
          },
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
              filterOptions={[
                {
                  key: 'COMPLETE',
                  value: 'Complete',
                },
                {
                  key: 'INCOMPLETE',
                  value: 'Incomplete',
                },
                {
                  key: 'NO_DATA',
                  value: 'No Data Submitted',
                },
              ]}
              activeFilters={getFilterValue('coreDataPercentAggregation')}
            />
          ),
          accessor: 'submittedCoreDataPercent',
          Cell: ({ original }) => (
            <PercentageCell original={original} fieldName="submittedCoreDataPercent" />
          ),
        },

        {
          Header: (
            <ListFilterHeader
              header={'Samples'}
              panelLegend={'Sample Registration Status'}
              onFilter={(options) =>
                updateFilter(
                  'registeredSamplePairs',
                  options.filter((option) => option.isChecked).map((option) => option.key),
                )
              }
              filterOptions={[
                {
                  key: 'VALID',
                  value: 'Valid',
                },
                {
                  key: 'INVALID',
                  value: 'Invalid',
                },
              ]}
              activeFilters={getFilterValue('registeredSamplePairs')}
            />
          ),
          id: REGISTERD_SAMPLE_COLUMN_ID,
          Cell: ({ original }) => (
            <DesignationCell
              left={original.registeredNormalSamples}
              right={original.registeredTumourSamples}
            />
          ),
          width: 100,
        },
      ],
    },
    {
      Header: 'DNA-SEQ PIPELINE',
      headerStyle: {
        background: useTheme().colors.accent3_3,
      },
      columns: [
        {
          Header: (
            <ListFilterHeader
              header={'Raw Reads'}
              panelLegend={'Raw Reads Status'}
              onFilter={(options) =>
                updateFilter(
                  'rawReads',
                  options.filter((option) => option.isChecked).map((option) => option.key),
                )
              }
              filterOptions={[
                {
                  key: 'VALID',
                  value: 'Valid',
                },
                {
                  key: 'INVALID',
                  value: 'Invalid',
                },
              ]}
              activeFilters={getFilterValue('rawReads')}
            />
          ),
          id: RAW_READS_COLUMN_ID,
          Cell: ({ original }) => (
            <DesignationCell
              left={original.publishedNormalAnalysis}
              right={original.publishedTumourAnalysis}
            />
          ),
          width: 100,
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
              filterOptions={[
                {
                  key: 'COMPLETED',
                  value: 'Completed',
                },
                {
                  key: 'IN_PROGRESS',
                  value: 'In Progress',
                },
                {
                  key: 'FAILED',
                  value: 'Failed',
                },
                {
                  key: 'NO_DATA',
                  value: 'No Data',
                },
              ]}
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
              filterOptions={[
                {
                  key: 'COMPLETED',
                  value: 'Completed',
                },
                {
                  key: 'IN_PROGRESS',
                  value: 'In Progress',
                },
                {
                  key: 'FAILED',
                  value: 'Failed',
                },
                {
                  key: 'NO_DATA',
                  value: 'No Data',
                },
              ]}
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
          Header: 'Mutect2 VC',
          id: MUTECT2_VC_COLUMN_ID,
          Cell: ({ original }) => (
            <Pipeline
              complete={original.mutectCompleted}
              inProgress={original.mutectRunning}
              error={original.mutectFailed}
            />
          ),
        },
      ],
    },
    {
      Header: 'Last Updated',
      accessor: 'updatedAt',
      Cell: ({ original }: { original: DonorSummaryRecord }) => {
        return <div>{displayDate(original.updatedAt)}</div>;
      },
    },
  ];

  const [pagingState, setPagingState] = React.useState({
    pages: initialPages,
    pageSize: initialPageSize,
    page: 0,
    sorts: initialSorts,
  });

  const offset = pagingState.pageSize * pagingState.page;
  const first = pagingState.pageSize;
  const sorts = pagingState.sorts;

  const {
    data: {
      programDonorSummaryEntries = [],
      programDonorSummaryStats = emptyProgramSummaryStats,
    } = {},
    error: programDonorsSummaryQueryError,
    loading,
  } = useProgramDonorsSummaryQuery({
    programShortName,
    first,
    offset,
    sorts,
    filters: filterState,
    options: {
      onCompleted: () => {
        clearTimeout(loaderTimeout);
        setLoaderTimeout(
          setTimeout(() => {
            setIsTableLoading(false);
          }, 500),
        );
      },
    },
  });

  const [loaderTimeout, setLoaderTimeout] = React.useState<NodeJS.Timeout>();
  const [isTableLoading, setIsTableLoading] = React.useState(isCardLoading);
  React.useEffect(() => {
    if (loading) {
      setIsTableLoading(true);
    }
  }, [loading]);

  const handlePagingStateChange = (state: typeof pagingState) => {
    setPagingState(state);
  };

  const onPageChange = async (newPageNum: number) => {
    handlePagingStateChange({ ...pagingState, page: newPageNum }); // newPageNum is zero indexed
  };

  const onPageSizeChange = async (newPageSize: number, newPage: number) => {
    handlePagingStateChange({
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
    handlePagingStateChange({ ...pagingState, sorts });
  };

  return (
    <div
      ref={containerRef}
      // this z-index needs to be greater then GlobalFooter's z-index otherwise the drop down is hidden behind it
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      {programDonorsSummaryQueryError ? (
        <ContentError />
      ) : (
        <>
          <TableInfoHeaderContainer
            left={
              <DonorStatsArea
                css={css`
                  opacity: ${isTableLoading ? 0.5 : 1};
                `}
                programDonorSummaryStats={programDonorSummaryStats}
              />
            }
            noMargin={true}
          />
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

const getDefaultSort = (donorSorts: DonorSummaryEntrySort[]) =>
  donorSorts.map(({ field, order }) => ({ id: field, desc: order === 'desc' }));
