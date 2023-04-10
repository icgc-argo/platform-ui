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

import { Associations, FileRecord } from '../file-entity/types';
import { SamplesTableRecord } from './ClinicalTimeline/Samples';
import { donorCentricDisplayNames } from './ClinicalTimeline/util';

export interface DonorCentricRecord {
  donor_id: string;
  program_id: string;
  submitter_donor_id: string;
  gender: string;
  vital_status: string;
  primary_site: string;
  cancer_type?: string;
  cause_of_death?: string;
  age_at_diagnosis?: number;
  associations: Associations;
  survival_time?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  genetic_disorders?: string;
  menopause_status?: string;
  age_at_menarche?: number;
  number_of_pregnancies?: number;
  number_of_children?: number;
  hrt_type?: string;
  hrt_duration?: number | string;
  contraception_type?: string;
  contraception_duration?: number | string;
  specimens?: {
    hits: {
      edges: SpecimenNode[];
    };
  };
  follow_ups?: {
    hits: {
      edges: FollowUpNode[];
    };
  };
  primary_diagnosis?: {
    hits: {
      edges: DiagnosisNode[];
    };
  };
  treatments?: {
    hits: {
      edges: TreatmentNode[];
    };
  };
  files?: {
    hits: {
      edges: FileRecord[];
    };
  };
}

export type DonorCentricQuery = {
  hits: {
    edges: [{ node: DonorCentricRecord }];
  };
};

export interface DonorEntity {
  donorId: string;
  programId: string;
  gender: string;
  vitalStatus: string;
  causeOfDeath?: string;
  survivalTime?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  geneticDisorders?: string;
  menopauseStatus?: string;
  ageAtMenarche?: number;
  numberOfPregnancies?: number;
  numberOfChildren?: number;
  hrtType?: string;
  hrtDuration?: number | string;
  contraceptionType?: string;
  contraceptionDuration?: number | string;
  specimens?: {
    hits: {
      edges: SpecimenNode[];
    };
  };
  follow_ups?: {
    hits: {
      edges: FollowUpNode[];
    };
  };
  primary_diagnosis?: {
    hits: {
      edges: DiagnosisNode[];
    };
  };
  treatments?: {
    hits: {
      edges: TreatmentNode[];
    };
  };
  files?: {
    hits: {
      edges: FileRecord[];
    };
  };
}

export type DiagnosisNode = {
  node: {
    primary_diagnosis_id: string;
    program_id: string;
    submitter_donor_id: string;
    submitter_primary_diagnosis_id: string;
    age_at_diagnosis: number;
    cancer_type_code: string;
    cancer_type_additional_information?: string;
    basis_of_diagnosis?: string;
    laterality?: string;
    lymph_nodes_examined_status: string;
    number_lymph_nodes_examined?: number;
    number_lymph_nodes_positive?: number;
    clinical_tumour_staging_system?: string;
    clinical_t_category?: string;
    clinical_n_category?: string;
    clinical_m_category?: string;
    clinical_stage_group?: string;
    presenting_symptoms?: string;
    performance_status?: string;
  };
};

export type FollowUpNode = {
  node: {
    id: string;
    // TODO: Remove Dummy Type Data
    data: Array<{}>;
    program_id?: string;
    submitter_donor_id?: string;
    submitter_follow_up_id?: string;
    interval_of_followup?: number;
    disease_status_at_followup?: string;
    submitter_primary_diagnosis_id?: string;
    submitter_treatment_id?: string;
    weight_at_followup?: number;
    relapse_type?: string;
    relapse_interval?: number;
    method_of_progression_status?: string;
    anatomic_site_progression_or_recurrence?: string;
    recurrence_tumour_staging_system?: string;
    recurrence_t_category?: string;
    recurrence_n_category?: string;
    recurrence_m_category?: string;
    recurrence_stage_group?: string;
    posttherapy_tumour_staging_system?: string;
    posttherapy_t_category?: string;
    posttherapy_n_category?: string;
    posttherapy_m_category?: string;
    posttherapy_stage_group?: string;
  };
};

export type SampleNode = {
  node: {
    sample_id?: string;
    sample_type: string;
    submitter_sample_id: string;
    experimental_strategies?: string;
    workflow_names?: string;
    matched_normal_submitter_sample_id?: string;
    available_files?: number;
  };
};

export type SpecimenNode = {
  node: {
    program_id: string;
    submitter_primary_diagnosis_id: string;
    submitter_specimen_id: string;
    tumour_normal_designation: string;
    specimen_acquisition_interval: number;
    specimen_type: string;
    specimen_anatomic_location: string;
    samples: { hits: { edges: SampleNode[] } };
    specimen_laterality?: string;
    specimen_processing?: string;
    specimen_storage?: string;
    specimen_tissue_source?: string;
    pathological_tumour_staging_system?: string;
    pathological_t_category?: string;
    pathological_n_category?: string;
    pathological_m_category?: string;
    pathological_stage_group?: string;
    percent_tumour_cells?: number;
    percent_proliferating_cells?: number;
    percent_inflammatory_tissue?: number;
    percent_stromal_cells?: number;
    percent_necrosis?: number;
    reference_pathology_confirmed?: string;
    tumour_histological_type?: string;
    tumour_grading_system?: string;
    tumour_grade?: string;
  };
};

// NOTE: types based on dummy data
export type TreatmentData = {
  drug_rxnormcui: string;
  drug_name: string;
  cumulative_drug_dose: string;
  chemotherapy_dosage_units: string;
};

export type TreatmentNode = {
  node: {
    treatment_type: string;
    data: Array<TreatmentData>;
    program_id?: string;
    submitter_donor_id?: string;
    submitter_treatment_id?: string;
    submitter_primary_diagnosis_id?: string;
    is_primary_treatment?: string;
    line_of_treatment?: number;
    treatment_start_interval?: number;
    treatment_duration?: number;
    days_per_cycle?: number;
    number_of_cycles?: number;
    treatment_intent?: string;
    treatment_setting?: string;
    response_to_treatment?: string;
    outcome_of_treatment?: string;
    toxicity_type?: string;
    hematological_toxicity?: string;
    'non-hematological_toxicity'?: string;
    adverse_events?: string;
    clinical_trials_database?: string;
    clinical_trial_number?: string;
  };
};

export enum EntityType {
  PRIMARY_DIAGNOSIS = 'primary_diagnosis',
  SPECIMEN = 'specimen',
  TREATMENT = 'treatment',
  FOLLOW_UP = 'follow_up',
  BIOMARKER = 'biomarker',
  DECEASED = 'deceased',
}

export type Entity = {
  type: EntityType;
  id: string;
  description: string;
  interval: number;
  data?: {};
  samples?: Array<SampleNode>;
  invalid?: Boolean;
  treatments?: Array<TreatmentNode>;
};

export interface DonorEntityData extends Entity {}

export type AliasedDisplayData = {
  [K in keyof typeof donorCentricDisplayNames]?: any;
};

export type Specimens = {
  id: string;
  description: string;
  type: string;
  interval: string;
  data: AliasedDisplayData;
  samples: SamplesTableRecord;
};

export type TableDataValue = string | number | React.ReactNode;
