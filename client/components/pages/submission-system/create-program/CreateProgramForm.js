import css from '@emotion/css';
import {
  CANCER_TYPES,
  COUNTRIES,
  PRIMARY_SITES,
  PROGRAM_MEMBERSHIP_TYPES,
  RDC_NAMES,
} from 'global/constants';
import { filter, get, isArray } from 'lodash';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Col, Row } from 'react-grid-system';
import Button from 'uikit/Button';
import Container from 'uikit/Container';
import FormCheckbox from 'uikit/form/FormCheckbox';
import FormControl from 'uikit/form/FormControl';
import FormHelperText from 'uikit/form/FormHelperText';
import Input from 'uikit/form/Input';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import RadioCheckboxGroup from 'uikit/form/RadioCheckboxGroup';
import Select from 'uikit/form/Select';
import Textarea from 'uikit/form/Textarea';
import Typography from 'uikit/Typography';
import * as yup from 'yup';
// $FlowFixMe .gql file not supported
import { CREATE_PROGRAM_MUTATION, UPDATE_PROGRAM_MUTATION } from './mutations.gql';
import createProgramSchema, { updateProgramSchema } from './validation';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';

/* ********************************* *
 * Repeated Component Styles/Layouts
 * ********************************* */
const SectionTitle = props => (
  <Typography component="h3" variant="sectionHeader" color="secondary" bold {...props} />
);

const InputLabelWrapper = ({ sm = 3, children }) => (
  <Col sm={sm} style={{ paddingTop: 6 }}>
    {children}
  </Col>
);

const ErrorText = ({ error }) => (error ? <FormHelperText>{error}</FormHelperText> : null);

/* ****************** *
 * On Change Handlers
 * ****************** */
const handleInputChange = setter => event => {
  setter(event.target.value);
};
const handleCheckboxGroupChange = (selectedItems, setter) => value => {
  if (selectedItems.includes(value)) {
    setter(filter(selectedItems, item => item !== value));
  } else {
    setter([...selectedItems, value]);
  }
};

/* *************************************** *
 * Reshape form data for gql input
 * *************************************** */

