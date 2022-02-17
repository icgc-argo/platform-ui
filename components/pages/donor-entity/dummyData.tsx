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
  donorId: 'DO9991',
  submitterDonorId: 'ICGC_71',
  gender: '',
  specimens: [{ samples: [{}] }],
  clinical: {
    follow_ups: [{}],
    primary_diagnosis: [{}],
    treatments: [{}],
  },
  files: [
    { fileId: '', dataType: '', analysisWorkflow: '', fileFormat: '', fileSize: 0, actions: '' },
  ],
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
