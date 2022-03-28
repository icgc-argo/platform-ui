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

import { css } from '@emotion/core';
import React, { createRef } from 'react';
import Table, { TableDataBase, TableColumnConfig } from 'uikit/Table';
import Typography from 'uikit/Typography';
import { formatTableDisplayNames } from './util';
import { SampleNode } from '../types';

const Samples = ({ samples }: { samples: SampleNode[] }) => {
  const tableData: TableDataBase = formatTableDisplayNames(samples);

  const tableCols: TableColumnConfig<TableDataBase>[] = Object.keys(tableData).map((key) => ({
    Header: key,
    Cell: tableData[key],
  }));
  const containerRef = createRef<HTMLDivElement>();

  return (
    <div
      css={css`
        margin: 14px 0 4px 0;
        width: 100%;
      `}
    >
      <Typography
        variant="navigation"
        as="div"
        css={css`
          margin-bottom: 4px;
        `}
      >
        Samples from this Specimen ({samples.length.toLocaleString()})
      </Typography>
      <div ref={containerRef}>
        <Table
          parentRef={containerRef}
          columns={tableCols}
          data={samples}
          withOutsideBorder
          stripped
          highlight={false}
          showPagination={false}
          sortable={false}
        />
      </div>
    </div>
  );
};

export default Samples;
