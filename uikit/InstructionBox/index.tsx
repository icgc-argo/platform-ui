import * as React from 'react';
import { Col, Row, ScreenClassRender } from 'react-grid-system';
import { css } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import styled from '@emotion/styled-base';

const InstructionBox = ({
  steps,
  footer,
}: {
  steps: Array<React.ReactNode>;
  footer?: React.ReactNode;
}) => {
  const theme = useTheme();
  const InstructionStep = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    padding-bottom: 10px;
    padding-top: 12px;
    height: 100%;
  `;
  const stepStyle = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    !['xs', 'sm', 'md'].includes(size)
      ? css`
          border-bottom: solid 1px ${!!footer ? theme.colors.grey_2 : 'none'};
          &:not(:first-of-type) {
            border-left: solid 1px ${theme.colors.grey_2};
          }
        `
      : css`
          border-bottom: solid 1px ${theme.colors.grey_2};
        `;
  return (
    <ScreenClassRender
      render={size => (
        <Col>
          <Row nogutter>
            {steps.map((step, i) => (
              <Col md={12} lg={12 / steps.length} css={stepStyle(size)} key={i}>
                <InstructionStep>{step}</InstructionStep>
              </Col>
            ))}
          </Row>
          {footer && <Row nogutter>{footer}</Row>}
        </Col>
      )}
    />
  );
};

export default InstructionBox;
