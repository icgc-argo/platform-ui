// @flow
import * as React from 'react';
import { Col, Row, ScreenClassRender } from 'react-grid-system';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import styled from '@emotion/styled-base';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import HyperLink from 'uikit/Link';
import Link from 'next/link';
import Icon from 'uikit/Icon';
import { CONTACT_PAGE_PATH } from 'global/constants/pages';

const InstructionBox = ({ steps, footer }: { steps: Array<React.Node>, footer?: React.Node }) => {
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
    height: 100%;
  `;
  const smallScreenRowStyle = css``;
  const rowStyle = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    ['xs'].includes(size)
      ? css`
          & > :not(:first-child) {
            border-left: solid 1px ${theme.colors.grey_2};
          }
        `
      : css``;
  const footerStyle = css`
    border-top: solid 1px ${theme.colors.grey_2};
  `;
  return (
    <ScreenClassRender
      render={size => (
        <Col>
          <Row nogutter css={rowStyle}>
            {steps.map(step => (
              <Col xs={12} sm={12 / steps.length}>
                <InstructionStep>{step}</InstructionStep>
              </Col>
            ))}
          </Row>
          {footer && (
            <Row nogutter css={footerStyle}>
              {footer}
            </Row>
          )}
        </Col>
      )}
    />
  );
};

export default InstructionBox;
