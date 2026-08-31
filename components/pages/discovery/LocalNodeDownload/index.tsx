/*
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import { Button, css, Icon, Typography, useTheme } from '@icgc-argo/uikit';
import { UikitIconNames } from '@icgc-argo/uikit/Icon/icons';
import QueryBar from '../../../QueryBar';
import useCommonToasters from 'components/useCommonToasters';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { useState } from 'react';
import urljoin from 'url-join';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import { commonStyles } from '../components/common';

const FilterSummary = (): React.ReactElement => {
  const theme = useTheme();
  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        gap: '12px',
        background: theme.colors.grey_4,
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '8px 12px',
        minHeight: '42px',
      })}
    >
      <Typography
        css={css({
          margin: 0,
          flexShrink: 0,
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: '13px',
          color: theme.colors.black,
        })}
      >
        Search Query:
      </Typography>
      <QueryBar readOnly />
    </div>
  );
};

type DownloadCardProps = {
  iconName: UikitIconNames;
  title: string;
  subtitle: string;
  isLoading: boolean;
  disabled: boolean;
  onDownload: () => void;
};

const DownloadCard = ({
  iconName,
  title,
  subtitle,
  isLoading,
  disabled,
  onDownload,
}: DownloadCardProps): React.ReactElement => {
  const theme = useTheme();
  return (
    <div
      css={css([
        commonStyles.block,
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 16px',
          gap: '12px',
          width: '322px',
          height: '191px',
        },
      ])}
    >
      <div
        css={css({
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: theme.colors.accent2_3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Icon name={iconName} fill="accent2_dark" height="24px" />
      </div>
      <Typography bold css={css({ margin: 0, fontSize: '16px' })}>
        {title}
      </Typography>
      <Typography css={css({ margin: 0, color: theme.colors.grey, fontSize: '15px' })}>
        {subtitle}
      </Typography>
      <Button
        variant="primary"
        size="md"
        isLoading={isLoading}
        disabled={disabled}
        onClick={onDownload}
        Loader={() => (
          <div css={css({ display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <Icon name="spinner" fill="white" width="20px" height="20px" />
          </div>
        )}
        css={css({ width: '100%', height: '36px', marginTop: '8px' })}
      >
        <span css={instructionBoxButtonContentStyle}>
          {!isLoading && (
            <Icon name="download" fill="white" height="12px" css={instructionBoxButtonIconStyle} />
          )}
          DOWNLOAD
        </span>
      </Button>
    </div>
  );
};

const { GATEWAY_API_ROOT } = getConfig();

type LocalNodeDownloadProps = {
  filesCount: number;
  donorsCount: number;
  statsLoading: boolean;
};

const LocalNodeDownload = ({
  filesCount,
  donorsCount,
  statsLoading,
}: LocalNodeDownloadProps): React.ReactElement => {
  const { downloadFileWithEgoToken } = useAuthContext();
  const toaster = useCommonToasters();
  const { filters } = useFiltersContext();

  const [manifestLoading, setManifestLoading] = useState(false);
  const [clinicalLoading, setClinicalLoading] = useState(false);
  const anyLoading = manifestLoading || clinicalLoading;

  const fileSubtitle = statsLoading ? '' : `${filesCount.toLocaleString()} files`;
  const donorSubtitle = statsLoading ? '' : `${donorsCount.toLocaleString()} donors`;

  const manifestUrl = urljoin(
    GATEWAY_API_ROOT,
    'data-discovery-tsv/score-manifest',
    `?filter=${encodeURIComponent(JSON.stringify(filters))}`,
  );

  const clinicalUrl = urljoin(
    GATEWAY_API_ROOT,
    'clinical/api/donors/data-for-files-discovery',
    `?filter=${encodeURIComponent(JSON.stringify(filters))}`,
  );

  const makeDownloadHandler =
    (url: string, setLoading: (loading: boolean) => void) => async (): Promise<void> => {
      setLoading(true);
      try {
        await downloadFileWithEgoToken(url);
      } catch (error) {
        toaster.onDownloadError(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '4px 0',
      })}
    >
      <FilterSummary />
      <Typography css={css({ margin: 0, fontSize: '16px' })}>
        Please select type of data you would like to download:
      </Typography>
      <div
        css={css({ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: '16px' })}
      >
        <DownloadCard
          iconName="filesize"
          title="File Manifest"
          subtitle={fileSubtitle}
          isLoading={manifestLoading}
          disabled={anyLoading}
          onDownload={makeDownloadHandler(manifestUrl, setManifestLoading)}
        />
        <DownloadCard
          iconName="testtube"
          title="Clinical Data"
          subtitle={donorSubtitle}
          isLoading={clinicalLoading}
          disabled={anyLoading}
          onDownload={makeDownloadHandler(clinicalUrl, setClinicalLoading)}
        />
      </div>
    </div>
  );
};

export default LocalNodeDownload;
