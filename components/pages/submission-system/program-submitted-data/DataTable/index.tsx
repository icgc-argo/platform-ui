/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { useQuery } from '@apollo/react-hooks';
import memoize from 'lodash/memoize';
import React from 'react';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import Table from 'uikit/Table';
import Typography from 'uikit/Typography';
import { TableInfoHeaderContainer } from '../../common';
import CLINICAL_ENTITY_DATA from '../CLINICAL_ENTITY_DATA.gql';
import {
  ClinicalFilter,
  ClinicalEntityQueryResponse,
  clinicalEntityFields,
  defaultClinicalEntityFilters,
  emptyResponse,
} from '../common';

export type DonorEntry = {
  row: string;
  isNew: boolean;
  [k: string]: string | number | boolean;
};

const getColumnWidth = memoize<(keyString: string) => number>((keyString) => {
  const minWidth = 90;
  const maxWidth = 230;
  const spacePerChar = 9;
  const margin = 25;
  const targetWidth = keyString.length * spacePerChar + margin;
  return Math.max(Math.min(maxWidth, targetWidth), minWidth);
});

const DataTable = ({ entityType, program }: { entityType: string; program: string | string[] }) => {
  const filters: ClinicalFilter = {
    // TODO: Add user input for other filters
    ...defaultClinicalEntityFilters,
    entityTypes: [clinicalEntityFields.find((entity) => entity === entityType)],
  };
  const { page, limit } = filters;
  const min = page * limit + 1;
  const max = (page + 1) * limit;
  const containerRef = React.createRef<HTMLDivElement>();

  const { data: clinicalEntityData, loading } = useQuery<ClinicalEntityQueryResponse>(
    CLINICAL_ENTITY_DATA,
    {
      errorPolicy: 'all',
      variables: {
        programShortName: program,
        filters: filters,
      },
    },
  );

  const columns = [];
  let records = [];

  const { clinicalData } =
    clinicalEntityData == undefined || loading ? emptyResponse : clinicalEntityData;

  if (clinicalData.clinicalEntities.length > 0) {
    const entityData = clinicalData.clinicalEntities[0];

    records = entityData.records.map((record) => {
      let clinicalRecord = {};
      record.forEach((r) => {
        clinicalRecord[r.name] = r.value || '--';
      });
      return clinicalRecord;
    });

    entityData.records.forEach((record) => {
      record.forEach((r) => {
        if (!columns.includes(r.name)) columns.push(r.name);
      });
    });
  }

  return loading ? (
    <DnaLoader />
  ) : (
    <div
      ref={containerRef}
      css={css`
        position: relative;
      `}
    >
      <TableInfoHeaderContainer
        left={
          <Typography
            css={css`
              margin: 0px;
            `}
            variant="data"
          >
            Showing {min} - {max} of {limit}
          </Typography>
        }
      />
      <Table
        withOutsideBorder
        parentRef={containerRef}
        showPagination={true}
        sortable={true}
        manual
        pageSize={Number.MAX_SAFE_INTEGER}
        columns={columns.map((key) => ({
          id: key,
          accessor: key,
          Header: key,
          minWidth: getColumnWidth(key),
        }))}
        data={records}
        onPageSizeChange={(pageSize, pageIndex) => {
          console.log(pageSize);
          console.log(pageIndex);
          return {};
        }}
        onPageChange={(index) => {
          console.log(index);
          return {};
        }}
      />
    </div>
  );
};

export default DataTable;
