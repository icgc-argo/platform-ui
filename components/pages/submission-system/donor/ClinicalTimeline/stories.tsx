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

import { storiesOf } from '@storybook/react';
import React from 'react';
import ClinicalTimeline from '.';
import { EntityType } from './types';
import { select } from '@storybook/addon-knobs';

const mock = [
  {
    type: EntityType.PRIMARY_DIAGNOSIS,
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
    interval: 242222,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplam of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '',
      'Clinical Tumour Staging System': 'Binet',
      'Clinical Stage Group': '',
      'Stage Suffix': 'A',
      'Clinical T Category': '',
      'Clinical N Category': '',
      'Clinical M Category': '',
      'Presenting Symptoms': 'Back Pain',
      'Performance Status': '',
    },
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP0013',
    description: 'Normal',
    interval: 2,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplam of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '',
      'Clinical Tumour Staging System': 'Binet',
      'Clinical Stage Group': '',
    },
    samples: [{ id: 'SAB5353', type: 'Amplified DNA' }, { id: 'SAD3053', type: 'Total DNA' }],
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP0032',
    description: 'Tumour',
    interval: 353,
    data: {
      'Primary Diagnosis ID': 'PD1',
    },
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP2123',
    description: 'Tumour',
    interval: 36500,
    data: {
      'Age at Diagnosis': '28 years',
    },
    invalid: true,
  },
  { type: EntityType.SPECIMEN, id: 'SPECIMEN SP0123', description: 'Tumour', interval: 66 },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Chemotherapy',
    interval: 33333,
  },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Ablation',
    interval: 13525,
  },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Loco-regional progression',
    interval: 88664,
    data: {
      'Clinical Stage Group': '',
    },
  },
  { type: EntityType.FOLLOW_UP, id: 'FOLLOW UP FO2123', description: 'Relapse', interval: 111 },
  { type: EntityType.DECEASED, id: 'Vital Status', description: 'Deceased', interval: 330 },
];

const ClinicalTimelineStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = () => {
    const options = {
      full: mock,
      noData: [],
    };
    return { data: select('Data', options, options.full) };
  };

  return <ClinicalTimeline data={knobs().data} />;
});

export default ClinicalTimelineStories;
