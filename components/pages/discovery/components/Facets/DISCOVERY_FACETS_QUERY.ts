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

const DISCOVERY_FACETS_QUERY = gql`
  query DiscoveryFacets($filters: JSON) {
    file {
      aggregations(
        filters: $filters
        include_missing: true
        aggregations_filter_themselves: false
      ) {
        study_id {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        analysis__experiment__experimental_strategy {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        has_clinical_data {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        file_type {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        file_access {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        analysis_tools {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        data_category {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        data_type {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        donors__specimens__specimen_type {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        donors__specimens__specimen_tissue_source {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        analysis__workflow__workflow_name {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        embargo_stage {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
        release_state {
          buckets {
            key
            key_as_string
            doc_count
          }
        }
      }
    }
  }
`;

export default DISCOVERY_FACETS_QUERY;
