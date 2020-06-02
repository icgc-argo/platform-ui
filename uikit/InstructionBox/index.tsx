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
