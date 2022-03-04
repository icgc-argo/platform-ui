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

import { DonorRecord, FileRecord } from '../file-entity/types';
import { Entity, SpecimenNode, TreatmentNode } from './ClinicalTimeline/types';

export type DiagnosisNode = {
  node: {
    id: string;
    // TODO: Remove Dummy Type Data
    data: Array<{}>;
    program_id?: string;
    submitter_donor_id?: string;
    submitter_primary_diagnosis_id?: string;
    age_at_diagnosis?: number;
    cancer_type_code?: string;
    cancer_type_additional_information?: string;
    basis_of_diagnosis?: string;
    laterality?: string;
    lymph_nodes_examined_status?: string;
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

export interface DonorCentricRecord extends DonorRecord {
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
  hrtDuration?: number;
  contraceptionType?: string;
  contraceptionDuration?: number;
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

export interface DonorEntityData extends Entity {}
