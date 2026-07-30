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

import { take, xor } from 'lodash';
import { useState } from 'react';

import Row from './Row';
import { replaceFilterSQON, toggleSQON } from './utils';

export const Bubble = ({ className = '', children, ...props }) => (
  <div className={`${className} sqon-bubble`} {...props}>
    <div>{children}</div>
  </div>
);

export const Field = ({ children, ...props }) => (
  <Bubble className="sqon-field" {...props}>
    {children}
  </Bubble>
);

export const Op = ({ children, ...props }) => (
  <Bubble className="sqon-op" {...props}>
    {children}
  </Bubble>
);

export const Value = ({ children, className = '', ...props }) => (
  <Bubble className={`sqon-value ${className}`} {...props}>
    {children}
  </Bubble>
);

/**
 * Originally a UI component from Arranger, extracted here to simplify library imports.
 * This has been modified since then to only render the SQON content of the QueryBar, the Clear
 * button functionality and some of the wrapping content has been moved into QueryBar itself.
 */
const SQONView = ({ sqon, FieldCrumb, ValueCrumb }) => {
  const sqonContent = sqon?.content || [];

  const [expanded, setExpanded] = useState([]);
  const onLessClicked = (valueSQON) => setExpanded(xor(expanded, [valueSQON]));
  const isExpanded = (valueSQON) => expanded.includes(valueSQON);

  return (
    <>
      {sqonContent.map((valueSQON, i) => {
        const {
          op,
          content: { field, fields, entity },
        } = valueSQON;
        const value = [].concat(valueSQON.content.value || []);
        const isSingleValue = !Array.isArray(value) || value.length === 1;
        return (
          <Row
            className="sqon-group"
            key={`${field || fields.join()}.${op}.${value.join()}`}
            style={{ alignItems: 'center' }}
          >
            {FieldCrumb({
              field: op === 'filter' ? (entity ? `${entity}.${op}` : op) : field,
              nextSQON: toggleSQON(
                {
                  op: 'and',
                  content: [valueSQON],
                },
                sqon,
              ),
            })}
            <Op>{(op === 'in' && isSingleValue) || op === 'filter' ? 'is' : op}</Op>
            {value.length > 1 && <span className="sqon-value-group sqon-value-group-start">(</span>}
            {(isExpanded(valueSQON) ? value : take(value, 2)).map((value) =>
              ValueCrumb({
                field,
                key: value,
                value,
                className: isSingleValue ? 'sqon-value-single' : '',
                nextSQON:
                  op === 'filter'
                    ? replaceFilterSQON(
                        {
                          op: 'and',
                          content: [
                            {
                              op: op,
                              content: {
                                ...(entity && { entity }),
                              },
                            },
                          ],
                        },
                        sqon,
                      )
                    : toggleSQON(
                        {
                          op: 'and',
                          content: [
                            {
                              op: op,
                              content: {
                                field: field,
                                value: [value],
                              },
                            },
                          ],
                        },
                        sqon,
                      ),
              }),
            )}
            {value.length > 2 && !isExpanded(valueSQON) && (
              <span className="sqon-more" onClick={() => onLessClicked(valueSQON)}>
                {'\u2026'}
              </span>
            )}
            {isExpanded(valueSQON) && (
              <div className="sqon-less" onClick={() => onLessClicked(valueSQON)}>
                Less
              </div>
            )}
            {value.length > 1 && <span className="sqon-value-group sqon-value-group-end">)</span>}
            {i < sqonContent.length - 1 && <Op>{sqon.op}</Op>}
          </Row>
        );
      })}
    </>
  );
};

export default SQONView;
