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

import Container from 'uikit/Container';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import PercentBar from 'uikit/PercentBar';
import _ from 'lodash';
import { Pipeline } from '../../common';

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
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
              text-align: start;
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
      <Row align="center" nogutter>
        <Col xs={6}>
          <Typography
            variant="title"
            color={validity[0] ? 'black' : 'error'}
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
              padding-right: 5px;
            `}
            as="span"
          >
            {left}N
          </Typography>
          <Typography
            variant="title"
            color={validity[1] ? 'black' : 'error'}
            css={css`
              margin-top: 10px;
              margin-bottom: 10px;
              padding-left: 5px;
              border-left: 1px solid grey;
            `}
            as="span"
          >
            {right}T
          </Typography>
        </Col>
        {/* Div for Description */}
        <Col xs={6}>
          <Typography color="grey" variant="caption" as="span">
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
          padding-left: 20px;
        `}
      >
        <Row>
          <Col xl={2.4} lg={3} md={4} sm={6}>
            <Designation
              description="Registered Samples"
              left={2}
              right={3}
              validity={[true, false]}
            />
          </Col>
          <Col xl={2.4} lg={3} md={4} sm={6}>
            <Statistic quantity="100%" description="Core Clinical Data Completeness">
              <PercentBar num={100} den={100} length={200} fillColor="success" />
            </Statistic>
          </Col>
          <Col xl={2.4} lg={3} md={4} sm={6}>
            <Statistic quantity="29%" description="Extended Data Conpleteness">
              <PercentBar num={29} den={100} length={200} fillColor="warning" />
            </Statistic>
          </Col>
          <Col xl={2.4} lg={3} md={4} sm={6}>
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
          <Col xl={2.4} lg={3} md={4} sm={6}>
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
          <Col xl={2.4} lg={3} md={4} sm={6}>
            <Designation description="Submitted Raw Reads" left={3} right={4} />
          </Col>
          <Col
            xl={4.8}
            lg={6}
            md={12}
            sm={12}
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
                xs={2}
                css={css`
                  align-self: center;
                  text-align: center;
                `}
              >
                <Typography color="grey" variant="caption" as="span">
                  Alignment
                </Typography>
              </Col>
              <Col
                xs={3}
                css={css`
                  align-self: center;
                `}
              >
                <Pipeline complete={3} inProgress={2} error={4} />
              </Col>
              <Col
                xs={1}
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
                xs={2}
                css={css`
                  align-self: center;
                  text-align: center;
                `}
              >
                <Typography color="grey" variant="caption" as="span">
                  Variant Calling
                </Typography>
              </Col>
              <Col
                xs={3}
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
