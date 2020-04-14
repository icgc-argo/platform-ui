import {
  DonorSummaryRecord,
  DonorDataReleaseState,
  MolecularProcessingStatus,
  ProgoramDonorReleasStats,
  DonorSummaryEntrySort,
} from './types';
import Table, { TableColumnConfig } from 'uikit/Table';

import { displayDate, sleep } from 'global/utils/common';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon as StarIcon,
  TableInfoHeaderContainer,
  CellContentCenter,
} from '../../common';

import { createRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import HyperLink from 'uikit/Link';
import Pipe from 'uikit/Pipe';
import DonorStatsArea from './DonorSummaryTableStatArea';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { startCase } from 'lodash';
import { useProgramDonorsSummaryQuery } from '.';
import React from 'react';
import { SortedChangeFunction, SortingRule } from 'react-table';

enum PIPELINE_STATUS {
  COMPLETE = 'complete',
  IN_PROGRESS = 'inProgress',
  ERROR = 'error',
}
type PipelineStats = Record<PIPELINE_STATUS, number>;

export default ({
  donorSummaryEntries,
  programDonorSummaryStats,
  programShortName,
  offset: initialOffset,
  pageSize: initialPageSize,
  sorts: initialSorts,
  isEntriesLoading,
}: {
  donorSummaryEntries: Array<DonorSummaryRecord>;
  programDonorSummaryStats: ProgoramDonorReleasStats;
  programShortName: string;
  pageSize: number;
  offset: number;
  sorts: DonorSummaryEntrySort[];
  isEntriesLoading: boolean;
}) => {
  const {
    fetchMore: fetchMoreSummaryEntries,
    loading: isUpdatedEntriesLoading,
  } = useProgramDonorsSummaryQuery(programShortName, initialPageSize, initialOffset, initialSorts);

  const containerRef = createRef<HTMLDivElement>();
  const checkmarkIcon = <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />;

  const StatusColumnCell = ({ original }: { original: DonorSummaryRecord }) => {
    return (
      <CellContentCenter>
        <StarIcon
          fill={RELEASED_STATE_FILL_COLOURS[original.releaseStatus]}
          outline={RELEASED_STATE_STROKE_COLOURS[original.releaseStatus]}
        />
      </CellContentCenter>
    );
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

  const PipelineCell = (stats: PipelineStats) => {
    const theme = useTheme();

    const getBackgroundColour = (state: keyof PipelineStats) => {
      interface ColourMapper {
        [key: string]: keyof typeof theme.colors;
      }
      const mapper: ColourMapper = {
        [PIPELINE_STATUS.COMPLETE]: 'accent1_dimmed',
        [PIPELINE_STATUS.IN_PROGRESS]: 'warning_dark',
        [PIPELINE_STATUS.ERROR]: 'error',
      };
      return mapper[state];
    };

    const shouldRender = (num: number) => num > 0;

    const renderableStats = Object.keys(stats).filter(key => shouldRender(stats[key]));

    const pipeStats = renderableStats.map(stat => (
      <Pipe.Item key={stat} fill={getBackgroundColour(stat as keyof PipelineStats)}>
        {stats[stat]}
      </Pipe.Item>
    ));
    return <Pipe>{pipeStats}</Pipe>;
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
          accessor: 'releaseState',
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
          Header: 'Donor ID',
          accessor: 'donorId',
          Cell: ({ original }: { original: DonorSummaryRecord }) => {
            return (
              <Link href="">
                <HyperLink>{`${original.donorId} (${original.submitterDonorId})`}</HyperLink>
              </Link>
            );
          },
        },
        {
          Header: 'Core Fields',
          accessor: 'submittedCoreDataPercent',
          Cell: ({ original }) => (
            <PercentageCell original={original} fieldName="submittedCoreDataPercent" />
          ),
        },
        {
          Header: 'Extended Fields',
          accessor: 'submittedExtendedDataPercent',
          Cell: ({ original }) => (
            <PercentageCell original={original} fieldName="submittedExtendedDataPercent" />
          ),
        },
        {
          Header: 'Samples',
          accessor: 'samples',
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
          Header: 'Raw Reads',
          accessor: 'rawReads',
          Cell: ({ original }) => (
            <DesignationCell
              left={original.publishedNormalAnalysis}
              right={original.publishedTumourAnalysis}
            />
          ),
          width: 100,
        },
        {
          Header: 'Alignment',
          accessor: 'alignment',
          Cell: ({ original }) => (
            <PipelineCell
              complete={original.alignmentsCompleted}
              inProgress={original.alignmentsRunning}
              error={original.alignmentsFailed}
            />
          ),
        },
        {
          Header: 'Sanger VC',
          accessor: 'sangerVC',
          Cell: ({ original }) => (
            <PipelineCell
              complete={original.sangerVcsCompleted}
              inProgress={original.sangerVcsRunning}
              error={original.sangerVcsFailed}
            />
          ),
        },
      ],
    },
    {
      columns: [
        {
          Header: 'Processing Status',
          accessor: 'processingStatus',
          Cell: ProcessingCell,
        },
        {
          Header: 'Last Updated',
          accessor: 'updatedAt',
          Cell: ({ original }: { original: DonorSummaryRecord }) => {
            return <div>{displayDate(original.updatedAt)}</div>;
          },
        },
      ],
    },
  ];

  const [tableState, setTableState] = React.useState({
    pages: Math.ceil(programDonorSummaryStats.registeredDonorsCount / initialPageSize),
    pageSize: initialPageSize,
    page: 0,
    sorts: initialSorts,
  });

  const [isTableLoading, setIsTableLoading] = React.useState(false);

  // effect used to set/unset table loader
  React.useEffect(() => {
    if (isUpdatedEntriesLoading || isEntriesLoading) {
      setIsTableLoading(true);
    } else {
      sleep(500).then(() => setIsTableLoading(false));
    }
  }, [isUpdatedEntriesLoading, isEntriesLoading]);

  const updateProgarmDonorSummariesQuery = async (updatedVariables: any) => {
    // turn on loader and wait before fetching more data so data doesn't render before loader
    setIsTableLoading(true);
    await sleep(100);
    fetchMoreSummaryEntries({
      variables: updatedVariables,
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
    });
  };

  const fetchNext = async (newPageNum: number) => {
    newPageNum =
      newPageNum > tableState.pages - 1 ? tableState.pages - 1 : newPageNum < 0 ? 0 : newPageNum; // newPageNum is zero indexed

    const newOffset = newPageNum * tableState.pageSize;

    await updateProgarmDonorSummariesQuery({
      offset: newOffset,
      first: tableState.pageSize,
      sorts: tableState.sorts,
    });

    setTableState({ ...tableState, page: newPageNum });
  };

  const repage = async (newPageSize: number, newPage: number) => {
    const newOffset = newPage * newPageSize; // newPage is zero indexed

    await updateProgarmDonorSummariesQuery({
      offset: newOffset,
      first: newPageSize,
      sorts: tableState.sorts,
    });

    setTableState({
      ...tableState,
      page: 0,
      pageSize: newPageSize,
      pages: Math.ceil(programDonorSummaryStats.registeredDonorsCount / newPageSize),
    });
  };

  const resort: SortedChangeFunction = async (newSorted: SortingRule[]) => {
    const sorts = newSorted.map(sortingRule => ({
      field: sortingRule.id,
      order: sortingRule.desc ? 'desc' : 'asc',
    }));

    await updateProgarmDonorSummariesQuery({
      sorts,
      first: tableState.pageSize,
      offset: tableState.page * tableState.pageSize,
    });

    setTableState({ ...tableState, sorts });
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
      <TableInfoHeaderContainer
        left={<DonorStatsArea programDonorSummaryStats={programDonorSummaryStats} />}
        noMargin={true}
      />
      <Table
        loading={isTableLoading}
        parentRef={containerRef}
        columns={tableColumns}
        data={donorSummaryEntries}
        showPagination={true}
        manual={true}
        pages={tableState.pages}
        pageSize={tableState.pageSize}
        page={tableState.page}
        onPageChange={fetchNext}
        onPageSizeChange={repage}
        onSortedChange={resort}
      />
    </div>
  );
};
