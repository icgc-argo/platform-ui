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

import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import ClinicalSubmissionProgressBar from '../../ClinicalSubmissionProgressBar';
import { usePageQuery } from 'global/hooks/usePageContext';
import SampleRegistrationProgressBar from '../../SampleRegistrationProgressBar';
import Hyperlink, { HyperLinkProps } from 'uikit/Link';
import Link, { LinkProps } from 'next/link';
import {
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
} from 'global/constants/pages';
import { DashboardCard } from '../common';
import { isCollaborator } from 'global/utils/egoJwt';
import useAuthContext from 'global/hooks/useAuthContext';
import React from 'react';

const ConditionalLink: React.ComponentType<{
  showAsLink: boolean;
  link: LinkProps;
  hyperlink?: HyperLinkProps;
}> = ({ showAsLink, link, hyperlink, children }) => {
  return showAsLink ? (
    <Link {...link}>
      <Hyperlink {...hyperlink}>{children}</Hyperlink>
    </Link>
  ) : (
    <>{children}</>
  );
};

export default function ProgramWorkplaceStatus() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { token, permissions } = useAuthContext();

  const canViewLinks = React.useMemo(() => {
    return !isCollaborator({
      permissions,
      programId: programShortName,
    });
  }, [token]);

  return (
    <DashboardCard cardHeight="170px">
      <Typography variant="default" component="span">
        Program Workplace Status
      </Typography>

      <div
        css={css`
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-top: 10px;
        `}
      >
        <div
          css={css`
            width: 90px;
          `}
        >
          <ConditionalLink
            showAsLink={canViewLinks}
            link={{
              href: PROGRAM_SAMPLE_REGISTRATION_PATH,
              as: PROGRAM_SAMPLE_REGISTRATION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              ),
            }}
          >
            <Typography variant="caption">
              Sample <br />
              Registration
            </Typography>
          </ConditionalLink>
        </div>
        <div
          css={css`
            margin-bottom: 2px;
          `}
        >
          <SampleRegistrationProgressBar programShortName={programShortName} />
        </div>
      </div>
      <div
        css={css`
          height: 40px;
          padding-top: 20px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        `}
      >
        <div
          css={css`
            width: 90px;
          `}
        >
          <ConditionalLink
            showAsLink={canViewLinks}
            link={{
              href: PROGRAM_CLINICAL_SUBMISSION_PATH,
              as: PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              ),
            }}
          >
            <Typography variant="caption">
              Clinical <br />
              Submission
            </Typography>
          </ConditionalLink>
        </div>
        <div
          css={css`
            margin-bottom: 2px;
          `}
        >
          <ClinicalSubmissionProgressBar
            programShortName={programShortName}
            approvalBarWidth={75}
          />
        </div>
      </div>
    </DashboardCard>
  );
}
