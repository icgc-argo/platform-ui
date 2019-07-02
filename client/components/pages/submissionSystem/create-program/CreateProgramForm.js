import React from 'react';

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

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

const InputLabelWrapper = ({ sm = 3, children }) => (
  <Col sm={sm} style={{ paddingTop: 6 }}>
    {children}
  </Col>
);

export default () => {
  const [countries, setCountries] = React.useState([]);
  const [cancerTypes, setCancerTypes] = React.useState([]);
  const [primaryTypes, setPrimaryTypes] = React.useState([]);
  const [institutions, setInstitutions] = React.useState([]);
  const [membershipType, setMembershipType] = React.useState('');
  const [processingRegions, setProcessionRegions] = React.useState(new Set([]));

  const handleMultiSelectChange = setter => event => {
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
                <Input aria-label="Program Name" id="program-name" />
              </Col>
            </Row>
          </FormControl>
          <FormControl error={false} required={true}>
            <Row>
              <InputLabelWrapper sm={3}>
                <InputLabel htmlFor="short-name">Short Name</InputLabel>
              </InputLabelWrapper>
              <Col sm={9}>
                <Input aria-label="Short Name" />
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
                  onChange={handleMultiSelectChange(setCountries)}
                >
                  <Option value="Australia">Australia</Option>
                  <Option value="Cambodia">Cambodia</Option>
                  <Option value="Cameroon">Cameroon</Option>
                  <Option value="Canada">Canada</Option>
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
                  onChange={handleMultiSelectChange(setCancerTypes)}
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
                  value={primaryTypes}
                  onChange={handleMultiSelectChange(setPrimaryTypes)}
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
                <Input aria-label="Commitment Level" id="commitment-level" type="number" />
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
                    { content: 'Admin', value: 'ADMIN' },
                    { content: 'Submitter', value: 'SUBMITTER' },
                    { content: 'Collaborator', value: 'COLLABORATOR' },
                  ]}
                  onChange={setMembershipType}
                  value={membershipType}
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
                <Textarea aria-label="Description" id="description" />
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
                  onChange={handleMultiSelectChange(setInstitutions)}
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
                    <Input aria-label="First Name" id="first-name" />
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
                    <Input aria-label="Last Name" id="last-name" />
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
                <Input aria-label="Email" id="email" />
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
        <Button onClick={() => {}}>Create</Button>
      </Row>
    </Container>
  );
};
