import Container from 'uikit/Container';
import { css, keyframes } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import Table from 'uikit/Table';

export default () => {
  return (
    <div>
      <Container>
        <Row>
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
              columns={[{ sortable: false, accessor: 'id' }, { accessor: 'val' }]}
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
              columns={[{ sortable: false, accessor: 'id' }, { accessor: 'val' }]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
