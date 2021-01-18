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
import { action } from '@storybook/addon-actions';
import React from 'react';

import SubMenu from '.';
import Button from '../Button';
import Hook from '../utils/Hook';
import Icon from '../Icon';

import readme from './readme.md';

const RightComp = () => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      action('clicked right component')();
    }}
  >
    Right
  </div>
);

const SubMenuStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => (
    <SubMenu>
      <SubMenu.Item
        icon={<Icon name="dashboard" />}
        content={'DCC Dashboard'}
        selected={false}
        onClick={action('clicked')}
      />
      <SubMenu.Item
        icon={<Icon name="rdpc" />}
        content="RDPCs"
        selected={false}
        onClick={action('clicked')}
      />
      <SubMenu.Item
        icon={<Icon name="rdpc" />}
        content="With Right Aligned Custom Component"
        selected={false}
        onClick={action('clicked')}
        RightSideComp={<RightComp />}
      />
      <SubMenu.Item icon={<Icon name="programs" />} content="Programs" selected>
        <SubMenu.Item
          level={1}
          selected={false}
          onClick={action('clicked')}
          content={"I'm nested in Programs but look like I'm not :D "}
        />
        <SubMenu.Item content="BRCA-MX" selected={false} onClick={action('clicked')} />
        <SubMenu.Item
          content={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              PACA-AU{' '}
              <Button onClick={() => {}} size="sm">
                Click me!! I'm not controlled
              </Button>
            </span>
          }
        >
          <Hook
            initialState={0}
            render={([selectedItem, setSelectedItem]) => (
              <>
                <SubMenu.Item
                  onClick={() => setSelectedItem(0)}
                  content="Dashboard"
                  selected={selectedItem === 0}
                />
                <SubMenu.Item
                  onClick={() => setSelectedItem(1)}
                  selected={selectedItem === 1}
                  content={'ID Registration'}
                />
                <SubMenu.Item
                  onClick={() => setSelectedItem(2)}
                  selected={selectedItem === 2}
                  content="Clinical Submission"
                />
              </>
            )}
          />
        </SubMenu.Item>
      </SubMenu.Item>
    </SubMenu>
  ),
  {
    info: {
      text: `${readme}`,
    },
  },
);

export default SubMenuStories;
