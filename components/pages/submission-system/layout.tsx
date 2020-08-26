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

import clsx from 'clsx';
import NavBar from 'components/NavBar';
import usePersistentState from 'global/hooks/usePersistentContext';
import debounce from 'lodash/debounce';
import hasIn from 'lodash/hasIn';
import * as React from 'react';
import {
  Collapsible,
  ContentBody,
  ContentHeader,
  PageBody,
  PageContainer,
  PageContent,
  Panel,
  Sidebar,
} from 'uikit/PageLayout';
import Footer from '../../Footer';
import Head from '../head';
import SideMenu from './SideMenu';

const SubmissionLayout = ({
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
  ContentHeaderComponent = ContentHeader,
}: {
  noSidebar?: boolean;
  sideMenu?: React.ReactNode | React.ReactNodeArray;
  contentHeader?: React.ReactNode | React.ReactNodeArray;
  children: React.ReactNode | React.ReactNodeArray;
  subtitle?: string;
  ContentHeaderComponent?: typeof ContentHeader;
}) => {
  const [sidemenuScrollTop, setSidemenuScrollTop] = usePersistentState('sidemenuScrollTop', 0);
  const panelRef = React.useRef(null);

  const setScroll = debounce(setSidemenuScrollTop, 100);

  const handleSidemenuScroll = (e: any) => {
    setScroll(e.target.scrollTop);
  };

  // Only run on client side, don't run on server side
  if (hasIn(process, 'browser')) {
    React.useLayoutEffect(() => {
      if (panelRef.current) {
        panelRef.current.scrollTop = sidemenuScrollTop;
      }
    }, []);
  }

  return (
    <PageContainer>
      <Head subtitle={subtitle} />
      <NavBar />
      <PageBody className={clsx({ noSidebar })}>
        {!noSidebar && (
          <Sidebar>
            <Panel ref={panelRef} onScroll={handleSidemenuScroll}>
              {sideMenu}
            </Panel>
            <Collapsible />
          </Sidebar>
        )}
        <PageContent>
          {contentHeader && <ContentHeaderComponent>{contentHeader}</ContentHeaderComponent>}
          <ContentBody>{children}</ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default SubmissionLayout;

export function MinimalLayout({ children }) {
  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar hideLinks />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          <ContentBody>{children}</ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
}
