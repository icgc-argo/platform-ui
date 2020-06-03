import React from 'react';
import { storiesOf } from '@storybook/react';
import QueryBar from './index';
import { CombinationKeys, ArrayFieldKeys, ScalarFieldKeys } from '../utils/types';

const QueryBarStories = storiesOf(`${__dirname}`, module)
  .add('one field, one value', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: ['lung'],
            },
          },
        ],
      }}
    />
  ))
  .add('one field, two values', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: ['lung', 'heart'],
            },
          },
        ],
      }}
    />
  ))
  .add('one field, 5 values', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: ['lung', 'heart', 'brain', 'blood', 'kidney'],
            },
          },
        ],
      }}
    />
  ))
  .add('one field, 20 values', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: [
                'lung',
                'heart',
                'brain',
                'blood',
                'kidney',
                'lung1',
                'heart1',
                'brain1',
                'blood1',
                'kidney1',
                'lung2',
                'heart2',
                'brain2',
                'blood2',
                'kidney2',
                'lung3',
                'heart3',
                'brain3',
                'blood3',
                'kidney3',
              ],
            },
          },
        ],
      }}
    />
  ))
  .add('two fields, 3 values each', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: ['lung', 'heart', 'brain'],
            },
          },
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'gender',
              value: ['female', 'male', 'unknown'],
            },
          },
        ],
      }}
    />
  ))
  .add('range', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ScalarFieldKeys.GreaterThanEqualTo,
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['1'],
            },
          },
          {
            op: ScalarFieldKeys.LesserThanEqualTo,
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['5'],
            },
          },
        ],
      }}
    />
  ))
  .add('range and term', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ScalarFieldKeys.GreaterThanEqualTo,
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['1'],
            },
          },
          {
            op: ScalarFieldKeys.LesserThanEqualTo,
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['5'],
            },
          },
          {
            op: ArrayFieldKeys.In,
            content: {
              field: 'primary_site',
              value: ['heart', 'lung', 'bone', 'blood', 'liver'],
            },
          },
        ],
      }}
    />
  ))
  .add('value is not array', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.Is,
            content: {
              field: 'gender',
              value: 'female',
            },
          },
          {
            op: ArrayFieldKeys.Is,
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: 5,
            },
          },
        ],
      }}
    />
  ))
  .add('text filter', () => (
    <QueryBar
      filters={{
        op: CombinationKeys.And,
        content: [
          {
            op: ArrayFieldKeys.Filter,
            content: {
              fields: ['gender', 'state', 'country'],
              value: 'fema',
            },
          },
        ],
      }}
    />
  ));

export default QueryBarStories;
