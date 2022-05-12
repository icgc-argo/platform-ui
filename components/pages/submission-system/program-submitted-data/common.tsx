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

export enum CoreClinicalEntities {
  'donor',
  'specimens',
  'primaryDiagnosis',
  'followUps',
  'treatments',
}

export enum CompletionStates {
  all = 'all',
  invalid = 'invalid',
  complete = 'complete',
  incomplete = 'incomplete',
}

export type ClinicalEntity = {
  entityName: string;
  entityFields: string[];
  records: Array<{
    name: string;
    value: any;
  }>;
};

export type CompletionStats = {
  coreCompletion: CoreCompletionFields;
  coreCompletionDate: string;
  coreCompletionPercentage: number;
  overriddenCoreCompletion: [CoreClinicalEntities];
};

export type CoreCompletionFields = {
  [k in CoreClinicalEntities]: number;
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
  };
};

export type ClinicalEntityQueryResponse = {
  clinicalData: {
    clinicalEntities: Array<ClinicalEntity>;
    completionStats: Array<CompletionStats>;
    clinicalErrors: Array<ClinicalErrorData>;
  };
};

export type ClinicalFilter = {
  entityTypes: string[];
  page: number;
  limit: number;
  donorIds?: string[];
  submitterDonorIds?: string[];
  completionState?: CompletionStates;
  sort?: string;
};

export const clinicalEntityFilters: ClinicalFilter = {
  entityTypes: [
    'sampleRegistration',
    'donor',
    'specimens',
    'primaryDiagnoses',
    'familyHistory',
    'treatment',
    'chemotherapy',
    'immunotherapy',
    'surgery',
    'radiation',
    'followUps',
    'hormoneTherapy',
    'exposure',
    'comorbidity',
    'biomarker',
  ],
  page: 0,
  limit: 20,
  donorIds: [],
  submitterDonorIds: [],
  completionState: CompletionStates['all'],
  sort: '-donorId',
};
