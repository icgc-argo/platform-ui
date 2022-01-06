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

export enum FileAccessState {
  CONTROLLED = 'controlled',
  OPEN = 'open',
}

export type FileSummaryInfo = {
  fileId: string;
  objectId: string;
  fileFormat: string;
  size: number;
  access: FileAccessState;
  program: string;
  checksum: string;
  repoName: string;
  repoCountry: string;
};

export type DataAnalysisWorkflowType = {
  workflow_name: string;
  workflow_version: string;
};

export type DataAnalysisInfo = {
  experimentalStrategy: string;
  dataCategory: string;
  dataType: string;
  platform: string;
  genomeBuild: string;
  workflowType?: DataAnalysisWorkflowType;
  software: string;
};

export type DonorRecord = {
  donorId: string;
  submitterDonorId: string;
  primarySite: string;
  cancerType: string;
  ageAtDiagnosis: string;
  associations: Associations;
};

export type Associations = {
  specimenId: string;
  specimenType: string;
  tumourNormalDesignation: string;
  sampleId: string;
  sampleType: string;
  matchedNormalSampleId: string;
};

export type FileRecord = {
  fileId: string;
  dataType: string;
  analysisWorkflow: string;
  fileFormat: string;
  fileSize: number;
  actions: string;
};

export type EntityMetaData = {
  embargo_stage: string;
};

export type FileEntityData = {
  summary: FileSummaryInfo;
  dataAnalysis: DataAnalysisInfo;
  donorRecords: Array<DonorRecord>;
  meta?: EntityMetaData;
  //fileRecords: Array<FileRecord>;
};
