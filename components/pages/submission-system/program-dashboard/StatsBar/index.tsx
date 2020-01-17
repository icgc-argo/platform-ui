import Container from 'uikit/Container';
import { css, keyframes } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
  justify-content: space-between;
`;

const PercentBar: React.ComponentType<{ num: number; den: number; fillColor?: string }> = ({
  num,
  den,
  fillColor,
}) => {
  const theme = useTheme();

  // Negative Numbers should be zero, percentages over 100 should be capped
  num < 0 ? (num = 0) : { num };
  const fraction = Math.min((num / den) * 100, 100);
  const fill_amount = `${fraction}%`;

  // Animation
  const grow = keyframes`
    0% {
      width: 0%;
    }

    100% {
      width: ${fill_amount};
    }
   `;

  return (
    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.grey_2};
          border-radius: 8px;
          width: 120px;
        `}
      >
        <div
          css={css`
            background-color: ${theme.colors[fillColor] || fillColor || theme.colors.secondary};
            width: ${fill_amount};
            height: 6px;
            border-radius: 8px;
            animation-name: ${grow};
            animation-duration: 1s;
            transition: width 2s ease-in-out;
          `}
        />
      </div>
    </div>
  );
};

const Statistic: React.ComponentType<{ quantity: String; description: String }> = ({
  children,
  quantity,
  description,
}) => (
  <StatDesc>
    {/* Div for Quantity */}
    <div>
      <div
        css={css`
          height: 4vh;
          padding-bottom: 4px;
        `}
      >
        <Typography variant="title">{quantity}</Typography>
      </div>
      {/* Div for Description */}
      <div
        css={css`
          padding-bottom: 8px;
          min-width: 120px;
        `}
      >
        <Typography color="grey" variant="caption">
          {description}
        </Typography>
      </div>
    </div>

    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      {children}
    </div>
  </StatDesc>
);

export default () => (
  <div>
    <Container>
      <Row justify="around">
        <Col>
          <Statistic quantity="0" description="Registered Donors">
            <PercentBar num={0} den={100} fillColor="warning" />
          </Statistic>
        </Col>
        <Col>
          <Statistic quantity="0%" description="Donors with all Core Clinical Data">
            <PercentBar num={0} den={100} fillColor="warning" />
          </Statistic>
        </Col>
        <Col>
          <Statistic quantity="0%" description="Donors with Tumour & Normal">
            <PercentBar num={0} den={100} fillColor="warning" />
          </Statistic>
        </Col>
        <Col>
          <Statistic quantity="0" description="Donors in Molecular Data Processing" />
        </Col>
        <Col>
          <Statistic quantity="0" description="Files to QC">
            <Button variant="text" disabled>
              <Icon
                css={css`
                  padding-right: 4px;
                `}
                name="download"
                fill="grey_2"
                height="12px"
              />
              Manifest
            </Button>
          </Statistic>
        </Col>
        <Col>
          <Statistic quantity="0" description="Donors with Released Files">
            <PercentBar num={0} den={2000} />
          </Statistic>
        </Col>
        <Col>
          <Statistic quantity="0" description="All Files">
            <Button variant="text" disabled>
              <Icon
                css={css`
                  padding-right: 4px;
                `}
                name="download"
                fill="grey_2"
                height="12px"
              />
              Manifest
            </Button>
          </Statistic>
        </Col>
      </Row>
    </Container>
  </div>
);
