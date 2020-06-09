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
import DefaultLayout from '../DefaultLayout';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import useAuthContext from 'global/hooks/useAuthContext';
import useTheme from 'uikit/utils/useTheme';
import { Box } from './common';

const UserInitialImage = ({ contentText = '' }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: relative;
        width: 100px;
        height: 100px;
        background: url('static/initials-large.svg');
        pointer-events: none;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          background: ${theme.colors.accent1_3};
          color: ${theme.colors.accent1_dark};
          font-size: 25px;
          border-radius: 1000px;
          height: 50px;
          width: 50px;
          margin-left: -26px;
          margin-top: -27px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {contentText}
      </div>
    </div>
  );
};

export default function ProfileBox() {
  const { data: userModel } = useAuthContext();

  return (
    <Box title="Profile" iconName="user">
      <Row nogutter>
        <Col sm={12} md={2}>
          <div
            css={css`
              margin-top: 10px;
            `}
          >
            <UserInitialImage
              contentText={
                userModel &&
                `${userModel.context.user.firstName[0]}${userModel.context.user.lastName[0]}`
              }
            />
          </div>
        </Col>
        <Col sm={12} md={5}>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Name
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">
                {userModel && userModel.context.user.firstName}{' '}
                {userModel && userModel.context.user.lastName}
              </Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Email Address
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">
                {userModel && userModel.context.user.email}
              </Typography>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={5}>
          {
            // Not implemented until persona is available
            /* <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Institution
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                PI Name
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Department
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row> */
          }
        </Col>
      </Row>
    </Box>
  );
}
