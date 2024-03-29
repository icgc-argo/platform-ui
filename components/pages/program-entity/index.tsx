/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { ContentBody, ContentHeader, PageBody, PageContainer, PageContent } from '@icgc-argo/uikit';

import Footer from '../../Footer';
import NavBar from '../../NavBar';
import Head from '../head';

import clsx from 'clsx';
import ProgramCardsLayout from './ProgramCardsLayout';
import { ProgramTitleBar } from './ProgramTitleBar';

import PROGRAM_SUMMARY_QUERY from './gql/PROGRAM_SUMMARY_QUERY';
import { useQuery } from '@apollo/client';

const ProgramEntity = ({ programId }: { programId: string }) => {
  const { data: { program = null } = {}, loading } = useQuery(PROGRAM_SUMMARY_QUERY, {
    variables: { shortName: programId },
  });

  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          <ContentHeader>
            <ProgramTitleBar programId={programId} />
          </ContentHeader>
          <ContentBody>
            <ProgramCardsLayout
              programSummaryQuery={loading ? [] : program}
              programId={programId}
              loading={loading}
            />
          </ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default ProgramEntity;
