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

import { DonorCentricRecord, DonorEntityData } from './types';
import { EntityType } from '../submission-system/donor/ClinicalTimeline/types';

export const dummyAssociatedDonorsInfo: DonorCentricRecord = {
  programId: 'TEST-PR',
  donorId: 'DO252999',
  submitterDonorId: 'HCC1143',
  gender: 'Female',
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
  specimens: {
    hits: {
      edges: [
        {
          node: {
            specimen_tissue_source: 'Blood derived',
            specimen_type: 'Normal',
            tumour_normal_designation: 'Normal',
            submitter_specimen_id: 'HCC1143_BAM_INPUT',
            specimen_id: 'SP212999',
            samples: {
              hits: {
                edges: [
                  {
                    node: {
                      matched_normal_submitter_sample_id: null,
                      sample_id: 'SA613000',
                      sample_type: 'Total DNA',
                      submitter_sample_id: 'HCC1143_BAM_INPUT',
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
  follow_ups: {
    hits: {
      edges: [{}],
    },
  },
  primary_diagnosis: {
    hits: {
      edges: [{}],
    },
  },
  treatments: {
    hits: {
      edges: [{}],
    },
  },
  files: {
    hits: {
      edges: [
        {
          fileId: 'FL1203',
          dataType: 'Alignment QC',
          analysisWorkflow: '',
          fileFormat: '',
          fileSize: 23195,
          actions: '',
        },
      ],
    },
  },
};

export const dummyClinicalTimelineData: DonorEntityData = {
  type: EntityType.PRIMARY_DIAGNOSIS,
  id: '',
  description: '',
  interval: 0,
  data: {},
  samples: [],
  invalid: true,
};