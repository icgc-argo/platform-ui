// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import ErrorTable from '.';

const SAMPLE_ERRORS = [
  {
    row: 2,
    sampleID: 8013218,
    field: 'Submitter Specimen ID',
    errorValue: 'ICGC_0007',
    errorDescription:
      'Sample is attached to two different specimens in your file. Samples can only be linked to a single specimen.',
  },
];

const ErrorTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ErrorTable count={8} errors={SAMPLE_ERRORS} />
));

export default ErrorTableStories;
