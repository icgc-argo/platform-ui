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

import * as React from 'react';
import Typography from 'uikit/Typography';
import { css, styled } from 'uikit';
import Link from 'uikit/Link';
import Icon from 'uikit/Icon';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import { getConfig } from 'global/config';
import { DOCS_DATA_ACCESS_PAGE } from 'global/constants/docSitePaths';

const ContainerComponent = styled('div')`
  display: flex;
  border: solid 1px ${({ theme }) => theme.colors.grey_2};
  padding: 8px;
  border-radius: 8px;
  & > :not(:last-child) {
    border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
  }
`;
const SectionComponent = styled('div')`
  display: flex;
  align-items: center;
  &:not(:first-child) {
    padding-left: 8px;
    padding-right: 8px;
  }
  &:first-child {
    padding-right: 8px;
  }
  &:last-child {
    padding-left: 8px;
  }
`;

const Container: typeof ContainerComponent & {
  Section?: typeof SectionComponent;
} = ContainerComponent;

Container.Section = SectionComponent;

export default function DacoAccessStatusDisplay({ approved }: { approved: boolean }) {
  const { DACO_URL } = getConfig();

  return (
    <Container>
      <Container.Section>
        <div
          css={css`
            margin-right: 8px;
            flex: 1;
            display: flex;
            align-items: center;
          `}
        >
          {approved ? (
            <Icon name="success" fill="success" height="30px" />
          ) : (
            <Icon name="times_circle" fill="error" height="30px" />
          )}
        </div>
        {approved ? (
          <Typography variant="data" color="success_dark">
            DACO <br />
            Approved
          </Typography>
        ) : (
          <Typography variant="data" color="error_dark">
            Not DACO <br />
            Approved
          </Typography>
        )}
      </Container.Section>
      <Container.Section>
        {approved ? (
          <Typography variant="label" component="div">
            You have access to download controlled data.{' '}
            <Link withChevron underline={false} href={FILE_REPOSITORY_PATH}>
              VIEW FILES
            </Link>
          </Typography>
        ) : (
          <Typography variant="label" component="div">
            Learn more about the{' '}
            <Link target="_blank" href={DOCS_DATA_ACCESS_PAGE}>
              DACO application process,{' '}
            </Link>
            or{' '}
            <Link target="_blank" href={DACO_URL}>
              apply for DACO approval.{' '}
            </Link>
          </Typography>
        )}
      </Container.Section>
    </Container>
  );
}

export const NoMemberAccess = () => {
  return (
    <Container>
      <Container.Section>
        <div
          css={css`
            margin-right: 8px;
            flex: 1;
            display: flex;
            align-items: center;
          `}
        >
          <Icon name="times_circle" fill="error" height="30px" />
        </div>
        <Typography variant="data" color="error_dark">
          No
          <br />
          Programs
        </Typography>
      </Container.Section>
      <Container.Section>
        <Typography variant="label" component="div">
          You do not have access to any programs.
        </Typography>
      </Container.Section>
    </Container>
  );
};
