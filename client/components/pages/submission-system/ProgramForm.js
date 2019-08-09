// @flow
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
import * as React from 'react';
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
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';
import useFormHook from 'global/hooks/useFormHook';
import { PROGRAMS_LIST_PATH } from 'global/constants/pages';
import createProgramSchema from './create-program/validation';
import updateProgramSchema from './program-management/updateProgramValidator';

/* ********************************* *
 * Repeated Component Styles/Layouts
 * ********************************* */
const SectionTitle = props => (
  <Typography component="h3" variant="sectionHeader" color="secondary" bold {...props} />
);

const InputLabelWrapper = ({ sm = 3, children }: { sm?: number, children: React.Node }) => (
  <Col sm={sm} style={{ paddingTop: 6 }}>
    {children}
  </Col>
);

const ErrorText = ({ error }) => (error ? <FormHelperText>{error}</FormHelperText> : null);

/* *************************************** *
 * Reshape form data for gql input
 * *************************************** */
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
  onSubmit,
}: {
  leftFooterComponent: React.Node,
  program?: {
    name?: string,
    shortName?: string,
    countries?: string[],
    cancerTypes?: string[],
    primarySites?: string[],
    commitmentDonors?: string[],
    institutions?: string[],
    membershipType?: string[],
    website?: string,
    description?: string,
    regions?: string,
  },
  onSubmit: (data: any) => any,
}) {
  const formData = {
    programName: program.name || '',
    shortName: program.shortName || '',
    countries: program.countries || [],
    cancerTypes: program.cancerTypes || [],
    primarySites: program.primarySites || [],
    commitmentLevel: program.commitmentDonors,
    institutions: program.institutions || [],
    membershipType: program.membershipType || [],
    website: program.website || '',
    description: program.description || '',
    processingRegions: program.regions || '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
  };
  const isEditing = !isEmpty(program);
  const programSchema = isEditing ? updateProgramSchema : createProgramSchema;

  const { errors, data, setData, validateField, validateForm, touched, hasErrors } = useFormHook<
    typeof formData,
  >({
    initialFields: formData,
    schema: programSchema,
  });

  // TODO: ugly as sin
  const validationErrors = errors;
  const form = data;

  /* ****************** *
   * On Change Handlers
   * ****************** */
  const handleInputChange = (fieldName: string) => event =>
    setData({ key: fieldName, val: event.target.value });

  const handleInputBlur = fieldKey => event => validateField({ key: fieldKey });

  const handleCheckboxGroupChange = (selectedItems: any[], fieldName: string) => value => {
    if (selectedItems.includes(value)) {
      setData({ key: fieldName, val: filter(selectedItems, item => item !== value) });
    } else {
      setData({ key: fieldName, val: [...selectedItems, value] });
    }
  };

  const submitForm = async formData => {
    try {
      const validData = await validateForm();
      onSubmit(validData);
    } catch (err) {
      window.scrollTo(0, 0);
    }
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
                  value={form.programName}
                  onChange={handleInputChange('programName')}
                  onBlur={handleInputBlur('programName')}
                  size="lg"
                />
                <ErrorText error={validationErrors.programName} />
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
                  value={form.shortName}
                  onChange={handleInputChange('shortName')}
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
                  single={false}
                  inputProps={{ id: 'country' }}
                  value={form.countries}
                  onChange={handleInputChange('countries')}
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
                  value={form.cancerTypes}
                  onChange={handleInputChange('cancerTypes')}
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
                  value={form.primarySites}
                  onChange={handleInputChange('primarySites')}
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
                      value={form.commitmentLevel}
                      onChange={handleInputChange('commitmentLevel')}
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
                  onChange={val => setData({ key: 'membershipType', val })}
                  onBlur={handleInputBlur('membershipType')}
                  value={form.membershipType}
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
                  value={form.website}
                  onChange={handleInputChange('website')}
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
                  value={form.description}
                  onChange={handleInputChange('description')}
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
                  value={form.institutions}
                  onChange={handleInputChange('institutions')}
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
                  onChange={handleCheckboxGroupChange(
                    (form.processingRegions: any[]),
                    'processingRegions',
                  )}
                  isChecked={item => form.processingRegions.includes(item)}
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
                          value={form.adminFirstName}
                          onChange={handleInputChange('adminFirstName')}
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
                          value={form.adminLastName}
                          onChange={handleInputChange('adminLastName')}
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
                      value={form.adminEmail}
                      onChange={handleInputChange('adminEmail')}
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
