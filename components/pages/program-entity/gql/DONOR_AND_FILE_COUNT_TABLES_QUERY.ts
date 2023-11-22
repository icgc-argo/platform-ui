/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

export default gql`
  query DonorAndFileCount(
    $SQON_QC: JSON
    $SQON_SN: JSON
    $SQON_CNUM: JSON
    $SQON_STRUC: JSON
    $SQON_TP: JSON
    $SQON_WXS: JSON
    $SQON_WGS: JSON
    $SQON_RSEQ: JSON
  ) {
    file {
      quality_control_metrics: aggregations(filters: $SQON_QC) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      simple_nucleotide_variation: aggregations(filters: $SQON_SN) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      copy_number_variation: aggregations(filters: $SQON_CNUM) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      structural_variation: aggregations(filters: $SQON_STRUC) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      transcriptome_profiling: aggregations(filters: $SQON_TP) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      wxs: aggregations(filters: $SQON_WXS) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      wgs: aggregations(filters: $SQON_WGS) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
      rna_seq: aggregations(filters: $SQON_RSEQ) {
        donors__donor_id {
          bucket_count
        }
        file_id {
          bucket_count
        }
      }
    }
  }
`;
