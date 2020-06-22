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

import { storiesOf } from '@storybook/react';
import React from 'react';
import { select } from '@storybook/addon-knobs';
import { Container, Row, Col } from 'react-grid-system';
import defaultTheme from '../theme/defaultTheme';

import Typography from '../Typography';
import icons, { UikitIconNames } from './icons';
import Icon from '.';

const createKnobs = () => {
  const fill = select('fill', [null, '#00f', ...Object.keys(defaultTheme.colors)], null);
  return {
    fill,
  };
};

const IconStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const name = select('name', Object.keys(icons) as UikitIconNames[], 'spinner');
    const { fill } = createKnobs();
    return (
      <div>
        <Icon name={name} fill={fill} />
      </div>
    );
  })
  .add('All Icons', () => {
    const { fill } = createKnobs();
    const IconStoryDisplay = ({ iconName }) => (
      <Col md={2}>
        <div
          style={{
            borderRadius: '10px',
            height: '100%',
            boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          <Typography>{iconName}</Typography>
          <div style={{ flex: 1 }}>
            <Icon name={iconName} fill={fill} />
          </div>
        </div>
      </Col>
    );
    return (
      <Row nogutter>
        {Object.keys(icons).map((iconName) => (
          <IconStoryDisplay iconName={iconName} />
        ))}
      </Row>
    );
  });

export default IconStories;
