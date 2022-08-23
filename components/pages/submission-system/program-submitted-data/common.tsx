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
import { css } from '@icgc-argo/uikit';

export enum CoreCompletionEntities {
  donor = 'donor',
  primaryDiagnosis = 'primaryDiagnosis',
  normalSpecimens = 'normalSpecimens',
  tumourSpecimens = 'tumourSpecimens',
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

// Util for finding camelCase alias for snake_case values
export const reverseLookUpEntityAlias = (selectedClinicalEntity: string) =>
  Object.entries(aliasedEntityNames).find(([key, value]) => value === selectedClinicalEntity)[0];

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
          aliasedEntityFields.includes(entityName) &&
          reverseLookUpEntityAlias(entityName) === currentEntity,
      ),
  ).length > 0;

export const emptyResponse: ClinicalEntityQueryResponse = {
  clinicalData: {
    clinicalEntities: [],
    clinicalErrors: [],
  },
};

export const background = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: 0 0 25px 0;
  padding: 12px 17px 12px 17px;
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  font-family: WorkSans, sans-serif;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const titleParent = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-left: 10px;
`;

export const boldText = css`
  margin-left: 5px;
`;

export const clearFilter = css`
  background-color: inherit;
  border: none;
`;

export const rightSideGroup = css`
  display: felx;
  align-items: center;
  flex-wrap: wrap;
`;

export const filterParent = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 5px 10px 5px 10px;
`;

export const dropdown = css`
  width: fit-content;
  height: fit-content;
  margin: 0 0 0 7px;
  padding: 8px 8px 8px 8px;
`;

export const downArrow = css`
  margin-left: 10px;
  height: 9px;
`;

export const searchBarParent = css`
  display: flex;
  border-radius: 100px;
  border-style: solid;
  border-color: #babcc2;
  border-width: 1px;
  margin: 5px 10px 5px 10px;
`;

export const inputField = css`
  border-radius: 100px 0 0 100px;
  border-top: none;
  border-left: none;
  border-bottom: none;
  margin-right: 2px;
  width: 215px;
`;

export const filterButton = css`
  border-radius: 0 100px 100px 0;
  border: none;
`;

export const filterIcon = css`
  margin-right: 3px;
`;

export const downloadIcon = css`
  margin: 0 3px 0 3px;
`;
