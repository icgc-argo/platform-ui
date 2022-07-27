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

import React from 'react';
import Image from 'next/image';
import { css } from '@icgc-argo/uikit';
import Container from '@icgc-argo/uikit/Container';
import Typography from '@icgc-argo/uikit/Typography';
import useTheme from '@icgc-argo/uikit/utils/useTheme';
import DefaultLayout from './DefaultLayout';
import { getConfig } from 'global/config';
import Notification from '@icgc-argo/uikit/notifications/Notification';
import GoogleLoginButton from 'components/GoogleLoginButton';
import urljoin from 'url-join';
import Link from '@icgc-argo/uikit/Link';
import {
  DOCS_MANAGING_PROGRAM_ACCESS_PAGE,
  DOCS_REGISTERING_SAMPLES_PAGE,
  DOCS_SUBMITTING_CLINICAL_DATA_PAGE,
} from 'global/constants/docSitePaths';

import argoLogo from 'images/argo.svg';
import testtubeIcon from 'images/testtube.svg';

const LinkToHome = (props) => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = (props) => <a {...props} onClick={() => 'TODO'} />;

export default function LoginPage({ redirect }: { redirect: string }) {
  const theme = useTheme();
  const { EGO_URL } = getConfig();
  const { DOCS_URL_ROOT } = getConfig();
  return (
    <DefaultLayout>
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: ${theme.colors.white};
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            text-align: center;
          `}
        >
          <Notification
            css={css`
              text-align: left;
              margin: 20px;
              margin-bottom: 100px;
            `}
            variant="WARNING"
            interactionType={null}
            size="MD"
            title="This is a closed beta testing environment"
            content="To access the clinical submission system for beta testing, you will be invited to join a program via email. If you log in without an email invite, you will not have access to any programs."
            noShadow={false}
          />
          <div>
            <Image alt="ARGO ICGC logo" src={argoLogo} layout="fixed" width={350} height={76} />
          </div>
          <div
            css={css`
              margin: 0 10px;
            `}
          >
            <Typography
              variant="hero"
              bold
              color="primary"
              css={css`
                width: 100%;
                margin: 28px 0 25px 0;
                font-weight: normal;
              `}
            >
              Welcome to the <br /> ICGC ARGO Data Platform
            </Typography>
          </div>
          <div>
            <GoogleLoginButton id="google-login" link={EGO_URL} redirectPath={redirect || ''} />
          </div>
          <Container
            css={css`
              margin: 77px 50px 20px 50px;
              padding: 16px;
              text-align: left;
              display: inline-flex;
            `}
          >
            <div
              css={css`
                margin-right: 16px;
              `}
            >
              <Image src={testtubeIcon} width={50} height={50} alt="" layout="fixed" />
            </div>
            <div>
              <Typography
                component="div"
                css={css`
                  font-size: 16px;
                  font-weight: 600;
                `}
                color="secondary"
              >
                Get started with Data Submission
              </Typography>
              <Typography component="div">
                Visit our documentation website to learn how to{' '}
                <Link
                  target="_blank"
                  href={urljoin(DOCS_URL_ROOT, DOCS_MANAGING_PROGRAM_ACCESS_PAGE)}
                >
                  manage a program,
                </Link>{' '}
                <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_REGISTERING_SAMPLES_PAGE)}>
                  register samples,
                </Link>{' '}
                and{' '}
                <Link
                  target="_blank"
                  href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTING_CLINICAL_DATA_PAGE)}
                >
                  submit clinical data.
                </Link>
              </Typography>
            </div>
          </Container>
        </div>
        <div>
          <div
            css={css`
              display: grid;
              height: 100%;
              text-align: center;
              column-gap: 6px;
              row-gap: 6px;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 2.3318fr 1fr;
            `}
          >
            <div
              css={css`
                grid-column-start: 1;
                grid-column-end: 3;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url('/images/icgc-argo-galaxy.jpg');
                background-position: center;
                background-size: cover;
              `}
            >
              <Typography
                variant="title"
                color="white"
                css={css`
                  margin: 0 50px;
                  line-height: 42px;
                `}
              >
                ICGC ARGO aims to analyze specimens from cancer patients with{' '}
                <span
                  css={css`
                    font-weight: 600;
                  `}
                >
                  high quality clinical data
                </span>{' '}
                to address outstanding questions that are vital to our quest to defeat cancer.
              </Typography>
            </div>
            <div
              css={css`
                background-image: url('/images/icgc-argo-researcher.jpg');
                background-position: center;
                background-size: cover;
              `}
            />
            <div
              css={css`
                background-image: url('/images/icgc-argo-clinician-and-patient.jpg');
                background-position: center;
                background-size: cover;
              `}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
