/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { Button, css, Icon, Link, styled, Typography, useTheme } from '@icgc-argo/uikit';

import { Col, Hidden, Row, Visible } from 'react-grid-system';

import DefaultLayout from '../DefaultLayout';

import NextLink from 'next/link';

import Head from 'components/pages/head';
import {
  DOCS_DATA_ACCESS_PAGE,
  DOCS_DATA_DOWNLOAD_PAGE,
  DOCS_DATA_RELEASES_PAGE,
  DOCS_DNA_PIPELINE_PAGE,
  DOCS_PROGRAMMATIC_APIS_PAGE,
  DOCS_PUBLICATION_GUIDELINE_PAGE,
  DOCS_SUBMISSION_OVERVIEW_PAGE,
} from 'global/constants/docSitePaths';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import { useFileRepoStatsBarQuery } from '../file-repository/StatsCard';
import {
  DataCallout,
  DataReleaseBar,
  NewsContainer,
  NewsItem,
  OvertureBanner,
  ResourceBox,
  ResponsiveGridLayout,
} from './common';
import { ComponentType } from 'react';

const newsItems: NewsItem[] = [
  {
    title: 'August 25, 2023',
    text: (
      <>
        We are excited to announce{' '}
        <Link target="_blank" href="https://docs.icgc-argo.org/dictionary">
          Dictionary 1.18{' '}
        </Link>{' '}
        is now available.
      </>
    ),
  },
  {
    title: 'June 8, 2023',
    text: (
      <>
        We are thrilled to announce the release of Clinical Exceptions, a new features that allows
        programs to request program and entity level data exceptions. When enabled, clinical
        exceptions will significantly accelerate the clinical data submission process.
        <br />
        <br />
        Another new feature is also available on our platform: The Program Entity Page. Accessible
        from the File Repository, this page presents a summary of the programs, offering a
        high-level overview of donor and file statistics.
      </>
    ),
  },
  {
    title: 'May 3, 2023',
    text: (
      <>
        We are excited to announce that a new feature is now available on our platform: the{' '}
        <Link
          target="_blank"
          href="https://docs.icgc-argo.org/docs/submission/viewing-clinical-data"
        >
          Submitted Data Page.
        </Link>
      </>
    ),
  },
  {
    title: 'April 5, 2023',
    text: (
      <>
        We are excited to announce{' '}
        <Link
          target="_blank"
          href="https://docs.icgc-argo.org/docs/release-notes/data-releases#data-release-60"
        >
          Data Release 6.0
        </Link>{' '}
        on the ICGC ARGO Data Platform, including the first release of a new RNA-Seq analysis
        workflow:{' '}
        <Link
          target="_blank"
          href="https://docs.icgc-argo.org/docs/analysis-workflows/rna-alignment"
        >
          RNA Seq Alignment
        </Link>
        , available now for transcriptome sequencing data from Australian Pancreatic Cancer
        Initiative (APGI-AU).
      </>
    ),
  },
  {
    title: '',
    text: (
      <>
        <Link
          target="_blank"
          href="https://docs.icgc-argo.org/docs/release-notes/dictionary-releases"
        >
          ARGO Data Dictionary 1.18
        </Link>
        ,{' '}
        <Link target="_blank" href="https://docs.icgc-argo.org/docs/release-notes/data-releases">
          Data Release 6.0
        </Link>
        , and{' '}
        <Link
          target="_blank"
          href="https://docs.icgc-argo.org/docs/release-notes/software-releases"
        >
          Software Release UI 1.124.1 - API 3.40.0
        </Link>{' '}
        are now available.
      </>
    ),
  },
];

const SeparationLine: ComponentType<{}> = () => {
  const theme = useTheme();
  return (
    <>
      <Hidden sm>
        <div
          css={css`
            background: ${theme.colors.grey_2};
            height: calc(35vw-100px);

            width: 1px;
          `}
        />
      </Hidden>
      <Visible sm xs>
        <div
          css={css`
            background: ${theme.colors.grey_2};
            height: 1px;
            margin-bottom: 20px;
            width: 100%;
          `}
        />
      </Visible>
    </>
  );
};

