// @flow
import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { useRouter } from 'next/router';
import usePageContext from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row, Col } from 'react-grid-system';
import Link from 'uikit/Link';
import Instructions from './Instructions';
import Container from 'uikit/Container';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Typography from 'uikit/Typography';
import FileTable from './FileTable';
import Button, { BUTTON_VARIANTS } from 'uikit/Button';

const mockEntries = [
  {
    row: '1',
    isNew: true,
    some_key_1: 'key1',
    some_key_2: 'key2',
    some_key_3: 'key3',
    some_key_4: 'key4',
    some_key_5: 'key5',
    some_key_6: 'key6',
    some_key_7: 'key7',
    some_key_8: 'key8',
    some_key_9: 'key9',
  },
  {
    row: '2',
    isNew: true,
    some_key_1: 'key1',
    some_key_2: 'key2',
    some_key_3: 'key3',
    some_key_4: 'key4',
    some_key_5: 'key5',
    some_key_6: 'key6',
    some_key_7: 'key7',
    some_key_8: 'key8',
    some_key_9: 'key9',
  },
];

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const fileRecords = mockEntries;

  const containerStyle = css`
    padding: 8px;
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  `;

  const pageHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const cardHeaderContainerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <SubmissionLayout
      contentHeader={
        <div css={pageHeaderStyle}>
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Register Samples
              </div>
              <Progress>
                <Progress.Item state="success" text="Updated" />
                <Progress.Item state="pending" text="Register" />
              </Progress>
            </Row>
          </TitleBar>
          <Link withChevron underline={false} bold>
            HELP
          </Link>
        </div>
      }
    >
      <Banner
        title={`1 unrecognized file has been uploaded: schrod-reg.tsv`}
        variant={BANNER_VARIANTS.ERROR}
        content={`Please retain the template file name and only append characters to the end. For example, registration<_optional_extension>.tsv`}
      />
      <Container
        css={css`
          ${containerStyle}
          padding-bottom: 0px;
        `}
      >
        <Instructions registrationEnabled={false} />
      </Container>
      <Container css={containerStyle}>
        <div css={cardHeaderContainerStyle}>
          <Typography color="primary" variant="title" component="div">
            File Preview
          </Typography>
          <Button variant={BUTTON_VARIANTS.TEXT}>Clear</Button>
        </div>
        <FileTable
          records={fileRecords}
          stats={{ existingCount: 2, newCount: 3 }}
          submissionInfo={{ createdAt: 'May 20, 2020', creator: 'Minh', fileName: 'Minh.tsv' }}
        />
      </Container>
    </SubmissionLayout>
  );
}
