import React from 'react';

import { useMutation } from 'react-apollo-hooks';

import css from '@emotion/css';
import styled from '@emotion/styled';
import Container from 'uikit/Container';
import Input from 'uikit/form/Input';
import Textarea from 'uikit/form/Textarea';
import FormControl from 'uikit/form/FormControl';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import Select from 'uikit/form/Select';
import { Row, Col } from 'react-grid-system';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';

import FormCheckbox from 'uikit/form/FormCheckbox';
import RadioCheckboxGroup from 'uikit/form/RadioCheckboxGroup';

import Link from 'next/link';

// $FlowFixMe .gql file not supported
import { CREATE_PROGRAM_MUTATION } from './mutations.gql';

/* ********************************* *
 * Repeated Component Styles/Layouts
 * ********************************* */
const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

const InputLabelWrapper = ({ sm = 3, children }) => (
  <Col sm={sm} style={{ paddingTop: 6 }}>
    {children}
  </Col>
);

/* ****************** *
 * On Change Handlers
 * ****************** */
const handleInputChange = setter => event => {
  setter(event.target.value);
};
const handleCheckboxGroupChange = (selectedItems, setter) => value => {
  if (selectedItems.has(value)) {
    selectedItems.delete(value);
  } else {
    selectedItems.add(value);
  }
  setter(new Set(selectedItems));
};

/* *************************************** *
 * Form Handlers / Submission / Validation
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
  const [processingRegions, setProcessionRegions] = React.useState(new Set([]));
  const [adminFirstName, setAdminFirstName] = React.useState('');
  const [adminLastName, setAdminLastName] = React.useState('');
  const [adminEmail, setAdminEmail] = React.useState('');

  // const [programName, setProgramName] = React.useState('Jon UI Test C');
  // const [shortName, setShortName] = React.useState('JONC-CA');
  // const [countries, setCountries] = React.useState(['CA']);
  // const [cancerTypes, setCancerTypes] = React.useState(['Myeloma']);
  // const [primarySites, setPrimarySites] = React.useState(['Lungs']);
  // const [commitmentLevel, setCommitmentLevel] = React.useState(120);
  // const [institutions, setInstitutions] = React.useState(['Ontario Science Center']);
  // const [membershipType, setMembershipType] = React.useState('FULL');
  // const [website, setWebsite] = React.useState('http://google.com');
  // const [description, setDescription] = React.useState('please delete me i was not meant to be');
  // const [processingRegions, setProcessionRegions] = React.useState(new Set(['North America']));
  // const [adminFirstName, setAdminFirstName] = React.useState('Jon');
  // const [adminLastName, setAdminLastName] = React.useState('Eubank');
  // const [adminEmail, setAdminEmail] = React.useState('joneubank@gmail.com');

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

  const submitForm = formData => {
    const result = sendCreateProgram();
  };

  const sendCreateProgram = useMutation(CREATE_PROGRAM_MUTATION, {
    variables: { program: createProgramInput(formData) },
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
          <FormControl error={false} required={true}>
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
                />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
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
                />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
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
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
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
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
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
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="commitment-level">Commitment Level</InputLabel>
              </InputLabelWrapper>
              <Col sm={3}>
                <Input
                  aria-label="Commitment Level"
                  id="commitment-level"
                  type="number"
                  value={commitmentLevel}
                  onChange={handleInputChange(setCommitmentLevel)}
                />
              </Col>
              <Col sm={6} style={{ paddingTop: 6, paddingLeft: 0 }}>
                <Typography component="span">Donors</Typography>
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="membership-type">Membership Type</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Select
                  aria-label="Membership Type"
                  id="membership-type"
                  options={[
                    { content: 'Full', value: 'FULL' },
                    { content: 'Associate', value: 'ASSOCIATE' },
                  ]}
                  onChange={setMembershipType}
                  value={membershipType}
                />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
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
                />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={false}>
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
                />
              </Col>
            </Row>
          </FormControl>
          <Row>
            <Col>
              <SectionTitle>Affiliated Institutions</SectionTitle>
            </Col>
          </Row>
          <FormControl error={false} required={false}>
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
              </Col>
            </Row>
          </FormControl>
          <Row>
            <Col>
              <SectionTitle>Processing Regions</SectionTitle>
            </Col>
          </Row>
          <FormControl error={false} required={true}>
            <Row>
              <Col>
                <InputLabel htmlFor="Processing Regions">
                  Please indicate the region(s) where data can be processed
                </InputLabel>
                <RadioCheckboxGroup
                  hasError={false}
                  onChange={handleCheckboxGroupChange(processingRegions, setProcessionRegions)}
                  isChecked={item => processingRegions.has(item)}
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
              <FormControl error={false} required={true}>
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
                    />
                  </Col>
                </Row>
              </FormControl>
            </Col>
            <Col sm={6}>
              <FormControl error={false} required={true}>
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
                    />
                  </Col>
                </Row>
              </FormControl>
            </Col>
          </Row>
          <FormControl error={false} required={true}>
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
                />
              </Col>
            </Row>
          </FormControl>
        </Col>
      </form>
      <Row
        justify="between"
        css={css`
          padding: 20px;
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
