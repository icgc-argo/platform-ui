
import { storiesOf } from '@storybook/react';
import React from 'react';
import ErrorTable from '.';
import { action } from '@storybook/addon-actions';

const SAMPLE_ERRORS = [
  {
    row: 2,
    sampleID: 8013218,
    field: 'Submitter Specimen ID',
    errorValue: 'ICGC_0007',
    errorDescription:
      'Sample is attached to two different specimens in your file. Samples can only be linked to a single specimen.',
  },
  {
    row: 4,
    sampleID: 8013215,
    field: 'Gender',
    errorValue: 'Male',
    errorDescription:
      'The value does not match the previously registered value for this sample. Please correct your file or contact DCC to update the registered data.',
  },
  {
    row: 5,
    sampleID: 8013214,
    field: 'Submitter Specimen ID',
    errorValue: 'ICGC_0007',
    errorDescription:
      'Sample has already been registered with a specimen. Samples can only be linked to a single specimen.  Please correct your file or contact DCC to update the registered data.',
  },
  {
    row: 25,
    sampleID: 8013213,
    field: 'Sample Type',
    errorValue: 'Blood',
    errorDescription: 'The value is not permissible for this field.',
  },
];

const ErrorTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ErrorTable
    count={8}
    errors={SAMPLE_ERRORS}
    onClear={action('clear')}
    onDownload={action('download')}
  />
));

export default ErrorTableStories;
