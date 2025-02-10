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

import {
  DataAnalysisInfo,
  DonorRecord,
  FileAccessState,
  FileMetricsInfo,
  FileRecord,
  FileSummaryInfo,
} from './types';

export const dummyFileSummaryInfo: FileSummaryInfo = {
  fileId: 'FL9991',
  fileName: 'sd87fsdsdf798sdf87dfs9dsff97sdf987sdf987sdff798sdf798fds',
  objectId: '6329334b-dcd5-53c8-98fd-9812ac386d30',
  fileFormat: 'FASTQ',
  hasClinicalData: false,
  size: 7720000,
  access: FileAccessState.CONTROLLED,
  program: 'Pancreatic Cancer - CA (PACA-CA) ',
  checksum: 'f9a309cc2f08e9c5ceead501594f2dfe',
  repoName: 'Collaboratory - Toronto, AWS - Virginia',
  repoCountry: 'Canada, United States',
};

export const dummyDataAnalysisInfo: DataAnalysisInfo = {
  experimentalStrategy: 'WGS',
  dataCategory: 'Sequencing Reads',
  dataType: 'Aligned Reads',
  platform: 'Illumina',
  genomeBuild: 'GRCh38',
  workflowType: { workflow_name: 'DNA seq alignment', workflow_version: '1.0.0' },
  software: ['BWA MEM'],
};

export const dummyAssociatedDonorsInfo: Array<DonorRecord> = [
  {
    donorId: 'DO9991',
    submitterDonorId: 'ICGC_71',
    primarySite: 'Pancreas',
    cancerType: 'Pancreatic Cancer',
    ageAtDiagnosis: '67 years',
    associations: {
      specimenId: 'SP9991',
      specimenType: 'Primary tumour',
      tumourNormalDesignation: 'Tumour',
      sampleId: 'SA9991',
      sampleType: 'Total DNA',
      matchedNormalSampleId: 'SP9934',
    },
  },
  {
    donorId: 'D09996',
    submitterDonorId: 'ICGC_51',
    primarySite: 'Brain',
    cancerType: 'Brain Cancer',
    ageAtDiagnosis: '58 years',
    associations: {
      specimenId: 'SP9996',
      specimenType: 'Primary tumour',
      tumourNormalDesignation: 'Normal',
      sampleId: 'SA9996',
      sampleType: 'Total DNA',
      matchedNormalSampleId: 'SP9938',
    },
  },
];

export const dummyFileRecords: Array<FileRecord> = [
  {
    fileId: 'FL10292',
    fileName: 'sd87fsdsdf798sdf87dfs9dsff97sdf987sdf987sdff798sdf798fds',
    dataType: 'miRNA Expression Quantification',
    analysisWorkflow: 'BCGSC miRNA Profiling',
    fileFormat: 'TXT',
    fileSize: 50840,
    actions: FileAccessState.CONTROLLED,
  },
  {
    fileId: 'FL10122',
    fileName: 'sd87fsdsdf798sdf87dfs9dsff97sdf987sdf987sdff798sdf798fds',
    dataType: 'Isoform Expression Quantification',
    analysisWorkflow: 'VarScan2 Variant Aggregation and Masking',
    fileFormat: 'TXT',
    fileSize: 242830,
    actions: FileAccessState.CONTROLLED,
  },
];

export const dummyMetricsInfo: FileMetricsInfo = {
  averageInsertSize: 162.1,
  averageLength: 76,
  duplicatedBases: 456,
  errorRate: 0.004498106,
  mappedBasesCigar: 12672,
  mappedReads: 168,
  mismatchBases: 57,
  pairsOnDifferentChromosomes: 0,
  pairedReads: 170,
  properlyPairedReads: 168,
  totalBases: 12920,
  totalReads: 170,
};
