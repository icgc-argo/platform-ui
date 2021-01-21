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

import AppBar, {
  Logo,
  MenuGroup,
  MenuItem,
  Section,
  UserBadge,
  DropdownMenu,
  DropdownMenuItem,
  NavBarElement,
} from '.';

// to simulate nextjs link or any other framework that needs to wrap href
const CustomLink = ({ children, ...props }) => <div {...props}>{children}</div>;

const AppBarStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const LinkToHome = (props) => (
      <a style={{ cursor: 'pointer' }} {...props} onClick={() => action('fake navigate')('/')} />
    );

    const LinkToExploration = (props) => (
      <a {...props} onClick={() => action('fake navigate')('/exploration')} />
    );

    const LinkToAnalysis = (props) => (
      <a {...props} onClick={() => action('fake navigate')('/analysis')} />
    );

    const LinkToFileRepo = (props) => (
      <a {...props} onClick={() => action('fake navigate')('/file_repo')} />
    );

    const LinkToSubmission = (props) => (
      <a {...props} onClick={() => action('fake navigate')('/submission')} />
    );

    const UserBadgeDom = (props) => <a {...props} onClick={action('user badge clicked')} />;

    return (
      <AppBar>
        <Section>
          <Logo DomComponent={LinkToHome} />
          <MenuGroup>
            <MenuItem DomComponent={LinkToExploration}>Exploration</MenuItem>
            <MenuItem DomComponent={LinkToAnalysis}>Analysis</MenuItem>
            <MenuItem DomComponent={LinkToFileRepo} active>
              File Repository
            </MenuItem>
          </MenuGroup>
        </Section>
        <Section />
        <Section>
          <MenuGroup>
            <MenuItem DomComponent={LinkToSubmission} active>
              Submission System
            </MenuItem>
            <MenuItem
              DomComponent={UserBadgeDom}
              dropdownMenu={
                <DropdownMenu>
                  <DropdownMenuItem active>Profile & Tokens</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenu>
              }
            >
              <UserBadge firstName="Harvey" lastName="Specter" title="DCC Member" />
            </MenuItem>
          </MenuGroup>
        </Section>
      </AppBar>
    );
  })
  .add('NavBarElement', () => (
    <NavBarElement name="custom link comp" href="www.google.ca" LinkComp={CustomLink} active />
  ));

export default AppBarStories;
