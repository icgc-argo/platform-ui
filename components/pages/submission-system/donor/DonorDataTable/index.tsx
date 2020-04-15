import { css } from 'uikit';
import Container from 'uikit/Container';
import { Row, Col } from 'react-grid-system';
import Table from 'uikit/Table';
import Typography from 'uikit/Typography';

export default () => {
  return (
    <div>
      <Container
        css={css`
          padding: 20px;
          padding-top: 0px;
        `}
      >
        <Row>
          <Col xs={12}>
            <Typography variant="subtitle">Summary</Typography>
          </Col>
          <Col xs={6}>
            <Table
              TheadComponent={props => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={[
                { id: 'Submitter Donor ID', val: '...' },
                { id: 'Gender', val: '...' },
                { id: 'Vital Status', val: '...' },
                { id: 'Cause of Death', val: '...' },
                { id: 'Survival Time', val: '...' },
                { id: 'Program Name', val: '...' },
                { id: 'Cancer Type', val: '...' },
                { id: 'Primary Site', val: '...' },
                { id: 'Height', val: '...' },
                { id: 'Weight', val: '...' },
              ]}
              columns={[
                { sortable: false, accessor: 'id', style: { whiteSpace: 'unset' } },
                { accessor: 'val', style: { whiteSpace: 'unset' } },
              ]}
            />
          </Col>
          <Col xs={6}>
            <Table
              TheadComponent={props => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={[
                { id: 'BMI', val: '...' },
                { id: 'Menopause Status', val: '...' },
                { id: 'Age at Menarche', val: '...' },
                { id: 'Number of Pregnancies', val: '...' },
                { id: 'Number of Birthed Children', val: '...' },
                { id: 'Prior Malignancy', val: '...' },
                { id: 'Cancer Type Prior Malignancy', val: '...' },
                { id: 'Age at Prior Malignancy', val: '...' },
                { id: 'Laterality of Prior Malignancy', val: '...' },
              ]}
              columns={[
                { sortable: false, accessor: 'id', style: { whiteSpace: 'unset' } },
                { accessor: 'val', style: { whiteSpace: 'unset' } },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
