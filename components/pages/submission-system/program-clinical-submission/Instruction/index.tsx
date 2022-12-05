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

import {
  Button,
  ButtonLoader,
  BUTTON_SIZES,
  css,
  FileSelectButton,
  Icon,
  InstructionBox,
  Link,
  Typography,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { DOCS_DICTIONARY_PAGE } from 'global/constants/docSitePaths';
import { useClinicalSubmissionSchemaVersion } from 'global/hooks/useClinicalSubmissionSchemaVersion';
import { useState } from 'react';

import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
  instructionBoxButtonStyle,
  instructionBoxLoadingButtonStyle,
} from '../../common';
import FileTemplatesDownloadButton from './FileTemplatesDownloadButton';

const InstructionLoader = ({ theme, text }: ButtonLoader) => {
  const disabledColor = theme.colors.accent2_dark;

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        color: ${disabledColor};
      `}
    >
      <Icon
        name="spinner"
        width={'12px'}
        height={'12px'}
        fill={disabledColor}
        css={css`
          margin-right: 4px;
        `}
      />
      {text}
    </div>
  );
};

const Instruction = ({
  validationEnabled,
  signOffEnabled,
  onUploadFileSelect,
  onValidateClick,
  uploadEnabled,
  onSignOffClick,
  clinicalTypes,
}: {
  onUploadFileSelect: (files: FileList) => Promise<any>;
  onValidateClick: () => Promise<any>;
  onSignOffClick: () => Promise<any>;
  validationEnabled: boolean;
  signOffEnabled: boolean;
  uploadEnabled: boolean;
  clinicalTypes: string[];
}) => {
  const { DOCS_URL_ROOT } = getConfig();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isSigningOff, setIsSigningOff] = useState<boolean>(false);

  const handleFileUploadClick = async (files: FileList) => {
    setIsUploading(true);
    await onUploadFileSelect(files);
    setIsUploading(false);
  };

  const handleValidationClick = async () => {
    setIsValidating(true);
    await onValidateClick();
    setIsValidating(false);
  };

  const handleSignOffClick = async () => {
    setIsSigningOff(true);
    await onSignOffClick();
    setIsSigningOff(false);
  };
  const latestDictionaryResponse = useClinicalSubmissionSchemaVersion();
  return (
    <InstructionBox
      steps={[
        <>
          <Typography variant="data" component="span">
            BEFORE YOU START: Download the clinical file templates and format them using{' '}
            <Link target="_blank" bold href={DOCS_DICTIONARY_PAGE}>
              Data&nbsp;Dictionary&nbsp;
              {!latestDictionaryResponse.loading &&
                `v${latestDictionaryResponse.data.clinicalSubmissionSchemaVersion}`}
            </Link>
          </Typography>
          <FileTemplatesDownloadButton clinicalTypes={clinicalTypes} />
        </>,
        <>
          <Typography variant="data" component="span">
            1. Upload your formatted clinical TSV files.
          </Typography>
          <FileSelectButton
            id="button-submission-file-select" // For Selenium
            isAsync
            css={isUploading ? instructionBoxLoadingButtonStyle : instructionBoxButtonStyle}
            variant="secondary"
            size={BUTTON_SIZES.SM}
            inputProps={{
              accept: '.tsv',
              multiple: true,
            }}
            onFilesSelect={handleFileUploadClick}
            isLoading={isUploading}
            disabled={!uploadEnabled}
            Loader={(props) => <InstructionLoader text="VALIDATING FILES" {...props} />}
          >
            <span css={instructionBoxButtonContentStyle}>
              <Icon
                name="upload"
                fill={uploadEnabled ? 'accent2_dark' : 'white'}
                height="12px"
                css={instructionBoxButtonIconStyle}
              />
              Upload Files
            </span>
          </FileSelectButton>
        </>,
        <>
          <Typography variant="data" component="span">
            2. Validate your entire submission workspace.
          </Typography>
          <Button
            id="button-validate-submission" // For Selenium
            css={isValidating ? instructionBoxLoadingButtonStyle : instructionBoxButtonStyle}
            variant="primary"
            size={BUTTON_SIZES.SM}
            disabled={!validationEnabled}
            onClick={handleValidationClick}
            isLoading={isValidating}
            isAsync
            Loader={(props) => <InstructionLoader text="VALIDATING SUBMISSION" {...props} />}
          >
            <span css={instructionBoxButtonContentStyle}>Validate Submission</span>
          </Button>
        </>,
        <>
          <Typography variant="data" component="span">
            3. When your clinical data is valid and QC is complete, sign off your submission:
          </Typography>
          <Button
            id="button-submission-sign-off" // For Selenium
            css={instructionBoxButtonStyle}
            variant="primary"
            size={BUTTON_SIZES.SM}
            disabled={!signOffEnabled}
            onClick={handleSignOffClick}
            isLoading={isSigningOff}
            isAsync
          >
            <span css={instructionBoxButtonContentStyle}>Sign Off submission</span>
          </Button>
        </>,
      ]}
    />
  );
};

export default Instruction;
