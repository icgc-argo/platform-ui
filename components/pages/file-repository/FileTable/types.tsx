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

import { FileRepoFiltersType } from '../utils/types';
import { SortingRule } from 'react-table';

export type FileRepositoryRecord = {
  objectId: string;
  donorId: string;
  programId: string;
  dataType: string;
  experimentalStrategy: string;
  fileType: string;
  size: number; //in bytes
  isDownloadable: boolean;
};

type FileSize = { size: number };
type Donor = {
  node: {
    donor_id: string;
  };
};
type Strategy = {
  experiment: {
    experimental_strategy;
  };
};

type FileRepoQueryNode = {
  node: {
    object_id: string;
    data_type: string;
    file_type: string;
    study_id: string;
    file: FileSize;
    donors: {
      hits: {
        edges: Donor[];
      };
    };
    analysis: Strategy;
  };
};

export type FileRepositoryTableQueryData = {
  file: {
    hits: {
      total: number;
      edges: FileRepoQueryNode[];
    };
  };
};

export type FileRepositoryTableQueryVariables = {
  filters: FileRepoFiltersType;
  first: number;
  offset: number;
  sort: FileRepositoryRecordSort[];
};

export type FileRepositoryRecordSort = {
  field: FileCentricDocumentField;
  order: FileRepositoryRecordSortOrder;
};

export enum FileCentricDocumentField {
  object_id = 'object_id',
  'donors.donor_id' = 'donors.donor_id',
  study_id = 'study_id',
  data_type = 'data_type',
  file_type = 'file_type',
  'analysis.experiment.experimental_strategy' = 'analysis.experiment.experimental_strategy',
  'file.size' = 'file.size',
  'donors.gender' = 'donors.gender',
  variant_class = 'variant_class',
  file_access = 'file_access',
}
export type FileRepositoryRecordSortOrder = 'asc' | 'desc';

export type FileRepositorySortingRule = SortingRule & {
  id: FileCentricDocumentField;
};
