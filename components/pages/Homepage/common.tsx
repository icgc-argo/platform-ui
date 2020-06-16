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
import scientistImage from 'static/icgc-data-scientist-wide.jpg';
import DnaLoader from 'uikit/DnaLoader';

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
  loading: boolean;
}> = ({ stats, version, loading }) => {
  const theme = useTheme();
  const formattedStats = stats.map((stat) => (
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
        <div
          css={css`
            margin: 25px 0px 5px;
          `}
        >
          <Typography as="span" color={theme.colors.white} variant={'hero'} bold={true}>
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
  return loading ? (
    <DnaLoader
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
      `}
    />
  ) : (
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
        <Row nogutter justify={'center'}>
          {formattedStats}
        </Row>
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
        <Typography as="p">{children}</Typography>
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
    `linear-gradient(to left, ${theme.colors.accent3_2} 0%, ${theme.colors.accent1_1} 47%, ${theme.colors.accent3_dark} 100%)`};

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
        <Col
          md={4}
          sm={12}
          css={css`
            background-color: rgba(21, 28, 61, 1);
          `}
        >
          <div
            css={css`
              background-image: linear-gradient(
                  to bottom,
                  rgba(21, 28, 61, 0.33),
                  rgba(21, 28, 61, 0.33) 66%,
                  rgba(21, 28, 61, 1) 100%
                ),
                url(${scientistImage});
              background-size: cover;
              width: 100%;
              min-height: 210px;
              max-height: 350px;
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
                variant="paragraph"
                css={css`
                  padding-bottom: 15px;
                  border-bottom: 1px solid ${theme.colors.grey_2};
                `}
              >
                {item}
              </Typography>
            ))}
            <Typography variant="paragraph">
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
  padding: 10px 15px;
  display: grid;
  grid-template-columns: 1.5fr 9fr 0.8fr;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;

// source: https://www.npmjs.com/package/react-grid-system#configuration
export const reactGridBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const ResponsiveGridLayout = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  @media (min-width: ${reactGridBreakpoints.lg}px) {
    grid-template-columns: repeat(3, 1fr);
  }
  grid-gap: 1rem;
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
          height: 100%;
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
              as="p"
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
        padding: 10px 12%;
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
