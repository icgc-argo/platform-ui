import React from 'react';
import { Col, Row, Visible, Hidden } from 'react-grid-system';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';

import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from '../DefaultLayout';

import galaxyBackground from 'static/icgc-galaxy-bg.jpg';
import globeBackground from 'static/icgc-globe-bg.svg';

import Link from 'uikit/Link';

import Icon from 'uikit/Icon';
import {
  DataReleaseBar,
  DataCallout,
  NewsContainer,
  ResourceBox,
  OvertureBanner,
  ResponsiveGridLayout,
} from './common';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import { getConfig } from 'global/config';
import { DOCS_DATA_ACCESS_PATH, DOCS_DATA_DOWNLOAD } from 'global/constants/docSitePaths';

const SeparationLine: React.ComponentType<{}> = () => {
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
      url(${galaxyBackground});`};

  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`;

export default function Homepage() {
  const theme = useTheme();
  const { FEATURE_REPOSITORY_ENABLED, FEATURE_LANDING_PAGE_STATS_ENABLED } = getConfig();

  return (
    <DefaultLayout>
      <HeroDiv>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            padding-bottom: ${FEATURE_LANDING_PAGE_STATS_ENABLED ? '0px' : '40px'};
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
            {FEATURE_REPOSITORY_ENABLED && (
              <Link
                href={FILE_REPOSITORY_PATH}
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
            )}

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

          {FEATURE_LANDING_PAGE_STATS_ENABLED && (
            <DataReleaseBar
              stats={[
                { quantity: 2, description: 'PROGRAMS' },
                { quantity: 4600, description: 'DONORS' },
                { quantity: 2, description: 'CANCER PRIMARY SITES' },
                { quantity: 400, description: 'FILES' },
              ]}
              version={{ date: 'July 2, 2020', releaseIteration: 1 }}
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
                href: DOCS_DATA_ACCESS_PATH,
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
                href: DOCS_DATA_DOWNLOAD,
              }}
            >
              ICGC ARGO <b>clinical data </b>is available for download in the File Repository.
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
                href: DOCS_DNA_PIPELINE,
              }}
            >
              ICGC ARGO uniformly analyzes molecular data against the{' '}
              <b>GRCh38 Human Reference Genome</b>.
            </DataCallout>
          </Col>
        </Row>
        <NewsContainer
          newsItems={[
            <>
              <b>Announcement:</b> We are excited to announce the soft launch of the ARGO Data
              Platform, the next major phase following the{' '}
              <Link target="_blank" href="https://dcc.icgc.org/">
                ICGC 25K Data Portal
              </Link>
              . This release represents an international effort to advance cancer genomics through
              high-quality clinical and molecular data for international researchers.
              <br />
              <br />
              Our team is working hard to roll out the first release, which includes the ability:
              <ul
                css={css`
                  list-style-position: outside;
                  padding-left: 20px;
                `}
              >
                <li>for ARGO programs to submit clinical data</li>
                <li>
                  to browse newly processed files from the ICGC 25K projects against the GRCh38
                  Human Reference Genome in the file repository
                </li>
                <li>to download newly analyzed molecular data files.</li>
              </ul>
              <b>Check back soon for updates!</b>
            </>,
          ]}
        />
        <div
          css={css`
            background-image: url(${globeBackground});
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
              href={'https://docs.icgc-argo.org/docs/publication-guidelines'}
            />

            <ResourceBox
              title={'Release Notes'}
              bodyText={'Find details about Platform software releases and data releases.'}
              iconName={'calendar'}
              iconFill={'secondary'}
              circleFill={'secondary_3'}
              href={'https://docs.icgc-argo.org/docs/data-release-notes'}
            />

            <ResourceBox
              title={'Programmatic APIs'}
              bodyText={'Access Platform data through our public ARGO API.'}
              iconName={'brackets'}
              iconFill={'accent4_dark'}
              circleFill={'accent4_3'}
              //todo: add link
              href={''}
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
              href={'https://docs.icgc-argo.org/docs/submission-overview'}
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
