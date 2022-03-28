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

import { DonorCentricRecord, DonorEntityData, EntityType } from './types';

export const dummyDonorEntity: DonorCentricRecord = {
  programId: 'TEST-PR',
  donorId: 'DO252999',
  submitterDonorId: 'HCC1143',
  primarySite: 'Pancreas',
  cancerType: 'Pancreatic Cancer',
  ageAtDiagnosis: '67 years',
  gender: Math.random() > 0.5 ? 'Female' : 'Male',
  vitalStatus: 'Deceased',
  causeOfDeath: 'Died of Cancer',
  survivalTime: '440 days',
  geneticDisorders: 'Gardner Syndrome, Multiple Endocrine Neoplasia Type 1 (MEN1)',
  height: 182.88,
  weight: 90.72,
  bmi: 27.12,
  menopauseStatus: '--',
  ageAtMenarche: 13,
  numberOfPregnancies: 0,
  numberOfChildren: 0,
  hrtType: '--',
  hrtDuration: '--',
  contraceptionType: '--',
  contraceptionDuration: '--',
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
            program_id: 'TEST-PR',
            primary_diagnosis_id: 'PD1',
            submitter_primary_diagnosis_id: 'PD1',
            specimen_id: 'SP212999',
            specimen_type: 'Normal',
            specimen_tissue_source: 'Blood derived',
            tumour_normal_designation: 'Normal',
            submitter_specimen_id: 'HCC1143_BAM_INPUT',
            specimen_acquisition_interval: 2,
            specimen_anatomic_location: 'C18',
            samples: {
              hits: {
                edges: [
                  {
                    node: {
                      sample_type: 'Total DNA',
                      submitter_sample_id: 'HCC1143_BAM_INPUT',
                      experimental_strategies: 'RNA-Seq',
                      workflow_names: '--',
                      available_files: 5,
                    },
                  },
                ],
              },
            },
          },
        },
        {
          node: {
            program_id: 'TEST-PR',
            primary_diagnosis_id: 'PD1',
            submitter_specimen_id: 'SP0032',
            tumour_normal_designation: 'Tumour',
            submitter_primary_diagnosis_id: 'PD1',
            specimen_id: 'SP0222',
            specimen_type: 'Normal',
            specimen_tissue_source: 'Blood derived',
            specimen_acquisition_interval: 12,
            specimen_anatomic_location: 'C18',
            pathological_tumour_staging_system: 'AJCC 7th edition',
            pathological_t_category: 'T0',
            pathological_n_category: 'N0a',
            pathological_m_category: 'M1b',
            pathological_stage_group: 'Stage IIIC',
            tumour_histological_type: '9691/36',
            specimen_laterality: 'Unknown',
            tumour_grading_system: 'Gleason grade group system',
            tumour_grade: 'High grade',
            percent_tumour_cells: 0.2,
            specimen_processing: 'Cryopreservation in dry ice (dead tissue)',
            reference_pathology_confirmed: 'Yes',
            specimen_storage: 'Frozen in liquid nitrogen',
            percent_proliferating_cells: 0.2,
            percent_inflammatory_tissue: 0.2,
            percent_stromal_cells: 0.2,
            percent_necrosis: 0.2,
            samples: {
              hits: {
                edges: [
                  {
                    node: {
                      submitter_sample_id: 'SAB5353',
                      sample_type: 'Amplified DNA',
                      experimental_strategies: 'WGS',
                      workflow_names: 'DNA Seq Alignment',
                      available_files: 7,
                    },
                  },
                  {
                    node: {
                      submitter_sample_id: 'SAD3053',
                      sample_type: 'Total DNA',
                      experimental_strategies: 'WXS',
                      workflow_names: 'Ribo-Zero RNA',
                      available_files: 3,
                    },
                  },
                ],
              },
            },
          },
        },
        {
          node: {
            program_id: 'TEST-PR',
            primary_diagnosis_id: 'PD1',
            submitter_specimen_id: 'SP0032',
            tumour_normal_designation: 'Tumour',
            submitter_primary_diagnosis_id: 'PD1',
            specimen_id: 'SP0032',
            specimen_tissue_source: 'Blood derived',
            specimen_type: 'Primary Tumour',
            pathological_tumour_staging_system: 'AJCC 7th',
            pathological_t_category: 'T0',
            pathological_n_category: 'N0',
            pathological_m_category: 'M0',
            pathological_stage_group: 'Stage IIIC',
            specimen_acquisition_interval: 353,
            tumour_histological_type: '9691/36',
            specimen_anatomic_location: 'C18',
            specimen_laterality: '--',
            specimen_processing: 'Cryopreservation in dry ice (dead tissue)',
            specimen_storage: 'Frozen in liquid nitrogen',
            tumour_grading_system: 'Gleason grade group system',
            tumour_grade: 'High grade',
            percent_tumour_cells: 0.2,
            percent_proliferating_cells: 0.2,
            percent_inflammatory_tissue: 0.2,
            percent_stromal_cells: 0.2,
            percent_necrosis: 0.2,
            samples: {
              hits: {
                edges: [
                  {
                    node: {
                      submitter_sample_id: 'SA8778',
                      sample_type: 'Other DNA Enrichments',
                      experimental_strategies: 'WGS, WXS',
                      workflow_names: 'DNA Seq Alignment, GATK Mutect VC',
                      available_files: 5,
                    },
                  },
                  {
                    node: {
                      submitter_sample_id: 'SA5432',
                      sample_type: 'Ribo-Zero RNA',
                      experimental_strategies: 'WGS, WXS',
                      workflow_names: '--',
                      available_files: 6,
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
      edges: [],
    },
  },
  primary_diagnosis: {
    hits: {
      edges: [],
    },
  },
  treatments: {
    hits: {
      edges: [],
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
    id: 'PRIMARY DIAGNOSIS PD2',
    description: 'C41.1',
    interval: 0,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplasm of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '20',
      'Clinical Tumour Staging System': 'Figo Staging System',
      'Clinical Stage Group': 'Stage IA1',
      'Stage Suffix': 'A',
      'Clinical T Category': 'N/A',
      'Clinical N Category': 'N/A',
      'Clinical M Category': 'N/A',
      'Presenting Symptoms': 'Back Pain, Pancreatitis, Vomiting',
      'Performance Status': '--',
    },
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
      'Cancer Type': 'Malignant neoplasm of pancreas',
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
  {
    type: EntityType.FOLLOW_UP,
    id: 'FOLLOW UP FO2123',
    data: {
      program_id: 'TEST-PR',
      submitter_donor_id: 'FO2123',
      submitter_follow_up_id: 'FO2123',
      submitter_primary_diagnosis_id: 'PD1',
      interval_of_followup: '392 days',
      disease_status_at_followup: 'Relapse or recurrence',
      relapse_type: 'Local recurrence',
      relapse_interval: '--',
      weight_at_followup: '72.57 kg',
      'Method of Progression Status': 'Diagnostic imaging',
      'Anatomic Site Progression or Recurrences': 'C18',
      'Recurrence Tumour Staging System': 'AJCC 8th edition',
      'Recurrence TNM Category': 'T1N1M1',
      'Recurrence Stage Group': 'Stage III',
      'Posttherapy Tumour Staging System': 'AJCC 8th edition',
      'Posttherapy TNM Category': 'T1N1M1',
    },
    description: 'Relapse',
    interval: 111,
  },
  {
    type: EntityType.BIOMARKER,
    id: 'BIOMARKER',
    description: '',
    interval: 181,
    data: {
      'Submitter Primary Diagnosis Id': '--',
      'Submitter Specimen Id': '--',
      'Submitter Treatment Id': '--',
      'Submitter Follow Up Id': '--',
      'Test Interval': 181,
      'CA19-9 Level': 20,
      'CRP Levels': 2,
      'LDH Level': '--',
      ANC: '--',
      ALC: '--',
      'BRCA Carrier': 'Both BRCA1 and BRCA2',
      'ER Status': '--',
      'ER Allred Score': 'Total ER Allred score of 3',
      'ER Percent Positive': '--',
      'HER2 IHC Status': '--',
      'HER2 ISH Status': '--',
      'PR Status': 'Negative',
      'PR Allred Score': '--',
      'PD-l1 Status': '--',
      'ALK IHC Status': '--',
      'ALK IHC Intensity': '--',
      'ALK Fish Status': '--',
      'ROS1 IHC Status': '--',
      'PAN-TRK IHC Status': '--',
      'RET Fish Status': '--',
      'HPV IHC Status': '--',
      'HPV DNA Status': '--',
    },
  },
  {
    type: EntityType.DECEASED,
    id: 'VITAL STATUS',
    data: { 'Age at Diagnosis': '28 years', 'Survival Time': '440 days' },
    description: 'Deceased',
    interval: 330,
  },
];

export const noData: DonorCentricRecord = {
  programId: '',
  donorId: '',
  submitterDonorId: '',
  primarySite: '',
  cancerType: '',
  ageAtDiagnosis: '',
  gender: '',
  vitalStatus: '',
  causeOfDeath: '',
  survivalTime: '',
  geneticDisorders: '',
  height: 0,
  weight: 0,
  bmi: 0,
  menopauseStatus: null,
  ageAtMenarche: 0,
  numberOfPregnancies: 0,
  numberOfChildren: 0,
  hrtType: null,
  hrtDuration: null,
  contraceptionType: null,
  contraceptionDuration: null,
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
      edges: [],
    },
  },
  primary_diagnosis: {
    hits: {
      edges: [],
    },
  },
  treatments: {
    hits: {
      edges: [],
    },
  },
  files: {
    hits: {
      edges: [],
    },
  },
};
