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

import * as React from 'react';
import { StyledInputWrapper, INPUT_STATES, INPUT_SIZES } from 'uikit/form/common';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';
import { css, styled } from '..';
import Tag, { TAG_VARIANTS } from 'uikit/Tag';
import Icon from 'uikit/Icon';

const TagWrapper = styled('div')`
  margin-right: 5px;
`;
const PrompMessage = styled('div')`
  position: absolute;
  top: 100%;
  right: 0%;
  margin-right: 5px;
`;

const copyToClipboard = async (data: string) => {
  await navigator.clipboard.writeText(data);
};

const ClipboardCopyField = ({
  value,
  buttonText = 'copy',
  disabled = false,
  tagText,
  errorText,
  timeout = 2000,
  loading,
  buttonId,
}: {
  buttonText?: string;
  value?: string;
  tagText?: string;
  disabled?: boolean;
  errorText?: string;
  timeout?: number;
  loading: boolean;
  buttonId: string;
}) => {
  const [promptMsgShown, setPromptMsgShown] = React.useState(false);
  let currentTimeout: any = undefined;

  const showPromptMessage = () => {
    clearTimeout(currentTimeout);
    setPromptMsgShown(true);
    currentTimeout = setTimeout(() => {
      setPromptMsgShown(false);
    }, timeout);
  };

  const onCopyClicked = async () => {
    if (value) {
      await copyToClipboard(value);
      showPromptMessage();
    }
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <StyledInputWrapper
        disabled={disabled}
        size={INPUT_SIZES.SM}
        inputState={INPUT_STATES.default}
        css={css`
          height: 15px;
          padding-left: 5px;
          display: flex;
          cursor: unset;
        `}
      >
        {(errorText || tagText) && !loading && (
          <TagWrapper>
            <Tag
              id="apiTokenExpiry" // For Selenium
              variant={errorText ? TAG_VARIANTS.ERROR : TAG_VARIANTS.INFO}
            >
              {errorText || tagText}
            </Tag>
          </TagWrapper>
        )}
        <div
          css={css`
            flex: 1;
            overflow: hidden;
            word-break: break-all;
            height: 15px;
          `}
        >
          <Typography
            id="apiToken" // For Selenium
            variant="default"
          >
            {value}
          </Typography>
        </div>
        <Button
          id={buttonId}
          isAsync
          disabled={disabled}
          onClick={onCopyClicked}
          css={css`
            border-radius: 0px;
            position: relative;
          `}
        >
          {promptMsgShown ? (
            <Icon name="checkmark" fill="white" height="13px" />
          ) : loading ? (
            <Icon name="spinner" height="13px" />
          ) : (
            buttonText
          )}
        </Button>
      </StyledInputWrapper>
      {promptMsgShown && (
        <PrompMessage>
          <Typography variant="label" component="div" color="accent2_dark">
            Copied!
          </Typography>
        </PrompMessage>
      )}
    </div>
  );
};

export default ClipboardCopyField;
