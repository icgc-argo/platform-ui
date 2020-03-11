import { ReleasedFilesState, DonorEntityRecord, ProcessingStates, PipelineStats } from './types';
import Table, { TableColumnConfig } from 'uikit/Table';

import { displayDate } from 'global/utils/common';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
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

const StarIcon = DataTableStarIcon;

type ReleasedStats = {
  fullyCount: number;
  partiallyCount: number;
  noCount: number;
};

const PROCESSING_STATUS: {
  COMPLETE: ProcessingStates;
  PROCESSING: ProcessingStates;
  REGISTERED: ProcessingStates;
} = {
  COMPLETE: 'Complete',
  PROCESSING: 'Processing',
  REGISTERED: 'Registered',
};

const PIPELINE_STATUS: {
  COMPLETE: keyof PipelineStats;
  IN_PROGRESS: keyof PipelineStats;
  ERROR: keyof PipelineStats;
} = {
  COMPLETE: 'complete',
  IN_PROGRESS: 'inProgress',
  ERROR: 'error',
};

const RELEASED_STATE_FILL_COLOURS: {
  [k in ReleasedFilesState]: React.ComponentProps<typeof StarIcon>['fill']
} = {
  FULLY: 'secondary',
  PARTIALLY: 'secondary_2',
  NO: 'white',
};

const RELEASED_STATE_STROKE_COLOURS: {
  [k in ReleasedFilesState]: React.ComponentProps<typeof StarIcon>['outline']
} = {
  FULLY: null,
  PARTIALLY: null,
  NO: { color: 'secondary', width: 1 },
};

const DonorStatsArea = ({ stats, total }: { stats: ReleasedStats; total: number }) => {
  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>{total} donors</StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={RELEASED_STATE_FILL_COLOURS.FULLY} />
          {stats.fullyCount} with fully released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={RELEASED_STATE_FILL_COLOURS.PARTIALLY} />
          {stats.partiallyCount} with partially released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS.NO}
            outline={RELEASED_STATE_STROKE_COLOURS.NO}
          />
          {stats.noCount} with no released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

export default ({ donors }: { donors: Array<DonorEntityRecord> }) => {
  const containerRef = createRef<HTMLDivElement>();
  const checkmarkIcon = <Icon name="checkmark" fill="accent1_dimmed" width="12px" height="12px" />;

  const StatusColumnCell = ({ original }: { original: DonorEntityRecord }) => {
    return (
      <CellContentCenter>
        <StarIcon
          fill={RELEASED_STATE_FILL_COLOURS[original.releaseState]}
          outline={RELEASED_STATE_STROKE_COLOURS[original.releaseState]}
        />
      </CellContentCenter>
    );
  };

  const PercentageCell = ({
    original,
    fieldName,
  }: {
    original: DonorEntityRecord;
    fieldName: 'coreFields' | 'extendedFields';
  }) => {
    const cellContent =
      original[fieldName] === 100
        ? checkmarkIcon
        : original[fieldName] === 0
        ? ''
        : `${original[fieldName]}%`;
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

  const DesignationCell = ({
    original,
    fieldName,
  }: {
    original: DonorEntityRecord;
    fieldName: 'samples' | 'rawReads';
  }) => {
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

    const numNormal = original[fieldName].normal;
    const numTumour = original.samples.tumour;
    return (
      <DesignationContainer>
        <DesignationEntry num={numNormal}>{numNormal}N</DesignationEntry>
        <DesignationEntry
          num={numTumour}
          css={css`
            border-left: solid 1px ${theme.colors.grey_2};
          `}
        >
          {numTumour}T
        </DesignationEntry>
      </DesignationContainer>
    );
  };

  const ProcessingCell = ({ original }: { original: DonorEntityRecord }) => {
    const getIcon = (state: ProcessingStates) =>
      ({
        [PROCESSING_STATUS.COMPLETE]: checkmarkIcon,
        [PROCESSING_STATUS.PROCESSING]: (
          <Icon width="12px" height="12px" fill="warning_dark" name="ellipses" />
        ),
        [PROCESSING_STATUS.REGISTERED]: (
          <Icon width="12px" height="12px" fill="primary_2" name="dash" />
        ),
      }[state]);

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
        <div>{original.processingStatus}</div>
      </div>
    );
  };

  const PipelineCell = ({
    original,
    fieldName,
  }: {
    original: DonorEntityRecord;
    fieldName: 'alignment' | 'sangerVC';
  }) => {
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

    const renderableStats = Object.keys(original[fieldName]).filter(key =>
      shouldRender(original[fieldName][key]),
    );

    const pipeStats = renderableStats.map(stat => (
      <Pipe.Item key={stat} fill={getBackgroundColour(stat as keyof PipelineStats)}>
        {original[fieldName][stat]}
      </Pipe.Item>
    ));
    return <Pipe>{pipeStats}</Pipe>;
  };

  const tableColumns: Array<TableColumnConfig<DonorEntityRecord>> = [
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
          sortMethod: (a: ReleasedFilesState, b: ReleasedFilesState) => {
            const priorities = {
              NO: 1,
              PARTIALLY: 2,
              FULLY: 3,
            } as { [k in ReleasedFilesState]: number };
            return priorities[a] - priorities[b];
          },
        },
        {
          Header: 'Donor ID',
          accessor: 'donorID',
          Cell: ({ original }: { original: DonorEntityRecord }) => {
            return (
              <Link href="">
                <HyperLink>{original.donorId}</HyperLink>
              </Link>
            );
          },
        },
        {
          Header: 'Core Fields',
          accessor: 'coreFields',
          Cell: ({ original }) => <PercentageCell original={original} fieldName={'coreFields'} />,
        },
        {
          Header: 'Extended Fields',
          accessor: 'extendedFields',
          Cell: ({ original }) => (
            <PercentageCell original={original} fieldName={'extendedFields'} />
          ),
        },
        {
          Header: 'Samples',
          accessor: 'samples',
          Cell: ({ original }) => <DesignationCell original={original} fieldName={'samples'} />,
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
          Cell: ({ original }) => <DesignationCell original={original} fieldName={'rawReads'} />,
          width: 100,
        },
        {
          Header: 'Alignment',
          accessor: 'alignment',
          Cell: ({ original }) => <PipelineCell original={original} fieldName={'alignment'} />,
        },
        {
          Header: 'Sanger VC',
          accessor: 'sangerVC',
          Cell: ({ original }) => <PipelineCell original={original} fieldName={'sangerVC'} />,
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
          accessor: 'lastUpdated',
          Cell: ({ original }: { original: DonorEntityRecord }) => {
            return <div>{displayDate(original.lastUpdated)}</div>;
          },
        },
      ],
    },
  ];

  const getStateCount = (allDonors: Array<DonorEntityRecord>, releaseState: ReleasedFilesState) =>
    allDonors.filter(donor => donor.releaseState === releaseState).length;

  const stateCountSummary: ReleasedStats = {
    fullyCount: getStateCount(donors, 'FULLY'),
    partiallyCount: getStateCount(donors, 'PARTIALLY'),
    noCount: getStateCount(donors, 'NO'),
  };

  return (
    <div ref={containerRef}>
      <TableInfoHeaderContainer
        left={<DonorStatsArea total={donors.length} stats={stateCountSummary} />}
        noMargin={true}
      />
      <Table parentRef={containerRef} showPagination={false} columns={tableColumns} data={donors} />
    </div>
  );
};
