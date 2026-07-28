/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import { gql } from '@apollo/client';
import { ES_CARDINALITY_MAX_PRECISION_THRESHOLD } from './Facets/facetsQueryProps';

const DISCOVERY_NETWORK_STATS_QUERY = gql`
  query DiscoveryStats($filters: JSON, $nodesFilter: [String]) {
    network(
      filters: $filters
      include_missing: true
      aggregations_filter_themselves: true
      nodesFilter: $nodesFilter
    ) {
      aggregations {
        analyses__files__file_id {
          cardinality(precision_threshold: ${ES_CARDINALITY_MAX_PRECISION_THRESHOLD})
        }
        donor_id {
          cardinality(precision_threshold: ${ES_CARDINALITY_MAX_PRECISION_THRESHOLD})
        }
        study_id {
          bucket_count
        }
      }
      nodes {
        nodeId
        hits
        name
        errors
        status
      }
    }
  }
`;

export default DISCOVERY_NETWORK_STATS_QUERY;
