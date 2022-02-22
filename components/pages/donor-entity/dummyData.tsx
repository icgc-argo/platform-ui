/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { DonorCentricRecord, DonorEntityData } from './types';
import { EntityType } from '../submission-system/donor/ClinicalTimeline/types';

export const dummyDonorEntity: DonorCentricRecord = {
  programId: 'TEST-PR',
  donorId: 'DO252999',
  submitterDonorId: 'HCC1143',
  gender: 'Female',
  primarySite: 'Pancreas',
  cancerType: 'Pancreatic Cancer',
  ageAtDiagnosis: '67 years',
  vitalStatus: 'Deceased',
  causeOfDeath: 'Died of Cancer',
  survivalTime: '440 days',
  geneticDisorders: 'Gardner Syndrome',
  height: 182.88,
  weight: 90.72,
  bmi: 27.12,
  menopauseStatus: null,
  ageAtMenarche: 13,
  numberOfPregnancies: 0,
  numberOfChildren: 0,
  hrtType: null,
  hrtDuration: null,
  contraceptionType: null,
  contraceptionDuration: null,
  associations: {
    specimenId: 'SP9991',
    specimenType: 'Primary tumour',
    tumourNormalDesignation: 'Tumour',
    sampleId: 'SA9991',
    sampleType: 'Total DNA',
    matchedNormalSampleId: 'SP9934',
  },
  specimens: {
    hits: {
      edges: [
        {
          node: {
            specimen_tissue_source: 'Blood derived',
            specimen_type: 'Normal',
            tumour_normal_designation: 'Normal',
            submitter_specimen_id: 'HCC1143_BAM_INPUT',
            specimen_id: 'SP212999',
            samples: {
              hits: {
                edges: [
                  {
                    node: {
                      matched_normal_submitter_sample_id: null,
                      sample_id: 'SA613000',
                      sample_type: 'Total DNA',
                      submitter_sample_id: 'HCC1143_BAM_INPUT',
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
  follow_ups: {
    hits: {
      edges: [{}],
    },
  },
  primary_diagnosis: {
    hits: {
      edges: [{}],
    },
  },
  treatments: {
    hits: {
      edges: [{}],
    },
  },
  files: {
    hits: {
      edges: [
        {
          fileId: 'FL1203',
          dataType: 'Alignment QC',
          analysisWorkflow: 'DNA Seq Alignment',
          fileFormat: 'TXT',
          fileSize: 23195,
          actions: '',
        },
      ],
    },
  },
};

export const mockTimelineData: Array<DonorEntityData> = [
  {
    type: EntityType.PRIMARY_DIAGNOSIS,
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
    interval: 242222,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplasm of pancreas',
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
    samples: [
      { node: { sample_id: 'SAB5353', sample_type: 'Amplified DNA' } },
      { node: { sample_id: 'SAD3053', sample_type: 'Total DNA' } },
    ],
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
    description: 'Chemotherapy, Radiation therapy, Surgery',
    interval: 88664,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplam of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '',
      'Clinical Tumour Staging System': 'Binet',
      'Clinical Stage Group': '',
      'Primary Diagnosis IDs': 'PD1',
      'Age at Diagnosiss': '28 years',
      'Cancer Type Codee': 'C25.3',
    },
    treatments: [
      {
        node: {
          treatment_type: 'Chemotherapy',
          data: [
            {
              'Drug Rxnormcui': 242525,
              'Drug Name': 'Abraxane',
              'Cumulative Drug Dose': 100,
              'Chemotherapy Dosage Units': 'mg/m2',
            },
            {
              'Drug Rxnormcui': 242525,
              'Drug Name': 'Abraxane',
              'Cumulative Drug Dose': 100,
              'Chemotherapy Dosage Units': 'mg/m2',
            },
          ],
        },
      },
      {
        node: {
          treatment_type: 'Radiation',
          data: [
            {
              'Radiation Therapy Modality': 'Electron',
              'Radiation Treatment Type': 'Internal',
              'Radiation Therapy Fractions': 3,
              'Radiation Therapy Dosage': 3,
              'Anatomical Site Irradiated': 'Abdomen',
            },
          ],
        },
      },
    ],
  },
  { type: EntityType.FOLLOW_UP, id: 'FOLLOW UP FO2123', description: 'Relapse', interval: 111 },
  { type: EntityType.DECEASED, id: 'Vital Status', description: 'Deceased', interval: 330 },
];

export const noData: DonorCentricRecord = {
  programId: '',
  donorId: '',
  submitterDonorId: '',
  gender: '',
  primarySite: '',
  cancerType: '',
  ageAtDiagnosis: '',
  vitalStatus: '',
  associations: {
    specimenId: '',
    specimenType: '',
    tumourNormalDesignation: '',
    sampleId: '',
    sampleType: '',
    matchedNormalSampleId: '',
  },
  specimens: {
    hits: {
      edges: [],
    },
  },
  follow_ups: {
    hits: {
      edges: [{}],
    },
  },
  primary_diagnosis: {
    hits: {
      edges: [{}],
    },
  },
  treatments: {
    hits: {
      edges: [{}],
    },
  },
  files: {
    hits: {
      edges: [],
    },
  },
};
