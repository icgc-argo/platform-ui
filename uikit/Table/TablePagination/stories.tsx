/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import { storiesOf } from '@storybook/react';
import React from 'react';
import TablePagination from '.';
import times from 'lodash/times';
import { boolean } from '@storybook/addon-knobs';

import Table from '..';

export default storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const containerRef = React.createRef<HTMLDivElement>();
    return (
      <div ref={containerRef} style={{ width: '100%' }}>
        <Table
          parentRef={containerRef}
          data={times(104, (idx) => ({
            id: idx,
            prop2: idx,
            prop3: 'some text of ' + idx,
          }))}
          columns={[
            {
              sortable: false,
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Property 2',
              accessor: 'prop2',
            },
            {
              Header: 'Property 3',
              accessor: 'prop3',
            },
          ]}
          showPagination={boolean('showPagination', true)}
          showPageSizeOptions={boolean('showPageSizeOptions', true)}
        />
      </div>
    );
  },
  {
    info: {
      propTables: [TablePagination],
      propTablesExclude: [Table],
    },
  },
);
