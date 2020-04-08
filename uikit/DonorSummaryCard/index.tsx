import Container from 'uikit/Container';
import { css, keyframes } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import PercentBar from 'uikit/PercentBar';
import Pipe from 'uikit/Pipe';
import _ from 'lodash';

enum PIPELINE_STATUS {
  COMPLETE = 'complete',
  IN_PROGRESS = 'inProgress',
  ERROR = 'error',
}

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: space-between;
`;

const Statistic: React.ComponentType<{ quantity: String; description: String }> = ({
  children,
  quantity,
  description,
}) => (
  <div>
    <StatDesc>
      {/* Div for Quantity */}
      <Row align="center" nogutter>
        <Col xs={6}>
          <Typography
            variant="title"
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
              text-align: center;
            `}
          >
            {quantity}
          </Typography>
        </Col>
        {/* Div for Description */}
        <Col xs={6}>
          <Typography color="grey" variant="caption">
            {description}
          </Typography>
        </Col>
      </Row>
      <Row nogutter>{children}</Row>
    </StatDesc>
  </div>
);

const Pipeline = (stats: Record<PIPELINE_STATUS, number>) => {
  const theme = useTheme();

  const getBackgroundColour = (state: keyof Record<PIPELINE_STATUS, number>) => {
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
    <Pipe.Item key={stat} fill={getBackgroundColour(stat as keyof Record<PIPELINE_STATUS, number>)}>
      {stats[stat]}
    </Pipe.Item>
  ));
  return <Pipe>{pipeStats}</Pipe>;
};

const FilesButton: React.ComponentType<{ quantity: String }> = ({ children, quantity }) => (
  <div>
    <StatDesc>
      {/* Div for Quantity */}
      <Row align="center" nogutter>
        <Col xs={1}>
          <Typography
            variant="title"
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
              text-align: center;
            `}
          >
            {quantity}
          </Typography>
        </Col>
        {/* Div for Children*/}
        <Col xs={11}>{children}</Col>
      </Row>
    </StatDesc>
  </div>
);

const Designation: React.ComponentType<{
  description: String;
  left: number;
  right: number;
  validity?: boolean[];
}> = ({ description, left, right, validity = [true, true] }) => (
  <div>
    <StatDesc>
      {/* Div for Quantity */}
      <Row
        justify="center"
        align="center"
        css={css`
          min-width: 160px;
        `}
      >
        <Col xs={7.5}>
          <Row
            justify="center"
            align="center"
            css={css`
              min-width: 100px;
            `}
          >
            <Col
              xs={5}
              css={css`
                min-width: 50px;
              `}
            >
              <Typography
                variant="title"
                color={validity[0] ? 'black' : 'error'}
                css={css`
                  margin-top: 10px;
                  margin-bottom: 10px;
                  text-align: center;
                `}
              >
                {left}N
              </Typography>
            </Col>
            <div
              css={css`
                margin-top: 10px;
                margin-bottom: 10px;
                background: grey;
                height: 25px;
                width: 1px;
              `}
            />
            <Col
              xs={5}
              css={css`
                min-width: 50px;
              `}
            >
              <Typography
                variant="title"
                color={validity[1] ? 'black' : 'error'}
                css={css`
                  margin-top: 10px;
                  margin-bottom: 10px;
                  text-align: center;
                `}
              >
                {right}T
              </Typography>
            </Col>
          </Row>
        </Col>
        {/* Div for Description */}
        <Col xs={4.5}>
          <Typography color="grey" variant="caption">
            {description}
          </Typography>
        </Col>
      </Row>
    </StatDesc>
  </div>
);

export default () => {
  return (
    <div>
      <Container
        css={css`
          padding: 10px;
        `}
      >
        <Row>
          <Col xl={2.4} lg={4} md={12}>
            <Designation
              description="Registered Samples"
              left={2}
              right={3}
              validity={[true, false]}
            />
          </Col>
          <Col xl={2.4} lg={4} md={6}>
            <Statistic quantity="100%" description="Core Clinical Data">
              <PercentBar num={100} den={100} length={150} fillColor="success" />
            </Statistic>
          </Col>
          <Col xl={2.4} lg={4} md={6}>
            <Statistic quantity="29%" description="Extended Data">
              <PercentBar num={29} den={100} length={150} fillColor="warning" />
            </Statistic>
          </Col>
          <Col xl={2.4} lg={4} md={6}>
            <FilesButton quantity="0">
              <Button
                variant="text"
                disabled
                size="sm"
                css={css`
                  margin-left: 5px;
                `}
              >
                <Icon
                  css={css`
                    padding-right: 4px;
                  `}
                  name="download"
                  fill="grey_2"
                  height="12px"
                />
                Files to QC
              </Button>
            </FilesButton>
          </Col>
          <Col xl={2.4} lg={4} md={6}>
            <FilesButton quantity="0">
              <Button
                variant="text"
                disabled
                size="sm"
                css={css`
                  margin-left: 5px;
                `}
              >
                <Icon
                  css={css`
                    padding-right: 4px;
                  `}
                  name="download"
                  fill="grey_2"
                  height="12px"
                />
                Released Files
              </Button>
            </FilesButton>
          </Col>
          <Col xl={2.4} lg={4} md={12}>
            <Designation description="Raw Reads Submitted" left={3} right={4} />
          </Col>
          <Col
            xl={4.8}
            lg={8}
            md={12}
            css={css`
              align-self: center;
              padding-right: 10px;
            `}
          >
            <Row
              css={css`
                align-items: center;
              `}
            >
              <Col
                md={2}
                css={css`
                  align-self: center;
                  text-align: center;
                `}
              >
                <Typography color="grey" variant="caption">
                  Alignment
                </Typography>
              </Col>
              <Col
                md={3}
                css={css`
                  align-self: center;
                `}
              >
                <Pipeline complete={3} inProgress={2} error={4} />
              </Col>
              <Col
                md={2}
                css={css`
                  align-self: center;
                  text-align: center;
                  white-space: nowrap;
                  padding-top: 3px;
                `}
              >
                <Icon
                  css={css`
                    margin-right: -6px;
                  `}
                  name="dash"
                  fill="grey_2"
                  height="15px"
                />
                <Icon name="dash" fill="grey_2" height="15px" />
                <Icon
                  css={css`
                    margin-left: -12px;
                  `}
                  name="chevron_right"
                  fill="grey_2"
                  height="15px"
                />
              </Col>
              <Col
                md={2}
                css={css`
                  align-self: center;
                  text-align: center;
                `}
              >
                <Typography color="grey" variant="caption">
                  Variant Calling
                </Typography>
              </Col>
              <Col
                md={3}
                css={css`
                  align-self: center;
                `}
              >
                <Pipeline complete={3} inProgress={0} error={0} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
