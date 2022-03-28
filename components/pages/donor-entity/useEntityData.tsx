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

import { useQuery } from '@apollo/react-hooks';
import { DonorCentricRecord, EntityType } from './types';
import DONOR_ENTITY_QUERY from './DONOR_ENTITY_QUERY.gql';
import { noData, dummyDonorEntity } from './dummyData';
import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentField } from '../file-repository/types';

type DonorEntityData = {
  loading: boolean;
  data: DonorCentricRecord;
  error?: any;
};

const useEntityData = (donorId: string): DonorEntityData => {
  const filters = sqonBuilder.has(FileCentricDocumentField['donors.donor_id'], donorId).build();
  const { data, loading, error } = useQuery(DONOR_ENTITY_QUERY, {
    variables: {
      filters,
    },
    errorPolicy: 'all',
  });

  const entity = data?.file.hits.edges[0].node;

  if (loading || !entity) {
    return { data: noData, loading: true };
  } else if (!loading && !entity) {
    return { data: noData, loading: false };
  } else {
    const entityData: DonorCentricRecord = {
      donorId: entity.donors.hits.edges[0].node.donor_id,
      programId: entity.study_id,
      submitterDonorId: entity.donors.hits.edges[0].node.submitter_donor_id,
      gender: entity.donors.hits.edges[0].node.gender,
      vitalStatus: entity.vital_status,
      primarySite: entity.primary_site,
      cancerType: entity.cancer_type,
      ageAtDiagnosis: entity.age_at_diagnosis,
      associations: entity.associations,
      causeOfDeath: entity.cause_of_death,
      survivalTime: entity.survival_time,
      height: entity.height,
      weight: entity.weight,
      bmi: entity.bmi,
      geneticDisorders: entity.genetic_disorders,
      menopauseStatus: entity.menopause_status,
      ageAtMenarche: entity.age_at_menarche,
      numberOfPregnancies: entity.number_of_pregnancies,
      numberOfChildren: entity.number_of_children,
      hrtType: entity.hrt_type,
      hrtDuration: entity.hrt_duration,
      contraceptionType: entity.contraception_type,
      contraceptionDuration: entity.contraception_duration,
      specimens: entity.specimens,
      follow_ups: entity.follow_ups,
      primary_diagnosis: entity.primary_diagnosis,
      treatments: entity.treatments,
      files: entity.files,
    };

    if (error) {
      console.error(error.message);
    }

    // TODO: Remove testing values
    const entityTestingData = {
      ...dummyDonorEntity,
      donorId: entityData.donorId,
      programId: entityData.programId,
      submitterDonorId: entityData.submitterDonorId,
    };

    return { data: entityTestingData, loading, error };
  }
};

export default useEntityData;
