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

import ReactTable from 'react-table';
import React from 'react';
import ReactTableContainer from './ReactTableContainer';

export default ({ propDefinitions }) => (
  <ReactTableContainer>
    <ReactTable
      minRows={0}
      showPagination={false}
      data={propDefinitions}
      columns={[
        { Header: 'property', accessor: 'property' },
        {
          Header: 'type',
          accessor: 'propType',
          Cell: ({ original }) =>
            !original.propType ? null : (
              <React.Fragment>
                {original.propType.name}
                {original.propType.name === 'enum' && (
                  <div>
                    {Array.isArray(original.propType.value)
                      ? original.propType.value.map(({ value }, i) => <div key={i}>- {value}</div>)
                      : original.propType.value}{' '}
                  </div>
                )}
              </React.Fragment>
            ),
        },
        {
          Header: 'required',
          accessor: 'required',
          Cell: ({ original }) =>
            original.required ? <React.Fragment>{String(original.required)}</React.Fragment> : null,
        },
        {
          Header: 'description',
          accessor: 'description',
          style: { whiteSpace: 'unset' },
        },
        {
          Header: 'default value',
          accessor: 'defaultValue',
          style: { whiteSpace: 'unset' },
          Cell: ({ original }) => {
            return <React.Fragment>{String(original.defaultValue)}</React.Fragment>;
          },
        },
      ]}
    />
  </ReactTableContainer>
);
