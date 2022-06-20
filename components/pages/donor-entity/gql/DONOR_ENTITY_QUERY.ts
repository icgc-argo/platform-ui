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

import { gql } from '@apollo/client';

const DONOR_ENTITY_QUERY = gql`
  # TODO: Replace 'file' with 'donor' and remove commented-out lines once schema is updated
  query DONOR_ENTITY_QUERY($filters: JSON) {
    file {
      hits(filters: $filters) {
        total
        edges {
          node {
            id
            study_id
            donors {
              hits {
                edges {
                  node {
                    donor_id
                    submitter_donor_id
                  }
                }
              }
            }
            # program_id
            # donor_id
            # submitter_donor_id
            # gender
            # vital_status
            # cause_of_death
            # survival_time
            # primary_site
            # height
            # weight
            # bmi
            # genetic_disorders
            # menopause_status
            # age_at_diagnosis
            # age_at_menarche
            # number_of_pregnancies
            # number_of_children
            # hrt_type
            # hrt_duration
            # contraception_type
            # contraception_duration
            # associations {
            # submitter_specimen_id
            # specimen_type
            # tumour_normal_designation
            # sample_id
            # sample_type
            # matchedNormal_sample_id
            # }
            # specimens {
            #  hits {
            #    edges
            #  }
            # }
            # follow_ups {
            #  hits {
            #    edges
            #  }
            # }
            # primary_diagnosis {
            #  hits {
            #    edges
            #  }
            # }
            # treatments {
            #  hits {
            #    edges
            #  }
            # }
            # files {
            #  hits {
            #    edges
            #  }
            # }
          }
        }
      }
    }
  }
`;

export default DONOR_ENTITY_QUERY;
