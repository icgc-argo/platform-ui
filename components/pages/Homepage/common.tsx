import { css, styled } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { Col, Row } from 'react-grid-system';

type DataReleaseStatistic = {
  quantity: number;
  description: string;
};

type DataReleaseVersion = {
  releaseIteration: number;
  date: string;
};

export const DataReleaseBar: React.ComponentType<{
  stats: Array<DataReleaseStatistic>;
  version: DataReleaseVersion;
}> = ({ stats, version }) => {
  const theme = useTheme();
  const formattedStats = stats.map(stat => (
    <Col md={3} sm={6}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        `}
      >
        <div>
          <Typography
            color={theme.colors.white}
            variant={'hero'}
            bold={true}
            css={css`
              margin-bottom: 5px;
            `}
          >
            {stat.quantity.toLocaleString()}
          </Typography>
        </div>
        <div>
          {' '}
          <Typography color={theme.colors.white} variant={'label'} bold={true}>
            {stat.description}
          </Typography>
        </div>
      </div>
    </Col>
  ));
  return (
    <div
      css={css`
        margin: 15px 0px 40px;
        width: 80%;
      `}
    >
      <div
        css={css`
          margin-bottom: 5px;
        `}
      >
        <Typography color={theme.colors.white} variant={'data'}>
          Data Release {version.releaseIteration} - {version.date}
        </Typography>
      </div>
      <div
        css={css`
          border-top: 4px solid ${theme.colors.accent3_2};
        `}
      >
        <Row>{formattedStats}</Row>
      </div>
    </div>
  );
};

export const DataCallout: React.ComponentType<{
  stats: Array<DataReleaseStatistic>;
  version: DataReleaseVersion;
}> = ({ stats, version }) => {
  const theme = useTheme();
  const formattedStats = stats.map(stat => (
    <Col md={3} sm={6}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        `}
      >
        <div>
          <Typography
            color={theme.colors.white}
            variant={'hero'}
            bold={true}
            css={css`
              margin-bottom: 5px;
            `}
          >
            {stat.quantity.toLocaleString()}
          </Typography>
        </div>
        <div>
          {' '}
          <Typography color={theme.colors.white} variant={'label'} bold={true}>
            {stat.description}
          </Typography>
        </div>
      </div>
    </Col>
  ));
  return (
    <div
      css={css`
        margin: 15px 0px 40px;
        width: 80%;
      `}
    >
      <div
        css={css`
          margin-bottom: 5px;
        `}
      >
        <Typography color={theme.colors.white} variant={'data'}>
          Data Release {version.releaseIteration} - {version.date}
        </Typography>
      </div>
      <div
        css={css`
          border-top: 4px solid ${theme.colors.accent3_2};
        `}
      >
        <Row>{formattedStats}</Row>
      </div>
    </div>
  );
};
