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
              id="accessKeyExpiry" // For Selenium
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
            id="accessKey" // For Selenium
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
