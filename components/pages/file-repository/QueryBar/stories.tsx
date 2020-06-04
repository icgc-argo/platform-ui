/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import QueryBar from './index';

const QueryBarStories = storiesOf(`${__dirname}`, module)
  .add('one field, one value', () => (
    <QueryBar
      filters={{
        op: 'and',
        content: [
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: 'in',
            content: {
              field: 'primary_site',
              value: ['lung', 'heart', 'brain'],
            },
          },
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: '>=',
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['1'],
            },
          },
          {
            op: '<=',
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
        op: 'and',
        content: [
          {
            op: '>=',
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['1'],
            },
          },
          {
            op: '<=',
            content: {
              field: 'cases.exposures.cigarettes_per_day',
              value: ['5'],
            },
          },
          {
            op: 'in',
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
        op: 'and',
        content: [
          {
            op: 'is',
            content: {
              field: 'gender',
              value: 'female',
            },
          },
          {
            op: 'is',
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
        op: 'and',
        content: [
          {
            op: 'filter',
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