const HeroDiv = styled('div')`
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, 
      ${theme.colors.primary}, 
      ${theme.colors.accent2}00 105%),
      url('/images/icgc-galaxy-bg.jpg');`};

  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`;

export default function Homepage() {
  const theme = useTheme();

  const { data: statsData, error: statsError, loading: statsLoading } = useFileRepoStatsBarQuery();

  return (
    <DefaultLayout>
      <Head subtitle="Homepage"></Head>
      <HeroDiv>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            padding-bottom: ${statsError ? '40px' : '0px'};
          `}
        >
          <Typography
            variant="hero"
            color="white"
            bold={true}
            css={css`
              margin: 30px 50px 10px;
              text-align: center;
            `}
            as="h1"
          >
            ICGC ARGO Data Platform
          </Typography>
          <Typography
            as="p"
            variant="title"
            color="white"
            css={css`
              margin: 0 50px;
              font-size: 15px;
              line-height: 24px;
              text-align: center;
              width: 60%;
            `}
          >
            The International Cancer Genome Consortium Accelerating Research in Genomic Oncology
            (ICGC ARGO) aims to{' '}
            <b>uniformly analyze specimens from 100,000 donors with high quality clinical data </b>
            in order to address outstanding questions that are vital to the quest to defeat cancer.
          </Typography>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 20px;
            `}
          >
            <NextLink href={FILE_REPOSITORY_PATH}>
              <Link
                underline={false}
                css={css`
                  margin: 0 15px;
                `}
              >
                <Button variant="secondary">
                  <Icon
                    css={css`
                      padding-right: 2px;
                    `}
                    name="file"
                    fill="accent2"
                    height="12px"
                  />
                  Browse the Data
                </Button>
              </Link>
            </NextLink>

            <Link
              href="https://www.icgc-argo.org/"
              underline={false}
              css={css`
                margin: 0 15px;
              `}
              target="_blank"
            >
              <Button variant="secondary">
                <Icon
                  css={css`
                    padding-right: 2px;
                  `}
                  name="programs"
                  fill="accent2"
                  height="12px"
                />
                About ICGC ARGO
              </Button>
            </Link>
          </div>

          {!statsError && (
            <DataReleaseBar
              loading={statsLoading}
              stats={[
                { quantity: statsData.programsCount, description: 'PROGRAMS' },
                { quantity: statsData.donorsCount, description: 'DONORS' },
                { quantity: statsData.filesCount, description: 'FILES' },
                // primary sites is hidden for initial release
                // { quantity: stats.primarySites, description: 'CANCER PRIMARY SITES' },
              ]}
              version={{ date: 'April, 2023', releaseIteration: 6 }}
            />
          )}
        </div>
      </HeroDiv>
      <div
        css={css`
          padding: 24px 10%;
          background-color: ${theme.colors.white};
        `}
      >
        <Row
          style={{
            justifyContent: 'center',
          }}
          nogutter
        >
          <Col sm={12} md={3.8}>
            <DataCallout
              iconName={'dna_locked'}
              iconFill={'secondary'}
              circleFill={'secondary_3'}
              title={'Access Controlled Data'}
              urlData={{
                text: 'How to apply',
                href: DOCS_DATA_ACCESS_PAGE,
              }}
            >
              <b>The Data Access Compliance Office (DACO) </b> handles approval for access to
              controlled molecular data in the ARGO Data Platform.
            </DataCallout>
          </Col>
          <SeparationLine />
          <Col sm={12} md={3.8}>
            <DataCallout
              iconName={'download'}
              iconFill={'accent4_dark'}
              circleFill={'accent4_3'}
              title={'Download Data'}
              urlData={{
                text: 'How to Download',
                href: DOCS_DATA_DOWNLOAD_PAGE,
              }}
            >
              ICGC ARGO <b>clinical data </b>will be available for download in the File Repository.
              <b> Molecular data</b> can be downloaded after obtaining DACO approval.
            </DataCallout>
          </Col>
          <SeparationLine />
          <Col sm={12} md={3.8}>
            <DataCallout
              iconName={'workflow'}
              iconFill={'accent2_dark'}
              circleFill={'accent2_3'}
              title={'Data Analysis Workflows'}
              urlData={{
                text: 'About our Workflows',
                href: DOCS_DNA_PIPELINE_PAGE,
              }}
            >
              ICGC ARGO uniformly analyzes molecular data against the{' '}
              <b>GRCh38 Human Reference Genome</b>.
            </DataCallout>
          </Col>
        </Row>
        <NewsContainer newsItems={newsItems} />
        <div
          css={css`
            background-image: url('/images/icgc-globe-bg.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            padding: 40px 0px;
          `}
        >
          <ResponsiveGridLayout>
            <ResourceBox
              title={'Publication Guidelines'}
              bodyText={'How to cite the ARGO Data Platform and datasets within your publication.'}
              iconName={'article'}
              iconFill={'error_1'}
              circleFill={'error_3'}
              href={DOCS_PUBLICATION_GUIDELINE_PAGE}
            />

            <ResourceBox
              title={'Release Notes'}
              bodyText={'Find details about Platform software releases and data releases.'}
              iconName={'calendar'}
              iconFill={'secondary'}
              circleFill={'secondary_3'}
              href={DOCS_DATA_RELEASES_PAGE}
            />

            <ResourceBox
              title={'Programmatic APIs'}
              bodyText={'Access Platform data through our public ARGO API.'}
              iconName={'brackets'}
              iconFill={'accent4_dark'}
              circleFill={'accent4_3'}
              href={DOCS_PROGRAMMATIC_APIS_PAGE}
            />

            <ResourceBox
              title={'ICGC 25K Data Portal'}
              bodyText={
                'Explore the original initiative that produced >20,000 tumour genomes across 26 cancer types.'
              }
              iconName={'programs'}
              iconFill={'accent3_dark'}
              circleFill={'accent3_3'}
              href={'https://dcc.icgc.org/'}
            />

            <ResourceBox
              title={'Data Submission'}
              bodyText={'Instructions for programs to submit clinical and molecular data.'}
              iconName={'testtube'}
              iconFill={'accent1_dimmed'}
              circleFill={'accent1_3'}
              href={DOCS_SUBMISSION_OVERVIEW_PAGE}
            />

            <ResourceBox
              title={'Documentation'}
              bodyText={'Resources for how to use the ARGO Data Platform and how to access data.'}
              iconName={'question'}
              iconFill={'warning'}
              circleFill={'warning_3'}
              href={'https://docs.icgc-argo.org/'}
            />
          </ResponsiveGridLayout>
        </div>
      </div>
      <OvertureBanner />
    </DefaultLayout>
  );
}
