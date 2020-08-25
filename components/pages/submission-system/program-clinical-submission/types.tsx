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

export type ClinicalSubmissionRecord = {
  row: number;
  fields: {
    value: string;
    name: string;
  }[];
};

export type ClinicalSubmissionError = {
  message: string;
  row: number;
  field: string;
  value: string;
  donorId: string;
  __typename: 'ClinicalSubmissionError';
};

export type ClinicalSubmissionUpdate = {
  row: number;
  field: string;
  newValue: string;
  oldValue: string;
  donorId: string;
  __typename: 'ClinicalSubmissionUpdate';
};

export type ClinicalSubmissionStatus =
  | 'OPEN'
  | 'VALID'
  | 'INVALID'
  | 'PENDING_APPROVAL'
  | 'INVALID_BY_MIGRATION'
  | null;

export type ClinicalSubmissionEntityFile = {
  clinicalType: string;
  displayName: string | null;
  recordsCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE' | 'UPDATE';

  createdAt: string;
  creator: string;
  fileName: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  dataWarnings: ClinicalSubmissionError[];
  schemaErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
  stats: GqlClinicalEntity['stats'];
};

export type GqlClinicalEntity = {
  clinicalType: string;
  batchName?: string;
  creator: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  dataWarnings: ClinicalSubmissionError[];
  schemaErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
  createdAt: string;
  stats?: {
    noUpdate: Array<ClinicalSubmissionRecord['row']>;
    updated: Array<ClinicalSubmissionRecord['row']>;
    new: Array<ClinicalSubmissionRecord['row']>;
    errorsFound: Array<ClinicalSubmissionRecord['row']>;
  };
};

export type GqlClinicalSubmissionData = {
  id: string;
  version: string;
  programShortName: string;
  state?: ClinicalSubmissionStatus;
  updatedAt: string;
  updatedBy: string;
  clinicalEntities: GqlClinicalEntity[];
  fileErrors: ClinicalError[];
  __typename: 'ClinicalSubmissionData';
};
export type ClinicalError = {
  message: string;
  fileNames: string[];
  code: string;
  __typename: 'ClinicalFileError';
};

export type UploadFilesMutationVariables = {
  programShortName: string;
  files: FileList;
};

export type ValidateSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type SignOffSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type ClearSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
  fileType?: string;
};

export type ClinicalSubmissionQueryData = {
  clinicalSubmissions: GqlClinicalSubmissionData;
};
