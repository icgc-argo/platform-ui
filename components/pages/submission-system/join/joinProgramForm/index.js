//@flow
import useFormHook from 'global/hooks/useFormHook';
import React from 'react';
import { Col, Row, ScreenClassRender } from 'react-grid-system';
import programsImage from 'static/programs.svg';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';
import Container from 'uikit/Container';
import { Input } from 'uikit/form';
import { INPUT_SIZES } from 'uikit/form/common';
import FormControl from 'uikit/form/FormControl';
import FormHelperText from 'uikit/form/FormHelperText';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import Typography from 'uikit/Typography';
import schema from './validation';

const FormContainer = styled(Container)`
  padding: 30px;
  max-width: 600px;
`;

const InfoCard = styled(Container)`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ProgramInfoCard = ({ programName, userRole }) => (
  <InfoCard>
    <img
      alt=""
      src={programsImage}
      css={css`
        margin-right: 16px;
      `}
    />
    <div>
      <Row nogutter>
        <Typography
          variant="label"
          color="primary"
          bold
          css={css`
            width: 150px;
          `}
        >
          Program Name:
        </Typography>
        <Typography variant="label" color="secondary" bold>
          {programName}
        </Typography>
      </Row>
      <Row nogutter>
        <Typography
          variant="label"
          color="primary"
          bold
          css={css`
            width: 150px;
          `}
        >
          Role:
        </Typography>
        <Typography variant="label" color="secondary" bold>
          {userRole}
        </Typography>
      </Row>
    </div>
  </InfoCard>
);

const Form = () => {};

const JoinProgramForm = ({
  programName,
  userRole,
  onSubmit,
}: {
  onSubmit: (data: any) => any,
  programName: string,
  userRole: string,
}) => {
  const { errors, data, setData, validateField, validateForm, touched, hasErrors } = useFormHook({
    initialFields: schema.cast({}),
    schema: schema,
  });

  const availableInstitutions = [];

  const handleBlur = fieldKey => _ => validateField({ key: fieldKey });

  const handleChange = fieldName => ({ target }) => setData({ key: fieldName, val: target.value });

  const submitForm = async () => {
    const validData = await validateForm();
    onSubmit(validData);
  };

  return (
    <FormContainer>
      <Row nogutter>
        <Typography
          variant="title"
          color="primary"
          css={css`
            margin: 0px;
          `}
        >
          Join a Program
        </Typography>
      </Row>
      <Row nogutter>
        <Typography variant="paragraph">
          You have been invited to join the following program, but first we need a few details.
        </Typography>
      </Row>
      <Row nogutter>
        <ProgramInfoCard programName={programName} userRole={userRole} />
      </Row>
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
                <Col sm={3} className="pt">
                  <InputLabel>Institution</InputLabel>
                </Col>
                <Col>
                  <MultiSelect
                    size={INPUT_SIZES.LG}
                    aria-label="institution-input"
                    allowNew
                    onBlur={handleBlur('institutions')}
                    value={data.institutions}
                    onChange={handleChange('institutions')}
                  >
                    {availableInstitutions.map(institution => (
                      <Option>{institution}</Option>
                    ))}
                  </MultiSelect>
                  {errors.institutions != null && (
                    <FormHelperText>{errors.institutions}</FormHelperText>
                  )}
                </Col>
              </Row>
            </FormControl>
            <Row nogutter>
              <Col sm={6}>
                <FormControl required error={!!errors.piFirstName}>
                  <Row nogutter>
                    <Col sm={6} className="pt">
                      <InputLabel required>PI First Name</InputLabel>
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
              <Col sm={6}>
                <FormControl required error={!!errors.piLastName}>
                  <Row
                    nogutter
                    style={{
                      ...(screenSize === 'xs'
                        ? {}
                        : {
                            paddingLeft: 10,
                          }),
                    }}
                  >
                    <Col sm={6} className="pt">
                      <InputLabel>PI Last Name</InputLabel>
                    </Col>
                    <Col>
                      <Input
                        size={INPUT_SIZES.LG}
                        aria-label="first-last-input"
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
                <Col sm={3} className="pt">
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
      <Row nogutter justify="end">
        <Button onClick={submitForm}>Join now</Button>
      </Row>
    </FormContainer>
  );
};

export default JoinProgramForm;
