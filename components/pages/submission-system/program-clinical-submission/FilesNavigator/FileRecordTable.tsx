import { ClinicalSubmissionEntityFile } from '../types';
import Table from 'uikit/Table';
import orderBy from 'lodash/orderBy';
import { css } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';

export default ({ file }: { file: ClinicalSubmissionEntityFile }) => {
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = file.records.length
    ? file.records[0].fields
    : [];
  const sortedRecords = orderBy<typeof file.records[0]>(file.records, 'row');
  const theme = useTheme();
  return (
    <div
      css={css`
        margin: 5px 10px;
      `}
    >
      <div css={css``}>
        <Table
          showPagination={false}
          columns={fields.map(({ name }) => ({
            accessor: name,
            Header: name,
          }))}
          data={sortedRecords.map(record =>
            record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
          )}
        />
      </div>
    </div>
  );
};
