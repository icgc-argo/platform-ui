import { css, styled } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { Col, Row } from 'react-grid-system';
import { ThemeColorNames } from 'uikit/theme/types';
import { UikitIconNames } from 'uikit/Icon/icons';
import Icon from 'uikit/Icon';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import Container from 'uikit/Container';
import overtureLogo from 'uikit/assets/overture-logo.svg';

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
    <Col md={3} sm={6} key={stat.description}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin: 0 5%;
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
        margin: 20px 0px 40px;
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
        <Row nogutter>{formattedStats}</Row>
      </div>
    </div>
  );
};

export const CircleContainer: React.ComponentType<{
  fill: keyof ThemeColorNames;
}> = ({ fill, children }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        width: 44px;
        background-color: ${theme.colors[fill]};
        border-radius: 100%;
      `}
    >
      {children}
    </div>
  );
};

export const DataCallout: React.ComponentType<{
  iconName: UikitIconNames;
  iconFill: keyof ThemeColorNames;
  circleFill: keyof ThemeColorNames;
  title: string;
  urlData: { text: string; href: string };
}> = ({ iconName, iconFill, circleFill, title, urlData, children }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        height: 100%;
        margin: 0 5%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <CircleContainer fill={circleFill}>
          <Icon name={iconName} fill={iconFill} />
        </CircleContainer>
        <Typography
          color="primary"
          variant="subtitle"
          css={css`
            margin-bottom: 5px;
          `}
          as="h2"
        >
          {title}
        </Typography>
        <Typography as="h3">{children}</Typography>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        `}
      >
        <Link
          href={urlData.href}
          underline={false}
          css={css`
            margin: 0 15px;
          `}
          target="_blank"
        >
          <Button
            css={css`
              margin-bottom: 20px;
            `}
          >
            {urlData.text}
          </Button>
        </Link>
      </div>
    </div>
  );
};
const GradientBar = styled('div')`
  background-image: ${({ theme }) =>
    `linear-gradient(to left, ${theme.colors.accent3_2} 0%, ${theme.colors.accent1_1} 47%, ${
      theme.colors.accent3_dark
    } 100%)`};

  width: 40%;
  height: 3px;
  margin: -5px 0px;
`;

export const NewsContainer: React.ComponentType<{ newsItems: JSX.Element[] }> = ({ newsItems }) => {
  const theme = useTheme();
  return (
    <Container
      css={css`
        margin: 50px 0px 35px 0px;
        overflow: hidden;
      `}
    >
      <Row nogutter>
        <Col md={4} sm={12}>
          <div
            css={css`
              background-image: linear-gradient(
                  to bottom,
                  rgba(21, 28, 61, 0.33),
                  rgba(21, 28, 61, 0.33) 105%
                ),
                url('/static/icgc-data-scientist-wide.png');
              background-size: cover;
              /* fade bg into solid color */
              /* background-repeat: no-repeat;
              background-size: contain;
              background-position: top; */
              background-color: ${theme.colors.primary};
              width: 100%;
              min-height: 210px;
              height: 100%;
              display: flex;
              flex-direction: column;
              text-align: center;
              align-items: center;
              justify-content: center;
              padding-left: 0px;
            `}
          >
            <div
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                text-align: center;
                align-items: center;
              `}
            >
              <GradientBar />
              <Typography variant="subtitle" color={theme.colors.white} bold={true} as="h2">
                Latest News
              </Typography>
              <GradientBar />
            </div>
          </div>
        </Col>
        <Col md={8} sm={12}>
          <div
            css={css`
              padding: 20px;
            `}
          >
            {newsItems.map((item, index) => (
              <Typography
                key={`newsText-${index}`}
                as="h3"
                variant="paragraph"
                css={css`
                  padding-bottom: 15px;
                  border-bottom: 1px solid ${theme.colors.grey_2};
                `}
              >
                {item}
              </Typography>
            ))}
            <Typography variant="paragraph" as="h3">
              If you have feature suggestions, feedback, or want to report a bug, please{' '}
              <Link href="/contact">contact us</Link>.
            </Typography>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const BoxLinkContainer = styled('div')`
  padding: 10px 5px;
  margin: 20px 10px;
  display: grid;
  grid-template-columns: 1.5fr 9fr 0.8fr;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;

export const ResourceBox: React.ComponentType<{
  iconName: UikitIconNames;
  iconFill: keyof ThemeColorNames;
  circleFill: keyof ThemeColorNames;
  title: string;
  bodyText: string;
  href: string;
}> = ({ iconName, iconFill, circleFill, title, bodyText, href }) => {
  const theme = useTheme();
  return (
    <Link underline={false} href={href} target="_blank">
      <Container
        css={css`
          height: 75%;
          margin: 0 10px;
          &:hover {
            background-color: ${theme.colors.grey_4};
          }
          cursor: pointer;
          color: ${theme.colors.primary};
        `}
      >
        <BoxLinkContainer>
          <div
            css={css`
              width: 44px;
              margin-right: 15px;
            `}
          >
            <CircleContainer fill={circleFill}>
              <Icon name={iconName} fill={iconFill} />
            </CircleContainer>
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin: -20px 10px 10px 0px;
            `}
          >
            <Typography
              css={css`
                margin-bottom: 10px;
              `}
              variant={'subtitle'}
              as="h2"
            >
              {title}
            </Typography>
            <Typography
              variant={'data'}
              color={theme.colors.black}
              as="h3"
              css={css`
                margin: 0px;
              `}
            >
              {bodyText}
            </Typography>
          </div>

          <Icon name="chevron_right" fill="primary_2" width="18px" height="18px" />
        </BoxLinkContainer>
      </Container>
    </Link>
  );
};

export const OvertureBanner: React.ComponentType<{}> = ({}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        padding: 20px 12%;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        border-top: 1px solid ${theme.colors.grey_2};
        background-color: ${theme.colors.grey_4};
      `}
    >
      <Link
        href="https://www.overture.bio/"
        target="_blank"
        css={css`
          padding-top: 4px;
        `}
      >
        <img
          alt="Ontario Institute for Cancer Research"
          src={overtureLogo}
          style={{ height: '24px', width: '124px' }}
        />
      </Link>
      <Typography
        color={theme.colors.grey}
        variant="data"
        css={css`
          margin-left: 20px;
        `}
      >
        The ARGO Data Platform is built with open-source products that you can incorporate into your
        systems though{' '}
        <Link href="https://www.overture.bio/" target="_blank">
          Overture.bio
        </Link>
        .
      </Typography>
    </div>
  );
};
