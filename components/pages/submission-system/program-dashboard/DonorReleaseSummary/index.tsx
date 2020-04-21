import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import DASHBOARD_SUMMARY_QUERY from '../DASHBOARD_SUMMARY_QUERY.gql';
import { useQuery } from '@apollo/react-hooks';
import { usePageQuery } from 'global/hooks/usePageContext';
import { DashboardCard, DashboardSummaryData, DashboardSummaryDataVariables } from '../common';

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { data, loading } = useQuery<DashboardSummaryData, DashboardSummaryDataVariables>(
    DASHBOARD_SUMMARY_QUERY,
    {
      variables: { programShortName: programShortName },
      // polling is not necessary here because it only wants the commitmentDonors
    },
  );
  return (
    <DashboardCard>
      <Typography variant="default" component="span">
        Donor Release Summary
      </Typography>

      <div
        css={css`
          margin-top: 40px;
          background-color: #dcdde1;
          border-radius: 8px;
          width: 100%;
          margin-bottom: 8px;
        `}
      >
        &nbsp;
      </div>

      <div
        css={css`
          display: flex;
          align-items: flex-end;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <Typography variant="caption" color="grey">
          With Released Files
        </Typography>

        <div>
          <Typography
            variant="caption"
            bold={true}
            css={css`
              margin-right: 5px;
            `}
          >
            {loading ? '...' : data.program.commitmentDonors}
          </Typography>
          <Typography variant="caption" color="grey">
            Committed
          </Typography>
        </div>
      </div>
    </DashboardCard>
  );
};
