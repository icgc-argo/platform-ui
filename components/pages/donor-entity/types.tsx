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
import {
  Entity,
  SpecimenNode,
  TreatmentNode,
} from '../submission-system/donor/ClinicalTimeline/types';

export type DiagnosisNode = {
  node: {
    id: string;
    data: Array<{}>;
  };
};

export type FollowUpNode = {
  node: {
    id: string;
    data: Array<{}>;
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
