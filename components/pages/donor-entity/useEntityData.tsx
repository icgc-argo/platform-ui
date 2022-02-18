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
import { get } from 'lodash';
import { DonorCentricRecord } from './types';
import DONOR_ENTITY_QUERY from './DONOR_ENTITY_QUERY.gql';
import { noData } from './dummyData';
import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentField } from '../file-repository/types';

type DonorEntityData = {
  loading: boolean;
  data: DonorCentricRecord;
  error?: any;
};

const useEntityData = ({ donorId }: { donorId: string }): DonorEntityData => {
  const filters = sqonBuilder.has(FileCentricDocumentField['donor_id'], donorId).build();
  const { data, loading, error } = useQuery(DONOR_ENTITY_QUERY, {
    variables: {
      filters,
    },
    errorPolicy: 'all',
  });

  if (loading) {
    return { data: noData, loading: true };
  } else {
    const entity = get(data, 'donor.hits.edges[0].node', null);

    if (!entity) {
      return { data: noData, loading: false };
    }

    if (error) {
      console.error(error.message);
    }

    return { data: entity, loading, error };
  }
};

export default useEntityData;
