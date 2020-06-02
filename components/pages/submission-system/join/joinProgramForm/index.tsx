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

import useFormHook from 'global/hooks/useFormHook';
import React from 'react';
import { Col, Row, ScreenClassRender } from 'react-grid-system';
import { css } from 'uikit';
import Button from 'uikit/Button';
import { Input } from 'uikit/form';
import { INPUT_SIZES } from 'uikit/form/common';
import FormControl from 'uikit/form/FormControl';
import FormHelperText from 'uikit/form/FormHelperText';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import Typography from 'uikit/Typography';
import schema from './validation';

const initialFields = schema.cast({});

const JoinProgramForm = ({
  programName,
  userRole,
  onSubmit,
  institutions,
}: {
  onSubmit: (data: typeof initialFields) => any;
  programName: string;
  userRole: string;
  institutions: Array<string>;
}) => {
  const { errors, data, setData, validateField, validateForm, touched, hasErrors } = useFormHook({
    initialFields,
    schema: schema,
  });

  const availableInstitutions = institutions || [];

  const handleBlur = (
    fieldKey: keyof typeof initialFields,
  ): React.ComponentProps<typeof MultiSelect>['onBlur'] => _ => validateField({ key: fieldKey });

  const handleChange = (
    fieldName: keyof typeof initialFields,
  ): React.ComponentProps<typeof MultiSelect>['onChange'] => ({ target }) =>
    setData({ key: fieldName, val: target.value });

  const submitForm: React.ComponentProps<typeof Button>['onClick'] = async () => {
    const validData = await validateForm();
    onSubmit(validData);
  };

  return (
    <div
      css={css`
        min-height: 400px;
      `}
    >
      <Row
        nogutter
        css={css`
          padding: 10px 0px;
        `}
      >
        <Typography variant="subtitle2" component="h2" color="secondary" bold>
          Primary Affiliation
        </Typography>
      </Row>
      <ScreenClassRender
        render={screenSize => (
          <div
            css={css`
              & .pt {
                padding-top: 8px;
              }
            `}
          >
            <FormControl required error={!!errors.institutions}>
              <Row nogutter>
                <Col sm={4} className="pt">
                  <InputLabel>Institution</InputLabel>
                </Col>
                <Col>
                  <MultiSelect
                    name="institution"
                    size={INPUT_SIZES.LG}
                    aria-label="institution-input"
                    allowNew
                    single
                    onBlur={handleBlur('institutions')}
                    value={data.institutions}
                    onChange={handleChange('institutions')}
                  >
                    {availableInstitutions.map(institution => (
                      <Option value={institution} key={institution.replace(/\s/g, '')}>
                        {institution}
                      </Option>
                    ))}
                  </MultiSelect>
                  {errors.institutions != null && (
                    <FormHelperText>{errors.institutions}</FormHelperText>
                  )}
                </Col>
              </Row>
            </FormControl>
            <Row nogutter>
              <Col>
                <FormControl required error={!!errors.piFirstName}>
                  <Row nogutter>
                    <Col sm={4} className="pt">
                      <InputLabel>PI First Name</InputLabel>
                    </Col>
                    <Col>
                      <Input
                        size={INPUT_SIZES.LG}
                        aria-label="first-name-input"
                        value={data.piFirstName}
                        onBlur={handleBlur('piFirstName')}
                        onChange={handleChange('piFirstName')}
                      />
                      {errors.piFirstName != null && (
                        <FormHelperText>{errors.piFirstName}</FormHelperText>
                      )}
                    </Col>
                  </Row>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl required error={!!errors.piLastName}>
                  <Row nogutter>
                    <Col sm={4} className="pt">
                      <InputLabel>PI Last Name</InputLabel>
                    </Col>
                    <Col>
                      <Input
                        size={INPUT_SIZES.LG}
                        aria-label="last-name-input"
                        value={data.piLastName}
                        onBlur={handleBlur('piLastName')}
                        onChange={handleChange('piLastName')}
                      />
                      {!!errors.piLastName && <FormHelperText>{errors.piLastName}</FormHelperText>}
                    </Col>
                  </Row>
                </FormControl>
              </Col>
            </Row>

            <FormControl required error={!!errors.department}>
              <Row nogutter>
                <Col sm={4} className="pt">
                  <InputLabel>Department</InputLabel>
                </Col>
                <Col>
                  <Input
                    size={INPUT_SIZES.LG}
                    aria-label="department-input"
                    value={data.department}
                    onBlur={handleBlur('department')}
                    onChange={handleChange('department')}
                  />
                  {!!errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                </Col>
              </Row>
            </FormControl>
          </div>
        )}
      />
      <Row
        nogutter
        justify="end"
        css={css`
          padding-top: 20px;
          margin-bottom: 13px;
        `}
      >
        <Button onClick={submitForm} id="join-now">
          Join now
        </Button>
      </Row>
    </div>
  );
};

export default JoinProgramForm;
