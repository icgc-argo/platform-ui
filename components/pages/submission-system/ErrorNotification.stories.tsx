import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ErrorNotification from './ErrorNotification';

const TableStories = storiesOf(`${__dirname}`, module).add('ErrorNotification', () => {
  return (
    <ErrorNotification
      title="Error title"
      subtitle="Some error subtitle"
      columnConfig={[
        { Header: 'field 1', accessor: 'field1' },
        { Header: 'field 2', accessor: 'field2' },
        { Header: 'field 3', accessor: 'field3' },
      ]}
      onClearClick={action('onClearClick')}
      errors={[
        {
          field1: 'value 1',
          field2: 'value 2',
          field3:
            'Lorem ipsum dolor amet swag offal whatever palo santo, iceland distillery mustache etsy freegan bespoke',
        },
        {
          field1: 'value 1',
          field2: 'value 2',
          field3:
            'Lorem ipsum dolor amet swag offal whatever palo santo, iceland distillery mustache etsy freegan bespoke',
        },
        {
          field1: 'value 1',
          field2: 'value 2',
          field3:
            'Lorem ipsum dolor amet swag offal whatever palo santo, iceland distillery mustache etsy freegan bespoke',
        },
      ]}
    />
  );
});

export default TableStories;
