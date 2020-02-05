import * as React from 'react';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Banner, { BANNER_SIZE, BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import { Box } from '../common';
import ClipboardCopyField from 'uikit/ClipboardCopyField';
import GENERATE_EGO_ACCESS_KEY from './GENERATE_EGO_ACCESS_KEY.gql';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/get';
import { AccessKey } from '../types';

const AccessTokenBox = ({ accessKey, loading }: { accessKey: AccessKey; loading: boolean }) => {
  const [generatedKey, setGeneratedKey] = React.useState(null);
  const [isGeneratingKey, setIsGeneratingKey] = React.useState(false);
  const [generateKey] = useMutation(GENERATE_EGO_ACCESS_KEY);

  // pick either the retrieved key or generated key values
  const exp = generatedKey ? generatedKey.exp : accessKey ? accessKey.exp : 0;
  const key = generatedKey ? generatedKey.key : accessKey ? accessKey.key : '';
  const keyError = get(accessKey, 'error', '');

  const onGenerate = async () => {
    setIsGeneratingKey(true);
    try {
      const {
        data: { generateAccessKey },
      } = await generateKey();
      setIsGeneratingKey(false);
      setGeneratedKey(generateAccessKey);
    } catch (err) {}
  };

  const getKeyTextValue = () => {
    if (loading || (!accessKey && !generatedKey)) {
      return '';
    } else {
      return key;
    }
  };

  const getDayValue = exp => {
    if (exp <= 0) return '';
    const days = Math.floor(exp / 60 / 60 / 24);
    return `Expires in: ${days} days`;
  };

  const getTagValue = () => (accessKey || generatedKey ? getDayValue(exp) : '');

  const isExpired = exp <= 0 && (accessKey || generatedKey);
  const disableCopy = loading || isExpired || isGeneratingKey || !key;
  const disableGenerate = loading || isGeneratingKey;

  return (
    <Box title="Access Token" iconName="key">
      <Typography variant="paragraph">
        Your access token can be used instead of a password to access ICGC ARGO resources.
        <br />
        <Link underline={false} uppercase withChevron bold>
          How to use your token with ICGC ARGO tools
        </Link>
      </Typography>
      <div
        css={css`
          margin-top: 30px;
          margin-bottom: 30px;
        `}
      >
        <Typography
          variant="paragraph"
          bold
          css={css`
            line-height: 14px;
          `}
        >
          Access Token
        </Typography>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            id="accessTokenBox" // For Selenium
            css={css`
              flex: 1;
            `}
          >
            <ClipboardCopyField
              tagText={getTagValue()}
              errorText={isExpired ? 'Expired!' : ''}
              value={getKeyTextValue()}
              disabled={disableCopy}
              loading={loading || isGeneratingKey}
              buttonId="button-clipboard-copy-field"
            />
          </div>
          <div
            css={css`
              margin-left: 10px;
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Button
              id="button-generate-access-token" // For Selenium '
              onClick={() => onGenerate()}
              variant="secondary"
              disabled={disableGenerate}
            >
              {!key ? 'Generate' : 'Regenerate'}
            </Button>
          </div>
        </div>
      </div>
      <div
        css={css`
          margin-top: 10px;
        `}
      >
        <Banner
          size={BANNER_SIZE.SM}
          variant={BANNER_VARIANTS.WARNING}
          content={
            <>
              Please note: your access token is associated with your user credentials and should{' '}
              <strong>NEVER</strong> be shared with anyone.
            </>
          }
        />
      </div>
    </Box>
  );
};

export default AccessTokenBox;
