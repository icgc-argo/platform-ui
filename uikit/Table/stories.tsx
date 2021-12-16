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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Table, { SelectTable, TableVariant } from '.';
import readme from './readme.md';
import selectTableDoc from './selectTable.md';

export const TABLE_VARIANTS: { [k in TableVariant]: k } = {
  DEFAULT: 'DEFAULT',
  STATIC: 'STATIC',
};

const TableStories = storiesOf(`${__dirname}`, module)
  .add(
    'Basic',
    () => {
      const knobs = {
        sortable: boolean('sortable', true),
        loading: boolean('loading', false),
        showPagination: boolean('showPagination', false),
        showPaginationTop: boolean('showPaginationTop', false),
        showPaginationBottom: boolean('showPaginationBottom', false),
        stripped: boolean('stripped', true),
        withResizeBlur: boolean('withResizeBlur', false),
        withRowBorder: boolean('withRowBorder', false),
        withOutsideBorder: boolean('withOutsideBorder', false),
        cellAlignment: select('cellAlignment', ['top', 'center', 'bottom'], 'center'),
      };
      const containerRef = React.createRef<HTMLDivElement>();
      return (
        <div ref={containerRef}>
          <Table
            {...knobs}
            parentRef={containerRef}
            data={[
              { id: 1, prop2: 5, prop3: 'some text 1' },
              {
                id: 2,
                prop2: 4,
                prop3:
                  'a large section of text that will probably be big enough to demonstrate the vertical alignment of cells',
              },
              { id: 3, prop2: 3, prop3: 'some text 3' },
              { id: 4, prop2: 2, prop3: 'some text 4' },
              { id: 5, prop2: 1, prop3: 'some text 5' },
            ]}
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
          />
        </div>
      );
    },
    { info: { text: readme } },
  )
  .add(
    'Variants',
    () => {
      const knobs = {
        variant: select('variant', TABLE_VARIANTS, TABLE_VARIANTS.DEFAULT),
      };
      const containerRef = React.createRef<HTMLDivElement>();
      return (
        <div ref={containerRef}>
          <Table
            {...knobs}
            parentRef={containerRef}
            data={[
              { id: 1, prop2: 5, prop3: 'some text 1' },
              { id: 2, prop2: 4, prop3: 'some text 2' },
              { id: 3, prop2: 3, prop3: 'some text 3' },
              { id: 4, prop2: 2, prop3: 'some text 4' },
              { id: 5, prop2: 1, prop3: 'some text 5' },
            ]}
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
          />
        </div>
      );
    },
    { info: { text: readme } },
  )
  .add(
    'SelectTable',
    () => {
      const containerRef = React.createRef<HTMLDivElement>();
      return (
        <div ref={containerRef}>
          <SelectTable
            //props to control selection
            keyField="idField"
            parentRef={containerRef}
            isSelected={(idField) => idField === 'id_2'}
            toggleSelection={action('toggle')}
            toggleAll={action('toggleAll')}
            //basic table props
            data={[
              { idField: 'id_1', prop2: 5, prop3: 'some text 1' },
              { idField: 'id_2', prop2: 4, prop3: 'some text 2' },
              { idField: 'id_3', prop2: 3, prop3: 'some text 3' },
              { idField: 'id_4', prop2: 2, prop3: 'some text 4' },
              { idField: 'id_5', prop2: 1, prop3: 'some text 5' },
            ]}
            columns={[
              {
                sortable: false,
                Header: 'ID',
                accessor: 'idField',
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
          />
        </div>
      );
    },
    {
      info: {
        text: `${readme} ${selectTableDoc}`,
      },
    },
  )
  .add('No Data', () => {
    const containerRef = React.createRef<HTMLDivElement>();
    return (
      <div ref={containerRef}>
        <Table
          parentRef={containerRef}
          columns={[
            {
              sortable: false,
              Header: 'ID',
              accessor: 'idField',
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
        />
      </div>
    );
  });

export default TableStories;
