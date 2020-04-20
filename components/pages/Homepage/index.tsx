import React from 'react';
import { Col, Row } from 'react-grid-system';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';

import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from '../DefaultLayout';

import Link from 'uikit/Link';

import Container from 'uikit/Container';
import Icon from 'uikit/Icon';
import { DataReleaseBar } from './common';

const Ul = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  padding-left: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const Ul2 = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  padding-left: 0px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const FlexRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export default function Homepage() {
  const theme = useTheme();
  return (
    <DefaultLayout>
      <div
        css={css`
          background-image: linear-gradient(
              to bottom,
              rgba(21, 28, 61, 1),
              rgba(127, 85, 204, 0) 105%
            ),
            url('/static/icgc-galaxy-bg.png');
          background-position: center;
          background-size: cover;
          background-color: ${theme.colors.primary};
          width: 100%;
          min-height: 354px;
          border-top: 1px solid ${theme.colors.grey};
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            /* margin: 0 10%; */
          `}
        >
          <Typography
            variant="hero"
            color="white"
            css={css`
              margin: 30px 50px 10px;
              font-weight: 600;
              text-align: center;
            `}
          >
            ICGC ARGO Data Platform
          </Typography>
          <Typography
            variant="title"
            color="white"
            css={css`
              margin: 0 50px;
              font-size: 16px;
              font-weight: 400;
              font-stretch: normal;
              font-style: normal;
              line-height: 24px;
              letter-spacing: normal;
              text-align: center;
              width: 60%;
            `}
          >
            The International Cancer Genome Consortium Accelerating Research in Genomic Oncology
            (ICGC ARGO) aims to{' '}
            <span
              css={css`
                font-weight: 600;
              `}
            >
              uniformly analyze specimens from 100,000 donors with high quality clinical data{' '}
            </span>
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
              href=""
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
                />{' '}
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
          {
            <DataReleaseBar
              stats={[
                { quantity: 2, description: 'PROGRAMS' },
                { quantity: 4600, description: 'DONORS' },
                { quantity: 2, description: 'CANCER PRIMARY SITES' },
                { quantity: 400, description: 'FILES' },
              ]}
              version={{ date: 'July 2, 2020', releaseIteration: 1 }}
            />
          }
        </div>
      </div>
      <div
        css={css`
          height: 100%;
          padding: 0 10%;
          /* display: grid; */
          /* grid-template-columns: 1fr 1fr; */
          background: ${theme.colors.white};
        `}
      >
        fasdfasdfasdfasdfaskdfakjsdfnkjashdfkjashfakjsdhf
      </div>
    </DefaultLayout>
    // <DefaultLayout>
    //   <div
    //     css={css`
    //       height: 100%;
    //       display: grid;
    //       grid-template-columns: 1fr 1fr;
    //       background: ${theme.colors.white};
    //     `}
    //   >
    //     <div
    //       css={css`
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: start;
    //         align-items: center;
    //         text-align: center;
    //       `}
    //     >
    //       <div>
    //         <img width="350px" alt="" src="/static/argo.svg" />
    //       </div>
    //       <div
    //         css={css`
    //           margin: 0 10px;
    //         `}
    //       >
    //         <Typography
    //           variant="hero"
    //           bold
    //           color="primary"
    //           css={css`
    //             width: 100%;
    //             margin: 28px 0 25px 0;
    //             font-weight: normal;
    //           `}
    //         >
    //           Welcome to the cool new page
    //         </Typography>
    //       </div>

    //       <Container
    //         css={css`
    //           margin: 77px 50px 20px 50px;
    //           padding: 16px;
    //           text-align: left;
    //           display: inline-flex;
    //         `}
    //       >
    //         <div
    //           css={css`
    //             margin-right: 16px;
    //           `}
    //         >
    //           <img alt="" src="/static/testtube.svg" />
    //         </div>
    //         <div>
    //           <Typography
    //             component="div"
    //             css={css`
    //               font-size: 16px;
    //               font-weight: 600;
    //             `}
    //             color="secondary"
    //           >
    //             Get started with Data Submission
    //           </Typography>
    //         </div>
    //       </Container>
    //     </div>
    //     <div>
    //       <div
    //         css={css`
    //           display: grid;
    //           height: 100%;
    //           text-align: center;
    //           column-gap: 6px;
    //           row-gap: 6px;
    //           grid-template-columns: 1fr 1fr;
    //           grid-template-rows: 2.3318fr 1fr;
    //         `}
    //       >
    //         <div
    //           css={css`
    //             grid-column-start: 1;
    //             grid-column-end: 3;
    //             display: flex;
    //             align-items: center;
    //             justify-content: center;
    //             background-image: url('/static/icgc-argo-galaxy.jpg');
    //             background-position: center;
    //             background-size: cover;
    //           `}
    //         >
    //           <Typography
    //             variant="title"
    //             color="white"
    //             css={css`
    //               margin: 0 50px;
    //               line-height: 42px;
    //             `}
    //           >
    //             ICGC ARGO aims to analyze specimens from cancer patients with{' '}
    //             <span
    //               css={css`
    //                 font-weight: 600;
    //               `}
    //             >
    //               high quality clinical data
    //             </span>{' '}
    //             to address outstanding questions that are vital to our quest to defeat cancer.
    //           </Typography>
    //         </div>
    //         <div
    //           css={css`
    //             background-image: url('/static/icgc-argo-researcher.jpg');
    //             background-position: center;
    //             background-size: cover;
    //           `}
    //         />
    //         <div
    //           css={css`
    //             background-image: url('/static/icgc-argo-clinician-and-patient.jpg');
    //             background-position: center;
    //             background-size: cover;
    //           `}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </DefaultLayout>
  );
}
