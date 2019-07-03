import { createPage } from 'global/utils/pages';
import Container from 'uikit/Container';
import css from '@emotion/css';
import styled from '@emotion/styled';
import Input from 'uikit/form/Input';
import Textarea from 'uikit/form/Textarea';
import FormControl from 'uikit/form/FormControl';
import InputLabel from 'uikit/form/InputLabel';
import FormHelperText from 'uikit/form/FormHelperText';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import { Row, Col } from 'react-grid-system';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';
import { Select } from 'uikit/form';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import RadioCheckboxGroup from 'uikit/form/RadioCheckboxGroup';
import FormCheckbox from 'uikit/form/FormCheckbox';

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

export default ({ logOut, pathname, router }) => {
  const [countries, setCountries] = React.useState([]);
  const [cancerTypes, setCancerTypes] = React.useState([]);

  const handleMultiSelectChange = setter => event => {
    setter(event.target.value);
  };

  return (
    <SubmissionLayout
      pathname={pathname}
      logOut={logOut}
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>Create a Program</>
          </TitleBar>
        </div>
      }
    >
      <Container
        css={css`
          margin: 24px 160px;
          padding: 26px 51px 42px 47px;
        `}
      >
        <Row>
          <Col>
            <Row>
              <Col>
                <SectionTitle>Program Details</SectionTitle>
              </Col>
            </Row>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="program-name">Program Name</InputLabel>
                </Col>
                <Col sm={9}>
                  <Input aria-label="Program Name" id="program-name" />
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="short-name">Short Name</InputLabel>
                </Col>
                <Col sm={9}>
                  <Input aria-label="Short Name" />
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="country">Country</InputLabel>
                </Col>
                <Col sm={9}>
                  <MultiSelect
                    inputProps={{ id: 'country' }}
                    value={countries}
                    onChange={handleMultiSelectChange(setCountries)}
                    placeholder="Add one or more..."
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
                <Col sm={3}>
                  <InputLabel htmlFor="cancer-type">Cancer Type</InputLabel>
                </Col>
                <Col sm={9}>
                  <MultiSelect
                    inputProps={{ id: 'cancer-type' }}
                    value={cancerTypes}
                    onChange={handleMultiSelectChange(setCancerTypes)}
                    placeholder="Add one or more..."
                  >
                    <Option value="Pancreatic cancer">Pancreatic cancer</Option>
                  </MultiSelect>
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="primary-site">Primary Site</InputLabel>
                </Col>
                <Col sm={9}>
                  <MultiSelect aria-label="Primary site" id="primary-site">
                    <Option value="ps1">Primary Site 1</Option>
                    <Option value="ps2">Primary site 2</Option>
                  </MultiSelect>
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="commitment-level">Commitment Level</InputLabel>
                </Col>
                <Col sm={9}>
                  <Input aria-label="Commitment Level" id="commitment-level" type="number" />
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="membership-type">Membership Type</InputLabel>
                </Col>
                <Col sm={9}>
                  <Select
                    aria-label="Membership Type"
                    id="membership-type"
                    options={[
                      { content: 'Full', value: 'full' },
                      { content: 'Associate', value: 'associate' },
                    ]}
                    onChange={x => x}
                  />
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
            <FormControl error={false} required={false}>
              <Row>
                <Col sm={3}>
                  <InputLabel htmlFor="description">Description</InputLabel>
                </Col>
                <Col sm={9}>
                  <Textarea aria-label="Description" id="description" />
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
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
                <Col sm={3}>
                  <InputLabel htmlFor="institution-name">Institution Name</InputLabel>
                </Col>
                <Col sm={9}>
                  <MultiSelect aria-label="Institution Name" id="institution-name">
                    <Option value="numero_uno">Institution Numero Uno (ES)</Option>
                    <Option value="awesomeness">Center for Awesomeness</Option>
                    <Option value="free_radicals_man">University of Free Radicals Man</Option>
                  </MultiSelect>
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
            <Row>
              <Col>
                <SectionTitle>Processing Regions</SectionTitle>
                <FormControl error={false} required={true}>
                  <Row>
                    <Col sm={12}>
                      <InputLabel htmlFor="processing-regions">
                        Please indicate the region(s) where data can be processed
                      </InputLabel>
                    </Col>
                    <Col sm={12}>
                      <RadioCheckboxGroup
                        aria-label="Processing Regions"
                        id="processing-regions"
                        onChange={x => x}
                        style={css`
                          margin-top: 5px;
                        `}
                      >
                        <Row>
                          <Col sm={6}>
                            <FormCheckbox value="all">All</FormCheckbox>
                            <FormCheckbox value="africa">Africa</FormCheckbox>
                            <FormCheckbox value="asia">Asia</FormCheckbox>
                            <FormCheckbox value="europe">Europe</FormCheckbox>
                          </Col>
                          <Col sm={6}>
                            <FormCheckbox value="Oceania">Oceania</FormCheckbox>
                            <FormCheckbox value="north-america">North America</FormCheckbox>
                            <FormCheckbox value="south-america">South America</FormCheckbox>
                          </Col>
                        </Row>
                      </RadioCheckboxGroup>
                      {/*               <FormHelperText>Some helper text</FormHelperText> */}
                    </Col>
                  </Row>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <SectionTitle>Program Administrator</SectionTitle>
                <Typography variant="paragraph">
                  Please assign a program administrator who will add and manage program members and
                  collaborators. Note: the provided email address must be a Gmail or G Suite email
                  address for login purposes.
                </Typography>
                <p />
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <FormControl error={false} required={true}>
                  <Row>
                    <Col sm={4}>
                      <InputLabel htmlFor="first-name">First Name</InputLabel>
                    </Col>
                    <Col sm={8}>
                      <Input aria-label="First Name" id="first-name" />
                      {/*               <FormHelperText>Some helper text</FormHelperText> */}
                    </Col>
                  </Row>
                </FormControl>
              </Col>
              <Col sm={6}>
                <FormControl error={false} required={true}>
                  <Row>
                    <Col sm={4}>
                      <InputLabel htmlFor="last-name">Last Name</InputLabel>
                    </Col>
                    <Col sm={8}>
                      <Input aria-label="Last Name" id="last-name" />
                      {/*               <FormHelperText>Some helper text</FormHelperText> */}
                    </Col>
                  </Row>
                </FormControl>
              </Col>
            </Row>
            <FormControl error={false} required={true}>
              <Row>
                <Col sm={2}>
                  <InputLabel htmlFor="email">Email Adress</InputLabel>
                </Col>
                <Col sm={10}>
                  <Input aria-label="Email" id="email" />
                  {/*               <FormHelperText>Some helper text</FormHelperText> */}
                </Col>
              </Row>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <div
            css={css`
              flex-direction: row;
              justify-content: space-between;
              flex: 1;
              display: flex;
            `}
          >
            <Button variant="text" onClick={() => {}}>
              Cancel
            </Button>

            <Button onClick={() => {}}>Create</Button>
          </div>
        </Row>
      </Container>
    </SubmissionLayout>
  );
};
