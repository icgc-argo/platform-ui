//@flow
import * as React from 'react';
import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import Table from 'uikit/Table';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import type { TableProps } from 'uikit/Table';

const TABLE_COLS = [
  { Header: 'Row #', accessor: 'row', width: 90 },
  { Header: 'Submitter Sample ID', accessor: 'sampleID', width: 175 },
  { Header: 'Field with Error', accessor: 'field', width: 175 },
  { Header: 'Error Value', accessor: 'value', width: 120 },
  { Header: 'Error Description', accessor: 'message', style: { whiteSpace: 'unset' } },
];

const Container = styled('div')`
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.error_1};
  background-color: ${({ theme }) => theme.colors.error_4};
  padding: 12px 7px 13px 10px;
  min-width: 400px;
`;

type Data = { [k: string]: any };

const ErrorTable = ({
  errors,
  count,
  onClear,
  onDownload,
}: {
  errors: Array<Data>,
  count: number,
  onClear: (x: any) => any,
  onDownload: (x: any) => any,
}) => (
  <Container>
    <div
      css={css`
        display: flex;
      `}
    >
      <Icon
        css={css`
          margin-right: 14px;
          min-width: 30px;
        `}
        name="warning"
        fill="error"
        width="30px"
        height="30px"
      />

      <div>
        <Typography
          css={css`
            margin-bottom: 8px;
          `}
          variant="sectionHeader"
          component="div"
          bold
        >
          {`Your file has ${count} errors`}
        </Typography>

        <Typography
          css={css`
            margin-bottom: 5px;
          `}
          variant="paragraph"
        >
          Your file cannot be processed. Please correct the following errors and reupload your file.
        </Typography>
      </div>

      <div
        css={css`
          margin-left: auto;
          min-width: 240px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        `}
      >
        <Button
          css={css`
            display: inline-block;
          `}
          variant={BUTTON_VARIANTS.SECONDARY}
          size={BUTTON_SIZES.SM}
          onClick={() => onDownload()}
        >
          <span
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Icon
              name="download"
              fill="accent2_dark"
              height="12px"
              css={css`
                margin-right: 5px;
              `}
            />
            ERROR REPORT
          </span>
        </Button>
        <Button
          css={css`
            display: inline-block;
          `}
          variant={BUTTON_VARIANTS.TEXT}
          size={BUTTON_SIZES.SM}
          onClick={() => onClear()}
        >
          Clear
        </Button>
      </div>
    </div>

    <Table data={errors} columns={TABLE_COLS} />
  </Container>
);

export default ErrorTable;
