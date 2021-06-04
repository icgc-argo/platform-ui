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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { css } from '@emotion/core';
import VerticalTabs from '.';

const LoremTooltip = (
  <>
    <p>Lorem Ipsum dolor:</p>
    <ul
      css={css`
        padding-left: 15px;
      `}
    >
      <li>palo santo</li>
      <li>kombucha</li>
    </ul>
  </>
);

const VerticalTabsStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [activeItem, setActiveItem] = React.useState(0);
  const onClick = (num: number) => (e) => {
    setActiveItem(num);
    action('VerticalTabs.Item onClick')(e);
  };
  return (
    <div style={{ width: '50%' }}>
      <VerticalTabs>
        <VerticalTabs.Item tooltip="Donor" onClick={onClick(0)} active={activeItem === 0}>
          Donor
          <VerticalTabs.Tag variant="UPDATE">12</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item tooltip="Specimen" onClick={onClick(1)} active={activeItem === 1}>
          Specimen
          <br />
          larger tab
          <br />
          content
          <VerticalTabs.Tag variant="WARNING">23</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item onClick={onClick(2)} active={activeItem === 2}>
          Donor
          <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item disabled onClick={onClick(3)} active={activeItem === 3}>
          Donor
          <VerticalTabs.Tag variant="SUCCESS">45</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item tooltip={LoremTooltip} onClick={onClick(4)} active={activeItem === 4}>
          Lorem ipsum dolor amet palo santo kombucha
          <VerticalTabs.Tag variant="SUCCESS">45</VerticalTabs.Tag>
        </VerticalTabs.Item>
      </VerticalTabs>
    </div>
  );
});

export default VerticalTabsStories;
