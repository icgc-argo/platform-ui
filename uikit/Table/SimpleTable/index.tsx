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

import Table from 'uikit/Table';

type MappedTableData = Array<{ key: string; val: any }>;

const SimpleTable = ({ data }) => {
  const tableData: MappedTableData = Object.keys(data).map((k) => ({ key: k, val: data[k] }));

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Table
        highlight={false}
        TheadComponent={(props) => null}
        parentRef={{ current: null }}
        showPagination={false}
        withOutsideBorder
        data={tableData}
        columns={[
          {
            sortable: false,
            accessor: 'key',
            style: { whiteSpace: 'unset', wordBreak: 'break-word' },
          },
          { accessor: 'val', style: { whiteSpace: 'unset', wordBreak: 'break-word' } },
        ]}
      />
    </div>
  );
};

export default SimpleTable;
