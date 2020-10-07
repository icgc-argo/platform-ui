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
import { ContentHeader, ContentBody } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import ApiTokenBox from './ApiTokenBox';
import ProgramAccessBox from './ProgramAccessBox';
import ProfileBox from './ProfileBox';
import PROFILE from './gql/PROFILE.gql';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { ProfileQueryData } from './types';
import Head from 'components/pages/head';

const Column = (props) => (
  <Col
    style={{
      padding: 10,
    }}
    {...props}
  />
);

export function UserPage() {
  const { data, loading } = useQuery<ProfileQueryData>(PROFILE, { variables: {} });
  const isDacoApproved = get(data, ['self', 'isDacoApproved']);
  const apiToken = get(data, ['self', 'apiKey']);
  const programs = get(data, 'programs');

  return (
    <DefaultLayout>
      <Head subtitle="Profile"></Head>
      <ContentHeader>
        <Typography variant="title" color="primary" as="h1">
          Profile & Tokens
        </Typography>
      </ContentHeader>
      <ContentBody
        css={css`
          padding: 10px;
        `}
      >
        <Row nogutter>
          <Column>
            <ProfileBox />
          </Column>
        </Row>
        <Row nogutter>
          <Column sm={12} md={6}>
            <ApiTokenBox apiToken={apiToken} loading={loading} />
          </Column>
          <Column sm={12} md={6}>
            <ProgramAccessBox
              isDacoApproved={isDacoApproved}
              readablePrograms={programs}
              loading={loading}
            />
          </Column>
        </Row>
      </ContentBody>
    </DefaultLayout>
  );
}
