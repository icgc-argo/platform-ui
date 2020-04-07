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
import { StatArea as StatAreaDisplay } from '../../common';
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
  text-align: center;
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
        <Col md={6}>
          <Typography
            variant="title"
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
            `}
          >
            {quantity}
          </Typography>
        </Col>
        {/* Div for Description */}
        <Col md={6}>
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
        <Col md={2}>
          <Typography
            variant="title"
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
            `}
          >
            {quantity}
          </Typography>
        </Col>
        {/* Div for Children*/}
        <Col md={10}>{children}</Col>
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
        <Col xl={7.5}>
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
                `}
              >
                {right}T
              </Typography>
            </Col>
          </Row>
        </Col>
        {/* Div for Description */}
        <Col xl={4.5}>
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
          <Col lg={2.5}>
            <Designation
              description="Registered Samples"
              left={2}
              right={3}
              validity={[true, false]}
            />
          </Col>
          <Col lg={3}>
            <Statistic quantity="100%" description="Core Clinical Data Completeness">
              <PercentBar num={100} den={100} length={170} fillColor="success" />
            </Statistic>
          </Col>
          <Col lg={3}>
            <Statistic quantity="29%" description="Extended Data Completeness">
              <PercentBar num={29} den={100} length={170} fillColor="warning" />
            </Statistic>
          </Col>
          <Col lg={1.75}>
            <FilesButton quantity="0">
              <Button variant="text" disabled>
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
          <Col lg={1.75}>
            <FilesButton quantity="0">
              <Button
                variant="text"
                disabled
                css={css`
                  margin: 0;
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
        </Row>
        <Row justify="around">
          <Col lg={2.5}>
            <Designation description="Raw Reads Submitted" left={3} right={4} />
          </Col>
          <Col lg={6}>
            <Row
              css={css`
                text-align: center;
              `}
            >
              <Col md={2.4}>
                <Typography color="grey" variant="caption">
                  Alignment
                </Typography>
              </Col>
              <Col md={2.4}>
                <Pipeline complete={3} inProgress={2} error={4} />
              </Col>
              <Col md={2.4}>
                <Typography color="grey" variant="caption">
                  arrow
                </Typography>
              </Col>
              <Col md={2.4}>
                <Typography color="grey" variant="caption">
                  Variant Calling
                </Typography>
              </Col>
              <Col md={2.4}>
                <Pipeline complete={3} inProgress={2} error={4} />
              </Col>
            </Row>
          </Col>
          <Col lg={3.5} />
        </Row>
      </Container>
    </div>
  );
};
