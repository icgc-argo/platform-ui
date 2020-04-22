import {
  DonorSummaryRecord,
  DonorDataReleaseState,
  MolecularProcessingStatus,
  ProgoramDonorReleasStats,
  DonorSummaryEntrySort,
  ProgramDonorsSummaryQueryVariables,
  DonorSummaryEntrySortField,
  DonorSummaryEntrySortOrder,
} from './types';
import Table, { TableColumnConfig } from 'uikit/Table';

import { displayDate, sleep } from 'global/utils/common';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon as StarIcon,
  TableInfoHeaderContainer,
  CellContentCenter,
  Pipeline,
} from '../../common';

import { createRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import HyperLink from 'uikit/Link';
import DonorStatsArea from './DonorSummaryTableStatArea';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { startCase } from 'lodash';
import { useProgramDonorsSummaryQuery } from '.';
import React from 'react';
import { SortedChangeFunction, SortingRule } from 'react-table';

export default ({
  programShortName,
  initalPages,
  initialPageSize,
  initialSorts,
  isCardLoading = true,
}: {
  programShortName: string;
  initalPages: number;
  initialPageSize: number;
  initialSorts: DonorSummaryEntrySort[];
  isCardLoading?: boolean;
}) => {
  // These are used to sort columns with multiple fields
  // the order of the fields is how its is order in asc or desc
  const ID_SEPERATOR = '-';
  const REGISTERD_SAMPLE_COLUMN_ID = 'registeredNormalSamples-registeredTumourSamples';
  const RAW_READS_COLUMN_ID = 'publishedNormalAnalysis-publishedTumourAnalysis';
  const ALIGNMENT_COLUMN_ID = 'alignmentsCompleted-alignmentsRunning-alignmentsFailed';
  const SANGER_VC_COLUMN_ID = 'sangerVcsCompleted-sangerVcsRunning-sangerVcsFailed';

  const emptyProgramSummaryStats: ProgoramDonorReleasStats = {
    registeredDonorsCount: 0,
    fullyReleasedDonorsCount: 0,
    partiallyReleasedDonorsCount: 0,
    noReleaseDonorsCount: 0,
  };

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
          Header: 'Raw Reads',
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
          Header: 'Alignment',
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
          Header: 'Sanger VC',
          id: SANGER_VC_COLUMN_ID,
          Cell: ({ original }) => (
            <Pipeline
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

  const [pagingState, setPagingState] = React.useState({
    pages: initalPages,
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
    loading,
  } = useProgramDonorsSummaryQuery(programShortName, first, offset, sorts, {
    onCompleted: () => {
      clearTimeout(loaderTimeout);
      setLoaderTimeout(
        setTimeout(() => {
          setIsTableLoading(false);
        }, 500),
      );
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
        const fields = sortRule.id.split(ID_SEPERATOR);
        const order = sortRule.desc ? 'desc' : 'asc';
        return accSorts.concat(
          fields.map(field => ({
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
      />
    </div>
  );
};
