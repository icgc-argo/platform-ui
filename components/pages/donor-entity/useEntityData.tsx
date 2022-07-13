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

import { useQuery } from '@apollo/client';
import { DonorCentricRecord, DonorEntity } from './types';
import DONOR_ENTITY_QUERY from './gql/DONOR_ENTITY_QUERY';
import { noData, dummyDonorQuery } from './dummyData';
import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentField } from '../file-repository/types';

export type DonorEntityData = {
  loading: boolean;
  data: DonorCentricRecord;
  summary: {};
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

  const entity = {
    ...dummyDonorQuery.hits.edges[0].node,
  };

  if (loading || !entity) {
    return { data: noData, summary: {}, loading: true };
  } else if (!loading && !entity) {
    return { data: noData, summary: {}, loading: false };
  } else {
    // TODO: Remove testing values
    const node = data?.file.hits.edges[0].node;
    const program_id = node !== undefined && node.study_id;
    const { donor_id, submitter_donor_id } = node !== undefined && node.donors.hits.edges[0].node;
    if (donor_id) entity.donor_id = donor_id;
    if (submitter_donor_id) entity.submitter_donor_id = submitter_donor_id;
    if (program_id) entity.program_id = program_id;

    const summary = {};
    [
      'program_id',
      'donor_id',
      'submitter_donor_id',
      'primary_site',
      'cancer_type',
      'age_at_diagnosis',
      'gender',
      'vital_status',
      'cause_of_death',
      'survival_time',
      'genetic_disorders',
      'height',
      'weight',
      'bmi',
      'menopause_status',
      'age_at_menarche',
      'number_of_pregnancies',
      'number_of_children',
      'hrt_type',
      'hrt_duration',
      'contraception_type',
      'contraception_duration',
    ].forEach((key) => {
      summary[key] = entity[key];
    });

    if (error) {
      console.error(error.message);
    }

    return { data: entity, summary, loading, error };
  }
};

export default useEntityData;
