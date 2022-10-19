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
import { compose, withState, withProps, withHandlers, defaultProps } from 'recompose';

import Row from './Row';
import { toggleSQON, replaceFilterSQON } from './utils';
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

const enhance = compose(
  defaultProps({
    FieldCrumb: ({ field, nextSQON }) => (
      <Field onClick={() => console.log(nextSQON)}>{field}</Field>
    ),
    ValueCrumb: ({ value, nextSQON, ...props }) => (
      <Value onClick={() => console.log(nextSQON)} {...props}>
        {value}
      </Value>
    ),
    Clear: ({ nextSQON }) => (
      <Bubble className="sqon-clear" onClick={() => console.log(nextSQON)}>
        Clear
      </Bubble>
    ),
  }),
  withState('expanded', 'setExpanded', []),
  withProps(({ expanded }) => ({
    isExpanded: (valueSQON) => expanded.includes(valueSQON),
  })),
  withHandlers({
    onLessClicked:
      ({ expanded, setExpanded }) =>
      (valueSQON) => {
        setExpanded(xor(expanded, [valueSQON]));
      },
  }),
);

const SQON = ({
  emptyMessage = 'Start by selecting filters',
  sqon,
  FieldCrumb,
  ValueCrumb,
  Clear,
  isExpanded,
  expanded,
  setExpanded,
  onLessClicked,
}) =>
  // : {
  //   emptyMessage: String,
  //   sqon: TGroupSQON,
  //   FieldCrumb: (props: TFieldCrumbArg) => any,
  //   ValueCrumb: (props: TValueCrumbArg) => any,
  //   Clear: (props: TClearArg) => any,
  //   isExpanded: (valueSQON: TValueSQON) => boolean,
  //   expanded: Array<TValueSQON>,
  //   setExpanded: () => void,
  //   onLessClicked: Function,
  // }
  {
    const sqonContent = sqon?.content || [];
    const isEmpty = sqonContent.length === 0;
    return (
      <div className={`sqon-view ${isEmpty ? 'sqon-view-empty' : ''}`}>
        {isEmpty && (
          <div className="sqon-empty-message">
            <span className="sqon-empty-message-arrow">{'\u2190'}</span>
            {` ${emptyMessage}`}
          </div>
        )}
        {sqonContent.length >= 1 && (
          <Row wrap>
            <Row className="sqon-group" key="clear" style={{ alignItems: 'center' }}>
              {Clear({ nextSQON: null })}
            </Row>
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
                  {value.length > 1 && (
                    <span className="sqon-value-group sqon-value-group-start">(</span>
                  )}
                  {(isExpanded(valueSQON) ? value : take(value, 2)).map((value, i) =>
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
                  {value.length > 1 && (
                    <span className="sqon-value-group sqon-value-group-end">)</span>
                  )}
                  {i < sqonContent.length - 1 && <Op>{sqon.op}</Op>}
                </Row>
              );
            })}
          </Row>
        )}
      </div>
    );
  };

export default enhance(SQON);
