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
import { Row, Col } from 'react-grid-system';
import queryString from 'query-string';
import urlJoin from 'url-join';
import { useToaster } from 'global/hooks/toaster';
import { usePageQuery } from 'global/hooks/usePageContext';
import useAuthContext from 'global/hooks/useAuthContext';
import { getConfig } from 'global/config';
import { CompletionStates, TsvDownloadIds } from './common';
import { Button, css, Icon, TOAST_VARIANTS } from '@icgc-argo/uikit';

const DownloadButton = ({
  text,
  onClick,
  isLoading = false,
  disabled = false,
}: {
  text: string;
  onClick?: any;
  isLoading?: boolean;
  disabled?: boolean;
}) => (
  <Button
    isLoading={isLoading}
    css={css`
      white-space: nowrap;
    `}
    variant="secondary"
    onClick={onClick}
    disabled={disabled}
  >
    <Icon
      css={css`
        padding-right: 4px;
      `}
      name="download"
      fill="accent2_dark"
      height="12px"
    />
    {text}
  </Button>
);

const ClinicalDownloadButton = ({
  text,
  tsvDownloadIds = { donorIds: [], submitterDonorIds: [] },
  entityTypes = [],
  completionState,
  disabled = false,
}: {
  text?: string;
  tsvDownloadIds: TsvDownloadIds;
  entityTypes: string[];
  completionState: CompletionStates;
  disabled?: boolean;
}) => {
  const toaster = useToaster();

  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { downloadFileWithEgoToken } = useAuthContext();

  const [buttonLoadingState, setButtonLoadingState] = React.useState(false);
  const { donorIds, submitterDonorIds } = tsvDownloadIds;

  const query = JSON.stringify({
    donorIds,
    submitterDonorIds,
    entityTypes,
    completionState,
  });

  const handleDownloadAllError = () => {
    toaster.addToast({
      interactionType: 'CLOSE',
      title: `Download Error`,
      variant: TOAST_VARIANTS.ERROR,
      content: 'File failed to download.',
    });
    setButtonLoadingState(false);
  };

  const onClickDownloadAll = () => {
    const { GATEWAY_API_ROOT } = getConfig();

    const url = urlJoin(
      GATEWAY_API_ROOT,
      `/clinical/program/`,
      programShortName,
      `/clinical-data-tsv`,
    );

    setButtonLoadingState(true);

    downloadFileWithEgoToken(url, {
      method: 'post',
      body: query,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        setButtonLoadingState(false);
      })
      .catch(handleDownloadAllError);
  };

  return (
    <Row>
      <Col>
        <DownloadButton
          text={text || 'All Clinical Data'}
          onClick={onClickDownloadAll}
          isLoading={buttonLoadingState}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

export default ClinicalDownloadButton;