const createProgramInput = formData => ({
  name: formData.programName,
  shortName: formData.shortName,
  description: formData.description,
  commitmentDonors: parseInt(formData.commitmentLevel),
  website: formData.website,
  institutions: formData.institutions,
  countries: formData.countries,
  regions: Array.from(formData.processingRegions),
  membershipType: formData.membershipType,
  admins: [
    {
      email: formData.adminEmail,
      firstName: formData.adminFirstName,
      lastName: formData.adminLastName,
      role: 'ADMIN',
    },
  ],
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

const createUpdateProgramInput = formData => ({
  name: formData.programName,
  description: formData.description,
  commitmentDonors: parseInt(formData.commitmentLevel),
  website: formData.website,
  institutions: formData.institutions,
  countries: formData.countries,
  regions: Array.from(formData.processingRegions),
  membershipType: formData.membershipType,
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

/* *************************************** *
 * Form data validation
 * *************************************** */

export default function CreateProgramForm({
  leftFooterComponent,
  program = {},
  onSubmitted = () => {},
}) {
  const isEditing = !isEmpty(program);
  const [programName, setProgramName] = React.useState(program.name || '');
  const [shortName, setShortName] = React.useState(program.shortName || '');
  const [countries, setCountries] = React.useState(program.countries || []);
  const [cancerTypes, setCancerTypes] = React.useState(program.cancerTypes || []);
  const [primarySites, setPrimarySites] = React.useState(program.primarySites || []);
  const [commitmentLevel, setCommitmentLevel] = React.useState(program.commitmentDonors);
  const [institutions, setInstitutions] = React.useState(program.institutions || []);
  const [membershipType, setMembershipType] = React.useState(program.membershipType || '');
  const [website, setWebsite] = React.useState(program.website || '');
  const [description, setDescription] = React.useState(program.description || '');
  const [processingRegions, setProcessionRegions] = React.useState(program.regions || []);
  const [adminFirstName, setAdminFirstName] = React.useState('');
  const [adminLastName, setAdminLastName] = React.useState('');
  const [adminEmail, setAdminEmail] = React.useState('');

  const [validationErrors, setValidationErrors] = React.useState({});

  const programSchema = isEditing ? updateProgramSchema : createProgramSchema;

  /* **************** *
   * Form Submission
   * **************** */

  const formData = {
    programName,
    shortName,
    countries,
    cancerTypes,
    primarySites,
    commitmentLevel,
    institutions,
    membershipType,
    website,
    description,
    processingRegions,
    adminFirstName,
    adminLastName,
    adminEmail,
  };

  let validData = { ...formData };

  const validateForm = async () => {
    return await new Promise((resolve, reject) => {
      programSchema
        .validate(formData, { abortEarly: false, stripUnknown: true })
        .then(data => {
          // Validate will perform data manipulations such as trimming strings.
          //  need to return the updated form data for submission.
          resolve(data);
        })
        .catch(err => {
          const errors = get(err, 'inner', []).reduce((output, error) => {
            output[error.path.replace(/\[.*\]/, '')] = error.message;
            return output;
          }, {});
          setValidationErrors(errors);
          reject(errors);
        });
    });
  };

  const submitForm = async formData => {
    try {
      validData = await validateForm(formData);
      let result;
      if (!isEditing) {
        result = await sendCreateProgram();
        Router.push(PROGRAMS_LIST_PATH);
      } else {
        result = await sendUpdateProgram();
      }
      onSubmitted(validData);
    } catch (err) {
      window.scrollTo(0, 0);
    }
  };

  const [sendCreateProgram] = useMutation(CREATE_PROGRAM_MUTATION, {
    variables: { program: createProgramInput(validData) },
  });

  const [sendUpdateProgram] = useMutation(UPDATE_PROGRAM_MUTATION, {
    variables: { shortName: validData.shortName, updates: createUpdateProgramInput(validData) },
  });

  /* ********************* *
   * Field Level Validator
   * ********************* */

  const updateValidationErrorsForField = (path, value) => {
    setValidationErrors({ ...validationErrors, [path]: value });
  };

  const validateField = (path, value) => {
    yup
      .reach(programSchema, path)
      .validate(value, { abortEarly: false })
      .then(success => {
        updateValidationErrorsForField(path, '');
      })
      .catch(err => {
        const message =
          isArray(err.inner) && err.inner.length > 1
            ? err.inner[err.inner.length - 1].message
            : err.message;
        updateValidationErrorsForField(path, message);
      });
  };

  const handleInputBlur = path => event => {
    validateField(path, formData[path]);
  };

  return (
    <>
      <form name="createProgram">
        <Col>
          <Row>
            <Col>
              <SectionTitle>Program Details</SectionTitle>
            </Col>
          </Row>
          <FormControl error={validationErrors.programName} required={true}>
            <Row>
              <InputLabelWrapper>
                <InputLabel htmlFor="program-name">Program Name</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Input
                  aria-label="Program Name"
                  id="program-name"
                  value={programName}
                  onChange={handleInputChange(setProgramName)}
                  onBlur={handleInputBlur('programName')}
                  size="lg"
                />
                <ErrorText error={validationErrors.progranName} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.shortName} required={true} disabled={isEditing}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="short-name">Short Name</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Input
                  aria-label="Short Name"
                  id="short-name"
                  value={shortName}
                  onChange={handleInputChange(setShortName)}
                  onBlur={handleInputBlur('shortName')}
                  size="lg"
                />
                <ErrorText error={validationErrors.shortName} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.countries} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="country">Countries</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <MultiSelect
                  inputProps={{ id: 'country' }}
                  value={countries}
                  onChange={handleInputChange(setCountries)}
                  onBlur={handleInputBlur('countries')}
                >
                  {COUNTRIES.map(country => (
                    <Option value={country.name} key={country.code}>
                      {country.name}
                    </Option>
                  ))}
                </MultiSelect>
                <ErrorText error={validationErrors.countries} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.cancerTypes} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="cancer-types">Cancer Types</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <MultiSelect
                  inputProps={{ id: 'cancer-types' }}
                  value={cancerTypes}
                  onChange={handleInputChange(setCancerTypes)}
                  onBlur={handleInputBlur('cancerTypes')}
                >
                  {CANCER_TYPES.map(cancerType => (
                    <Option value={cancerType} key={cancerType.replace(/\s/, '')}>
                      {cancerType}
                    </Option>
                  ))}
                </MultiSelect>
                <ErrorText error={validationErrors.cancerTypes} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.primarySites} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="primary-types">Primary Sites</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <MultiSelect
                  inputProps={{ id: 'primary-types' }}
                  value={primarySites}
                  onChange={handleInputChange(setPrimarySites)}
                  onBlur={handleInputBlur('primarySites')}
                >
                  {PRIMARY_SITES.map(site => (
                    <Option value={site} key={site.replace(/\s/, '')}>
                      {site}
                    </Option>
                  ))}
                </MultiSelect>
                <ErrorText error={validationErrors.primarySites} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.commitmentLevel} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="commitment-level">Commitment Level</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Row>
                  <Col sm={4}>
                    <Input
                      aria-label="Commitment Level"
                      id="commitment-level"
                      type="number"
                      value={commitmentLevel}
                      onChange={handleInputChange(setCommitmentLevel)}
                      onBlur={handleInputBlur('commitmentLevel')}
                      size="lg"
                    />
                  </Col>
                  <Col sm={8} style={{ paddingTop: 6, paddingLeft: 0 }}>
                    <Typography component="span">Donors</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <ErrorText error={validationErrors.commitmentLevel} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.membershipType} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="membership-type">Membership Type</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Select
                  aria-label="Membership Type"
                  id="membership-type"
                  options={PROGRAM_MEMBERSHIP_TYPES}
                  onChange={setMembershipType}
                  onBlur={handleInputBlur('membershipType')}
                  value={membershipType}
                  size="lg"
                />
                <ErrorText error={validationErrors.membershipType} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.website} required={false}>
            <Row>
              <InputLabelWrapper>
                <InputLabel htmlFor="website">Website</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Input
                  aria-label="Website"
                  id="website"
                  value={website}
                  onChange={handleInputChange(setWebsite)}
                  onBlur={handleInputBlur('website')}
                  size="lg"
                />
                <ErrorText error={validationErrors.website} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.description} required={false}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="description">Description</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Textarea
                  aria-label="Description"
                  id="description"
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  onBlur={handleInputBlur('description')}
                  rows={5}
                />
                <ErrorText error={validationErrors.description} />
              </Col>
            </Row>
          </FormControl>
          <Row>
            <Col>
              <SectionTitle>Affiliated Institutions</SectionTitle>
            </Col>
          </Row>
          <FormControl error={validationErrors.institutions} required>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="Institutions">Institutions</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <MultiSelect
                  aria-label="Institutions"
                  id="institutions"
                  inputProps={{ id: 'institutions' }}
                  value={institutions}
                  onChange={handleInputChange(setInstitutions)}
                  onBlur={handleInputBlur('institutions')}
                  allowNew={true}
                >
                  <Option value="Ontario Science Center">Ontario Science Center</Option>
                  <Option value="Royal Ontario Museum">Royal Ontario Museum</Option>
                  <Option value="Toronto Metropolitan Zoo">Toronto Metropolitan Zoo</Option>
                </MultiSelect>
                <ErrorText error={validationErrors.institutions} />
              </Col>
            </Row>
          </FormControl>
          <Row>
            <Col>
              <SectionTitle>Processing Regions</SectionTitle>
            </Col>
          </Row>
          <FormControl error={validationErrors.processingRegions} required={true}>
            <Row>
              <Col>
                <InputLabel htmlFor="Processing Regions">
                  Please indicate the region(s) where data can be processed
                </InputLabel>
                <ErrorText error={validationErrors.processingRegions} />
                <RadioCheckboxGroup
                  hasError={false}
                  onChange={handleCheckboxGroupChange(processingRegions, setProcessionRegions)}
                  isChecked={item => processingRegions.includes(item)}
                >
                  <Row>
                    <Col>
                      {RDC_NAMES.slice(0, Math.ceil(RDC_NAMES.length / 2)).map(name => (
                        <FormCheckbox value={name} key={name}>
                          {name}
                        </FormCheckbox>
                      ))}
                    </Col>
                    <Col>
                      {RDC_NAMES.slice(Math.ceil(RDC_NAMES.length / 2), RDC_NAMES.length).map(
                        name => (
                          <FormCheckbox value={name} key={name}>
                            {name}
                          </FormCheckbox>
                        ),
                      )}
                    </Col>
                  </Row>
                </RadioCheckboxGroup>
              </Col>
            </Row>
            <Row>
              <Col />
            </Row>
          </FormControl>
          {!isEditing && (
            <>
              <Row>
                <Col>
                  <SectionTitle>Program Administrator</SectionTitle>
                  <Typography variant="paragraph">
                    Please assign a program administrator who will add and manage program members
                    and collaborators. Note: the provided email address must be a Gmail or G Suite
                    email address for login purposes.
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormControl error={validationErrors.adminFirstName} required={true}>
                    <Row>
                      <InputLabelWrapper sm={4}>
                        <InputLabel htmlFor="first-name">First Name</InputLabel>
                      </InputLabelWrapper>
                      <Col sm={8}>
                        <Input
                          aria-label="First Name"
                          id="first-name"
                          value={adminFirstName}
                          onChange={handleInputChange(setAdminFirstName)}
                          onBlur={handleInputBlur('adminFirstName')}
                          size="lg"
                        />
                        <ErrorText error={validationErrors.adminFirstName} />
                      </Col>
                    </Row>
                  </FormControl>
                </Col>
                <Col sm={6}>
                  <FormControl error={validationErrors.adminLastName} required={true}>
                    <Row>
                      <InputLabelWrapper sm={4}>
                        <InputLabel htmlFor="last-name">Last Name</InputLabel>
                      </InputLabelWrapper>
                      <Col sm={8}>
                        <Input
                          aria-label="Last Name"
                          id="last-name"
                          value={adminLastName}
                          onChange={handleInputChange(setAdminLastName)}
                          onBlur={handleInputBlur('adminLastName')}
                          size="lg"
                        />
                        <ErrorText error={validationErrors.adminLastName} />
                      </Col>
                    </Row>
                  </FormControl>
                </Col>
              </Row>
              <FormControl error={validationErrors.adminEmail} required={true}>
                <Row>
                  <InputLabelWrapper sm={2}>
                    <InputLabel htmlFor="email">Email Adress</InputLabel>
                  </InputLabelWrapper>
                  <Col sm={10}>
                    <Input
                      aria-label="Email"
                      id="email"
                      value={adminEmail}
                      onChange={handleInputChange(setAdminEmail)}
                      onBlur={handleInputBlur('adminEmail')}
                      size="lg"
                    />
                    <ErrorText error={validationErrors.adminEmail} />
                  </Col>
                </Row>
              </FormControl>
            </>
          )}
        </Col>
      </form>
      <Row
        justify="between"
        css={css`
          padding: 15px;
          flex-direction: row-reverse;
        `}
      >
        {isEditing ? (
          <Button
            onClick={submitForm}
            disabled={isEqual(program, merge({ ...program }, createUpdateProgramInput(formData)))}
          >
            Save
          </Button>
        ) : (
          <Button onClick={submitForm}>Create</Button>
        )}
        {leftFooterComponent}
      </Row>
    </>
  );
}
