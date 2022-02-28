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

export enum EntityType {
  PRIMARY_DIAGNOSIS = 'primary_diagnosis',
  SPECIMEN = 'specimen',
  TREATMENT = 'treatment',
  FOLLOW_UP = 'follow_up',
  BIOMARKER = 'biomarker',
  DECEASED = 'deceased',
}

export type SampleNode = {
  node: {
    sample_id: string;
    sample_type: string;
    submitter_sample_id?: string;
    matched_normal_submitter_sample_id?: string;
  };
};

export type SpecimenNode = {
  node: {
    specimen_id: string;
    submitter_specimen_id: string;
    tumour_normal_designation: string;
    specimen_type: string;
    specimen_tissue_source?: string;
    samples: { hits: { edges: SampleNode[] } };
  };
};

export type TreatmentNode = {
  node: {
    treatment_type: string;
    data: Array<{}>;
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
