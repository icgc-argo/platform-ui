import Typography from 'uikit/Typography';
import { DashboardCard, POLL_INTERVAL_MILLISECONDS } from '../common';
import DonorSummaryTable from './DonorSummaryTable';
import { usePageQuery } from 'global/hooks/usePageContext';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import PROGRAM_DONOR_SUMMARY_QUERY from './gql/PROGRAM_DONOR_SUMMARY_QUERY.gql';
import {
  ProgramDonorsSummaryQueryData,
  ProgramDonorsSummaryQueryVariables,
  DonorSummaryEntrySort,
  DonorSummaryEntrySortField,
  DonorSummaryEntrySortOrder,
} from './types';
import EmptyDonorSummaryState from './EmptyDonorSummaryTable';
import { useTimeout } from './common';
import { css } from '@emotion/core';
import Button from 'uikit/Button';
import { Row, Col } from 'react-grid-system';
import Icon from 'uikit/Icon';

export const useProgramDonorsSummaryQuery = (
  programShortName: string,
  first: number,
  offset: number,
  sorts: DonorSummaryEntrySort[],
  options: Omit<
    QueryHookOptions<ProgramDonorsSummaryQueryData, ProgramDonorsSummaryQueryVariables>,
    'variables'
  > = {},
) => {
  const pollingTimeout = useTimeout(30000);
  const hook = useQuery<ProgramDonorsSummaryQueryData, ProgramDonorsSummaryQueryVariables>(
    PROGRAM_DONOR_SUMMARY_QUERY,
    {
      ...options,
      variables: {
        programShortName,
        first,
        offset,
        sorts,
      },
      pollInterval: !pollingTimeout ? POLL_INTERVAL_MILLISECONDS : 0,
    },
  );
  return {
    ...hook,
    data: hook.data,
  };
};

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const DEFAULT_PAGE_SIZE = 20;
  const DEFAULT_SORTS = [
    {
      field: 'updatedAt' as DonorSummaryEntrySortField,
      order: 'desc' as DonorSummaryEntrySortOrder,
    },
  ];
  const DEFAULT_OFFSET = 0;

  // using the default query variables will get us all registered donors
  const {
    data: { programDonorSummaryStats = undefined } = {},
    loading: isCardLoading = true,
  } = useProgramDonorsSummaryQuery(
    programShortName,
    DEFAULT_PAGE_SIZE,
    DEFAULT_OFFSET,
    DEFAULT_SORTS,
  );
  const initalPages = !isCardLoading
    ? Math.ceil(programDonorSummaryStats.registeredDonorsCount / DEFAULT_PAGE_SIZE)
    : 1;

  const isDonorSummaryEntriesEmpty =
    !programDonorSummaryStats || programDonorSummaryStats.registeredDonorsCount === 0;

  return !isCardLoading && isDonorSummaryEntriesEmpty ? (
    <DashboardCard>
      <Typography variant="default" component="span">
        Donor Data Summary
      </Typography>
      <EmptyDonorSummaryState />
    </DashboardCard>
  ) : (
    <DashboardCard>
      <Row>
        <Col md={3.5} sm={12}>
          <Typography variant="default" component="span">
            Donor Data Summary
          </Typography>
        </Col>
        <Col
          md={8.5}
          sm={12}
          css={css`
            display: flex;
            align-self: center;
            justify-content: flex-end;
          `}
        >
          <Row>
            <Col>
              <Button
                css={css`
                  white-space: nowrap;
                `}
                variant="secondary"
              >
                <Icon
                  css={css`
                    padding-right: 4px;
                  `}
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                />
                All Clinical Data
              </Button>
            </Col>
            <Col>
              <Button
                css={css`
                  white-space: nowrap;
                `}
                variant="secondary"
              >
                <Icon
                  css={css`
                    padding-right: 4px;
                  `}
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                />
                Missing Data
              </Button>
            </Col>
            <Col>
              <Button
                css={css`
                  white-space: nowrap;
                `}
                variant="secondary"
              >
                <Icon
                  css={css`
                    padding-right: 4px;
                  `}
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                />
                Table Data
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <DonorSummaryTable
        programShortName={programShortName}
        initalPages={initalPages}
        initialPageSize={DEFAULT_PAGE_SIZE}
        initialSorts={DEFAULT_SORTS}
        isCardLoading={isCardLoading}
      />
    </DashboardCard>
  );
};
