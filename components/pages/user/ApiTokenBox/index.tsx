import * as React from 'react';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Banner, { BANNER_SIZE, BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import { Box } from '../common';
import ClipboardCopyField from 'uikit/ClipboardCopyField';
import GENERATE_EGO_API_TOKEN from './GENERATE_EGO_API_TOKEN.gql';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/get';
import { ApiToken } from '../types';

const ApiTokenBox = ({ apiToken, loading }: { apiToken: ApiToken; loading: boolean }) => {
  const [generatedApiToken, setGeneratedApiToken] = React.useState(null);
  const [isGeneratingApiToken, setIsGeneratingApiToken] = React.useState(false);
  const [generateApiToken] = useMutation(GENERATE_EGO_API_TOKEN);

  // pick either the retrieved key or generated key values
  const exp = generatedApiToken ? generatedApiToken.exp : apiToken ? apiToken.exp : 0;
  const key = generatedApiToken ? generatedApiToken.key : apiToken ? apiToken.key : '';
  const keyError = get(apiToken, 'error', '');

  const onGenerate = async () => {
    setIsGeneratingApiToken(true);
    try {
      const {
        data: { generateAccessKey },
      } = await generateApiToken();
      setIsGeneratingApiToken(false);
      setGeneratedApiToken(generateAccessKey);
    } catch (err) {}
  };

  const getKeyTextValue = () => {
    if (loading || (!apiToken && !generatedApiToken)) {
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

  const getTagValue = () => (apiToken || generatedApiToken ? getDayValue(exp) : '');

  const isExpired = exp <= 0 && (apiToken || generatedApiToken);
  const disableCopy = loading || isExpired || isGeneratingApiToken || !key;
  const disableGenerate = loading || isGeneratingApiToken;

  return (
    <Box title="API Token" iconName="key">
      <Typography variant="paragraph">
        Your API token can be used instead of a password to access ICGC ARGO resources.
        <br />
        <Link underline={false} uppercase withChevron bold>
          How to use your API token with ICGC ARGO tools
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
          API Token
        </Typography>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              flex: 1;
            `}
          >
            <ClipboardCopyField
              tagText={getTagValue()}
              errorText={isExpired ? 'Expired!' : ''}
              value={getKeyTextValue()}
              disabled={disableCopy}
              loading={loading || isGeneratingApiToken}
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
              id="button-generate-api-token" // For Selenium '
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
              Please note: your API token is associated with your user credentials and should{' '}
              <strong>NEVER</strong> be shared with anyone.
            </>
          }
        />
      </div>
    </Box>
  );
};

export default ApiTokenBox;
