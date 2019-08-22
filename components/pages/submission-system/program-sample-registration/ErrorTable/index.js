import * as React from 'react';
import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import Table from 'uikit/Table';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';

const TABLE_COLS = [
  { Header: 'Row #', accessor: 'row' },
  { Header: 'Submitter Sample ID', accessor: 'sampleID' },
  { Header: 'Field with Error', accessor: 'field' },
  { Header: 'Error Value', accessor: 'errorValue' },
  { Header: 'Error Description', accessor: 'errorDescription' },
];

const Container = styled('div')`
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.error_1};
  background-color: ${({ theme }) => theme.colors.error_4};
  padding: 0 7px 13px 10px;
`;

const ErrorTable = ({ errors, count, onClear, onDownload }) => (
  <Container>
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Icon name="warning" fill="error" width="30px" height="30px" />
      <Typography
        css={css`
          margin-bottom: 8px;
        `}
        variant="sectionHeader"
        component="div"
      >
        {`Your file has ${count} errors`}
      </Typography>
      <div
        css={css`
          display: flex;
        `}
      >
        <Button variant={BUTTON_VARIANTS.SECONDARY} size={BUTTON_SIZES.SM}>
          <Icon name="edit" fill="accent2_dark" height="10px" /> ERROR REPORT
        </Button>
        <Button variant={BUTTON_VARIANTS.TEXT}>Clear</Button>
      </div>
    </div>
    <Typography
      css={css`
        margin-bottom: 5px;
      `}
      variant="paragraph"
      component="div"
    >
      Your file cannot be processed. Please correct the following errors and reupload your file.
    </Typography>
    <Table data={errors} columns={TABLE_COLS} />
  </Container>
);

export default ErrorTable;
