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

export enum CoreCompletionEntities {
  donor = 'donor',
  primaryDiagnosis = 'primaryDiagnosis',
  normalSpecimens = 'normalSpecimens',
  tumourSpecimens = 'tumourSpecimens',
  familyHistory = 'familyHistory',
  treatments = 'treatments',
  followUps = 'followUps',
}

export const CoreCompletionFields = Object.values(CoreCompletionEntities);

export type CoreCompletion = {
  CoreCompletionEntities: number;
};

export type CompletionStats = {
  coreCompletion: CoreCompletion;
  coreCompletionDate: string;
  coreCompletionPercentage: number;
  donorId: number;
  overriddenCoreCompletion: [CoreCompletionEntities];
};

export enum CompletionStates {
  all = 'all',
  invalid = 'invalid',
  complete = 'complete',
  incomplete = 'incomplete',
}

export type ClinicalEntity = {
  entityName: string;
  entityFields: string[];
  totalDocs: number;
  completionStats?: Array<CompletionStats>;
  records: Array<{
    name: string;
    value: any;
  }>[];
};

export type ClinicalErrorData = {
  donorId: string;
  submitterDonorId: string;
  errors: {
    entityName: string;
    errorType: string;
    fieldName: string;
    index: number;
    message: string;
  }[];
};

export type ClinicalEntityQueryResponse = {
  clinicalData: {
    programShortName?: string;
    clinicalEntities: Array<ClinicalEntity>;
    clinicalErrors: Array<ClinicalErrorData>;
  };
};

export type ClinicalFilter = {
  entityTypes: string[];
  page: number;
  pageSize: number;
  donorIds?: string[];
  submitterDonorIds?: string[];
  completionState?: CompletionStates;
  sort?: string;
};

export const clinicalEntityDisplayNames = {
  donor: 'Donor',
  sampleRegistration: 'Sample Registration',
  sample_registration: 'Sample Registration',
  specimens: 'Specimen',
  specimen: 'Specimen',
  primaryDiagnoses: 'Primary Diagnosis',
  primary_diagnosis: 'Primary Diagnosis',
  treatment: 'Treatment',
  chemotherapy: 'Chemotherapy',
  hormoneTherapy: 'Hormone Therapy',
  hormone_therapy: 'Hormone Therapy',
  immunotherapy: 'Immunotherapy',
  radiation: 'Radiation',
  surgery: 'Surgery',
  followUps: 'Follow Up',
  follow_up: 'Follow Up',
  familyHistory: 'Family History',
  family_history: 'Family History',
  exposure: 'Exposure',
  comorbidity: 'Comorbidity',
  biomarker: 'Biomarker',
};

export const aliasedEntityNames = {
  donor: 'donor',
  sampleRegistration: 'sample_registration',
  specimens: 'specimen',
  primaryDiagnoses: 'primary_diagnosis',
  familyHistory: 'family_history',
  treatment: 'treatment',
  chemotherapy: 'chemotherapy',
  immunotherapy: 'immunotherapy',
  surgery: 'surgery',
  radiation: 'radiation',
  followUps: 'follow_up',
  hormoneTherapy: 'hormone_therapy',
  exposure: 'exposure',
  comorbidity: 'comorbidity',
  biomarker: 'biomarker',
};

export const clinicalEntityFields = Object.keys(aliasedEntityNames);
export const aliasedEntityFields = Object.values(aliasedEntityNames);

export const reverseEntityNames = {
  donor: 'donor',
  sample_registration: 'sampleRegistration',
  specimen: 'specimens',
  primary_diagnosis: 'primaryDiagnoses',
  family_history: 'familyHistory',
  treatment: 'treatment',
  chemotherapy: 'chemotherapy',
  immunotherapy: 'immunotherapy',
  surgery: 'surgery',
  radiation: 'radiation',
  follow_up: 'followUps',
  hormone_therapy: 'hormoneTherapy',
  exposure: 'exposure',
  comorbidity: 'comorbidity',
  biomarker: 'biomarker',
};

export const aliasSortNames = {
  donor_id: 'donorId',
  program_id: 'programId',
  submitter_id: 'submitterId',
  DO: 'donorId',
  PD: 'primaryDiagnoses',
  NS: 'specimens',
  TS: 'familyHistory',
  TR: 'treatments',
  FO: 'followUps',
};

export const defaultClinicalEntityFilters: ClinicalFilter = {
  entityTypes: clinicalEntityFields,
  page: 0,
  pageSize: 20,
  donorIds: [],
  submitterDonorIds: [],
  completionState: CompletionStates['all'],
  sort: aliasSortNames.donor_id,
};

export const hasClinicalErrors = (
  { clinicalErrors }: ClinicalEntityQueryResponse['clinicalData'],
  currentEntity: string,
) =>
  clinicalErrors.length > 0 &&
  clinicalErrors.filter(
    (donor) =>
      donor.errors &&
      donor.errors.some(
        ({ entityName }) =>
          aliasedEntityFields.includes(entityName) && entityName === currentEntity,
      ),
  ).length > 0;

export const emptyResponse: ClinicalEntityQueryResponse = {
  clinicalData: {
    clinicalEntities: [],
    clinicalErrors: [],
  },
};
