import React from 'react';

import { useMutation } from 'react-apollo-hooks';

import { get, filter } from 'lodash';

import css from '@emotion/css';
import styled from '@emotion/styled';
import Container from 'uikit/Container';
import Input from 'uikit/form/Input';
import Textarea from 'uikit/form/Textarea';
import FormControl from 'uikit/form/FormControl';
import FormHelperText from 'uikit/form/FormHelperText';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import Select from 'uikit/form/Select';
import { Row, Col } from 'react-grid-system';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';

import FormCheckbox from 'uikit/form/FormCheckbox';
import RadioCheckboxGroup from 'uikit/form/RadioCheckboxGroup';

import Link from 'next/link';
import Router from 'next/router';

import * as yup from 'yup';

// $FlowFixMe .gql file not supported
import { CREATE_PROGRAM_MUTATION } from './mutations.gql';

/* 
VALUES
*/
const MEMBERSHIP_TYPES = [
  { content: 'Full', value: 'FULL' },
  { content: 'Associate', value: 'ASSOCIATE' },
];

/* ********************************* *
 * Repeated Component Styles/Layouts
 * ********************************* */
const SectionTitle = props => (
  <Typography component="h3" variant="sectionHeader" color="secondary" {...props} />
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
  submittedDonors: 0,
  genomicDonors: 0,
  website: formData.website,
  institutions: formData.institutions.join(','),
  countries: formData.countries.join(','),
  regions: Array.from(formData.processingRegions).join(','),
  membershipType: formData.membershipType,
  adminEmails: [formData.adminEmail],
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

/* *************************************** *
 * Form data validation
 * *************************************** */

const schema = yup.object().shape({
  programName: yup
    .string()
    .label('Program Name')
    .trim()
    .required(),
  shortName: yup
    .string()
    .label('Short Name')
    .trim()
    .max(9)
    .matches(/^[A-Z0-9\-]+$/, 'Short Name can only contain uppercase letters, numbers, and hyphens')
    .required(),
  countries: yup
    //TODO: once we have a known list, add validation: .oneOf(COUNTRY_CODES)
    .array()
    .of(
      yup
        .string()
        .length(2)
        .uppercase(),
    )
    .label('Countries')
    .required(),
  cancerTypes: yup
    //TODO: once we have a known list, add validation: .oneOf(CANCER_TYPES)
    //  might not want to validate against a rigid list if those values can change
    .array()
    .of(yup.string())
    .label('Cancer Types')
    .required()
    .min(1),
  primarySites: yup
    .array()
    .of(yup.string())
    .label('Primary Sites')
    .required()
    .min(1),
  commitmentLevel: yup
    .number()
    .label('Commitment Level')
    .moreThan(0)
    .required(),
  institutions: yup
    .array()
    .of(yup.string())
    .label('Institutions')
    .required(),
  membershipType: yup
    .string()
    .label('Membership Type')
    .required()
    .oneOf(MEMBERSHIP_TYPES.map(type => type.value), 'Invalid Membership Type provided.'),
  website: yup
    .string()
    .label('Website')
    .trim()
    .url(),
  description: yup
    .string()
    .label('Description')
    .trim(),
  processingRegions: yup
    .array()
    .of(yup.string())
    .label('Processing Regions')
    .required()
    .min(1),
  adminFirstName: yup
    .string()
    .label(`Administrator's First Name`)
    .required()
    .trim(),
  adminLastName: yup
    .string()
    .label(`Administrator's Last Name`)
    .required()
    .trim(),
  adminEmail: yup
    .string()
    .label(`Administrator's Email`)
    .email()
    .required()
    .trim(),
});

export default () => {
  const [programName, setProgramName] = React.useState('');
  const [shortName, setShortName] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [cancerTypes, setCancerTypes] = React.useState([]);
  const [primarySites, setPrimarySites] = React.useState([]);
  const [commitmentLevel, setCommitmentLevel] = React.useState();
  const [institutions, setInstitutions] = React.useState([]);
  const [membershipType, setMembershipType] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [processingRegions, setProcessionRegions] = React.useState([]);
  const [adminFirstName, setAdminFirstName] = React.useState('');
  const [adminLastName, setAdminLastName] = React.useState('');
  const [adminEmail, setAdminEmail] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});

  // const [programName, setProgramName] = React.useState('Jon UI Test A');
  // const [shortName, setShortName] = React.useState('JONA-CA');
  // const [countries, setCountries] = React.useState(['CA']);
  // const [cancerTypes, setCancerTypes] = React.useState(['Myeloma']);
  // const [primarySites, setPrimarySites] = React.useState(['Lungs']);
  // const [commitmentLevel, setCommitmentLevel] = React.useState(120);
  // const [institutions, setInstitutions] = React.useState(['Ontario Science Center']);
  // const [membershipType, setMembershipType] = React.useState('FULL');
  // const [website, setWebsite] = React.useState('http://google.com');
  // const [description, setDescription] = React.useState('please delete me i was not meant to be');
  // const [processingRegions, setProcessionRegions] = React.useState(['North America']);
  // const [adminFirstName, setAdminFirstName] = React.useState('Jon');
  // const [adminLastName, setAdminLastName] = React.useState('Eubank');
  // const [adminEmail, setAdminEmail] = React.useState('joneubank@gmail.com');
  // const [validationErrors, setValidationErrors] = React.useState({});

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
      schema
        .validate(formData, { abortEarly: false, stripUnknown: true })
        .then(data => {
          console.log(`validation success`);
          // Validate will perform data manipulations such as trimming strings.
          //  need to return the updated form data for submission.
          resolve(data);
        })
        .catch(err => {
          console.log(`validation failure`);
          const errors = get(err, 'inner', []).reduce((output, error) => {
            output[error.path] = error.message;
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
      console.log(validData);

      const result = await sendCreateProgram();
      Router.push('/programs');
    } catch (err) {
      window.scrollTo(0, 0);
      console.log(err);
    }
  };

  const sendCreateProgram = useMutation(CREATE_PROGRAM_MUTATION, {
    variables: { program: createProgramInput(validData) },
  });

  return (
    <Container
      css={css`
        margin: 10px auto;
        padding: 10px 40px;
        max-width: 875px;
      `}
    >
      <form name="createProgram" onSubmit={() => {}}>
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
                  size="lg"
                />
                <ErrorText error={validationErrors.programName} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.shortName} required={true}>
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
                >
                  <Option value="AU">Australia</Option>
                  <Option value="KH">Cambodia</Option>
                  <Option value="CM">Cameroon</Option>
                  <Option value="CA">Canada</Option>
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
                >
                  <Option value="Brain Cancer">Eye Cancer</Option>
                  <Option value="Hairy Cell Leukaemia">Hairy Cell Leukaemia</Option>
                  <Option value="Hodgkin Lymphoma">Hodgkin Lymphoma</Option>
                  <Option value="Myeloma">Myeloma</Option>
                  <Option value="Neuroblastoma">Neuroblastoma</Option>
                  <Option value="Pancreatic cancer">Pancreatic cancer</Option>
                </MultiSelect>
                <ErrorText error={validationErrors.cancerTypes} />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={validationErrors.primarySites} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="primary-types">Primary Types</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <MultiSelect
                  inputProps={{ id: 'primary-types' }}
                  value={primarySites}
                  onChange={handleInputChange(setPrimarySites)}
                >
                  <Option value="Lungs">Lungs</Option>
                  <Option value="Stomach">Stomach</Option>
                  <Option value="Pancreas">Pancreas</Option>
                  <Option value="Brain">Braaaaaaaaaaaaaiiiiiins</Option>
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
                  options={MEMBERSHIP_TYPES}
                  onChange={setMembershipType}
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
          <FormControl error={validationErrors.institutions} required={false}>
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
                      <FormCheckbox value="All">All</FormCheckbox>
                      <FormCheckbox value="Africa">Africa</FormCheckbox>
                      <FormCheckbox value="Asia">Asia</FormCheckbox>
                      <FormCheckbox value="Europe">Europe</FormCheckbox>
                    </Col>
                    <Col>
                      <FormCheckbox value="Oceania">Oceania</FormCheckbox>
                      <FormCheckbox value="North America">North America</FormCheckbox>
                      <FormCheckbox value="South America">South America</FormCheckbox>
                    </Col>
                  </Row>
                </RadioCheckboxGroup>
              </Col>
            </Row>
            <Row>
              <Col />
            </Row>
          </FormControl>
          <Row>
            <Col>
              <SectionTitle>Program Administrator</SectionTitle>
              <Typography variant="paragraph">
                Please assign a program administrator who will add and manage program members and
                collaborators. Note: the provided email address must be a Gmail or G Suite email
                address for login purposes.
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
                  size="lg"
                />
                <ErrorText error={validationErrors.adminEmail} />
              </Col>
            </Row>
          </FormControl>
        </Col>
      </form>
      <Row
        justify="between"
        css={css`
          padding: 15px;
        `}
      >
        <Link href="/programs">
          <Button variant="text">Cancel</Button>
        </Link>
        <Button onClick={submitForm}>Create</Button>
      </Row>
    </Container>
  );
};
