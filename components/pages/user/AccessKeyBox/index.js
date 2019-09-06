//@flow
import * as React from 'react';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Banner, { BANNER_SIZE, BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Link from 'uikit/Link';
import { Input } from 'uikit/form';
import Button from 'uikit/Button';
import { Box } from '../common';
import ClipboardCopyField from 'uikit/ClipboardCopyField';
import EGO_ACCESS_KEY from './EGO_ACCESS_KEY.gql';
import GENERATE_EGO_ACCESS_KEY from './GENERATE_EGO_ACCESS_KEY.gql';
import { useQuery, useMutation } from 'react-apollo-hooks';

export default function AccessTokenBox() {
  const { data, loading } = useQuery(EGO_ACCESS_KEY);
  const [accessKey, setAccessKey] = React.useState(null);
  const [exp, setExp] = React.useState(null);
  const now = Date.now() / 1000;
  console.log('now', now);

  const [generateKey] = useMutation(GENERATE_EGO_ACCESS_KEY);
  const onGenerate = async data => {
    try {
      const {
        data: { accessKey, exp },
      } = await generateKey();
      console.log('generate key', accessKey, exp);
      setAccessKey(accessKey);
      setExp(exp);
    } catch (err) {
      console.error('err', err);
    }
  };

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
            css={css`
              flex: 1;
            `}
          >
            <ClipboardCopyField tagText="" value="Generate a token.." disabled={false} />
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
            <Button onClick={() => onGenerate()} variant="secondary">
              Generate
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
}
