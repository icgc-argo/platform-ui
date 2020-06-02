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
import Tabs, { Tab } from '.';
import Typography from '../Typography';
import { action } from '@storybook/addon-actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// forwardRef is used to display the source in storybook
const SimpleTabs = React.forwardRef(() => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    action('tab foucs changed')(event, newValue);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="0" label="Item One" />
        <Tab value="1" label="Item Two" />
        <Tab value="2" label="Item Three" />
        <Tab empty style={{ flexDirection: 'row-reverse' }}>
          <button>Child of empty tab</button>
        </Tab>
      </Tabs>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  );
});

const TabsStories = storiesOf(`${__dirname}`, module).add('Basic', () => <SimpleTabs />);

export default TabsStories;
