import Container from 'uikit/Container';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import styled from '@emotion/styled-base';
import Typography from 'uikit/Typography';

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Statistic: React.ComponentType<{ quantity: String; description: String }> = ({
  quantity,
  description,
}) => (
  <StatDesc>
    <div
      css={css`
        height: 32px;
        width: 144px;
        padding-bottom: 20px;
      `}
    >
      <Typography variant="title">{quantity}</Typography>
    </div>
    <div>
      <Typography variant="caption">{description}</Typography>
    </div>
  </StatDesc>
);

export default () => (
  <Container>
    <Row>
      <Col>
        <Statistic quantity="0" description="Registered Donors" />
      </Col>
      <Col>
        <Statistic quantity="0%" description="Donors with all Core Clinical Data" />
      </Col>
      <Col>
        <Statistic quantity="0%" description="Donors with Tumour & Normal" />
      </Col>
      <Col>
        <Statistic quantity="0" description="Donors in Molecular Data Processing" />
      </Col>
      <Col>
        <Statistic quantity="0" description="Files to QC" />
      </Col>
      <Col>
        <Statistic quantity="0" description="Donors with Released Files" />
      </Col>
      <Col>
        <Statistic quantity="0" description="All Files" />
      </Col>
    </Row>
  </Container>
);
