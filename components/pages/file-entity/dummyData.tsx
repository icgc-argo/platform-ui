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

import {
  FileSummaryInfo,
  FileAccessState,
  DataAnalysisInfo,
  DonorRecord,
  FileRecord,
} from './types';

export const dummyFileSummaryInfo: FileSummaryInfo = {
  fileId: 'FL9991',
  objectId: '6329334b-dcd5-53c8-98fd-9812ac386d30',
  fileFormat: 'FASTQ',
  size: 7720000,
  access: FileAccessState.CONTROLLED,
  program: 'Pancreatic Cancer - CA (PACA-CA) ',
  checksum: 'f9a309cc2f08e9c5ceead501594f2dfe',
  repoName: 'Collaboratory - Toronto, AWS - Virginia',
  repoCountry: 'Canada, United States',
};

export const dummyDataAnalysisInfo: DataAnalysisInfo = {
  experimentalStrategy: 'WGS',
  dataType: 'Aligned Reads',
  platform: 'Illumina',
  genomeBuild: 'GRCh38',
  workflowType: 'DNA seq alignment',
  software: 'BWA MEM',
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
    dataType: 'miRNA Expression Quantification',
    analysisWorkflow: 'BCGSC miRNA Profiling',
    fileFormat: 'TXT',
    fileSize: 50840,
    actions: FileAccessState.CONTROLLED,
  },
  {
    fileId: 'FL10122',
    dataType: 'Isoform Expression Quantification',
    analysisWorkflow: 'VarScan2 Variant Aggregation and Masking',
    fileFormat: 'TXT',
    fileSize: 242830,
    actions: FileAccessState.CONTROLLED,
  },
];
