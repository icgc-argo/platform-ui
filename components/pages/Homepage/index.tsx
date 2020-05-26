import React from 'react';
import { Col, Row, ScreenClassRender, Visible, Hidden } from 'react-grid-system';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';

import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from '../DefaultLayout';

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
import { ModalPortal } from 'components/ApplicationRoot';
import ProgramServicesModal from './ProgramServicesModal';

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

const layoutProps = {
  lg: 4,
  md: 6,
  sm: 12,
};

const HeroDiv = styled('div')`
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, 
      ${theme.colors.primary}, 
      ${theme.colors.accent2}00 105%),
      url('/static/icgc-galaxy-bg.jpg');`};

  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  min-height: 354px;
`;

export default function Homepage() {
  const theme = useTheme();

  return (
    <DefaultLayout>
      <HeroDiv>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
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

          <DataReleaseBar
            stats={[
              { quantity: 2, description: 'PROGRAMS' },
              { quantity: 4600, description: 'DONORS' },
              { quantity: 2, description: 'CANCER PRIMARY SITES' },
              { quantity: 400, description: 'FILES' },
            ]}
            version={{ date: 'July 2, 2020', releaseIteration: 1 }}
          />
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
                href: 'https://docs.icgc-argo.org/docs/data-access',
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
                href: 'https://docs.icgc-argo.org/docs/data-download',
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
                href: 'https://docs.icgc-argo.org/docs/dna-pipeline',
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
              <b>Data Release:</b> ICGC ARGO has just released a new set of data, with new donors
              and somatic mutations from 2 programs. For the release summary, please visit{' '}
              <Link>Data Release 1</Link>.
            </>,
            <>
              <b>Software Release:</b> Analyze ICGC ARGO data from a Jupyter notebook that comes
              preinstalled with our new python API. Access the feature: <Link>Data Analysis</Link>{' '}
              and release notes: <Link>Software Release 2</Link>.
            </>,
          ]}
        />
        <div
          css={css`
            background-image: url('/static/icgc-globe-bg.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            padding: 10px 0px;
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
