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

const aggBucketProps = `
  buckets {
    key
    key_as_string
    doc_count
  }`;

const numericProps = `
  histogram {${aggBucketProps}} 
  stats {
    max 
    min
  }`;

const DISCOVERY_FACETS_QUERY = gql`
  query DiscoveryFacets($filters: JSON) {
    file {
      # only place we have field => display name mapping
      # example: "analysis.experiment.platform" => "Platform"
      aggregations(
        filters: $filters
        include_missing: true
        aggregations_filter_themselves: false
      ) {
        # --- General
        gender {
          ${aggBucketProps}
        }

        vital_status {
         ${aggBucketProps}
        }
        
        cause_of_death {
          ${aggBucketProps}
        }

       
        survival_time {
          ${numericProps}
        }

        primary_site {
          ${aggBucketProps}
        }

        primary_diagnosis__cancer_type_code {
          ${aggBucketProps}
        }

        # --- Biospecimen
        specimens__specimen_tissue_source {
          ${aggBucketProps}
        }
        specimens__tumour_normal_designation{
          ${aggBucketProps}
        }
        specimens__specimen_type{
          ${aggBucketProps}
        }
        specimens__samples__sample_type{
          ${aggBucketProps}
        }
        specimens__pathological_tumour_staging_system{
          ${aggBucketProps}
        }
        specimens__pathological_t_category{
          ${aggBucketProps}
        }
        specimens__pathological_n_category{
          ${aggBucketProps}
        }
        specimens__pathological_m_category{
          ${aggBucketProps}
        }
        specimens__pathological_stage_group{
          ${aggBucketProps}
        }
        specimens__specimen_acquisition_interval{
         ${numericProps}
        }
        specimens__tumour_histological_type{
          ${aggBucketProps}
        }
        specimens__specimen_anatomic_location{
          ${aggBucketProps}
        }
        specimens__reference_pathology_confirmed{
          ${aggBucketProps}
        }
        specimens__tumour_grading_system{
          ${aggBucketProps}
        }
        specimens__tumour_grade{
          ${aggBucketProps}
        }

        specimens__percent_tumour_cells{
         ${numericProps}
        }

        specimens__percent_tumour_cells_measurement_method{
         ${aggBucketProps}
        }

        # --- Diagnosis
        primary_diagnosis__age_at_diagnosis{
         ${numericProps}
        }
        primary_diagnosis__clinical_tumour_staging_system{
          ${aggBucketProps}
        }
        primary_diagnosis__clinical_t_category{
          ${aggBucketProps}
        }
        primary_diagnosis__clinical_n_category{
          ${aggBucketProps}
        }
        primary_diagnosis__clinical_m_category{
          ${aggBucketProps}
        }
        primary_diagnosis__clinical_stage_group{
          ${aggBucketProps}
        }

        # --- Treatment
        treatments__treatment_type{
          ${aggBucketProps}
        }
        treatments__is_primary_treatment{
          ${aggBucketProps}
        }
        treatments__treatment_intent{
          ${aggBucketProps}
        }
        treatments__treatment_setting{
          ${aggBucketProps}
        }
        treatments__response_to_treatment{
          ${aggBucketProps}
        }
       
        treatments__response_to_treatment_criteria_method{
          ${aggBucketProps}
        }

        # --- Assessment
        follow_ups__interval_of_followup{
          ${numericProps}
        }
        follow_ups__disease_status_at_followup{
          ${aggBucketProps}
        }
        follow_ups__relapse_type{
          ${aggBucketProps}
        }
        follow_ups__relapse_interval{
          ${numericProps}
        }
        follow_ups__method_of_progression_status{
          ${aggBucketProps}
        }
        follow_ups__anatomic_site_progression_or_recurrence{
          ${aggBucketProps}
        }
        
        # --- Molecular (File filters)
        study_id {
         ${aggBucketProps}
        }
        analyses__experiment__experimental_strategy {
          ${aggBucketProps}
        }
        analyses__files__data_category {
          ${aggBucketProps}
        }
        analyses__files__file_type {
         ${aggBucketProps}
        }
        analyses__file_access {
         ${aggBucketProps}
        }
        analyses__workflow__workflow_name {
          ${aggBucketProps}
        }
        analyses__files__analysis_tools {
         ${aggBucketProps}
        }
      }
    } 
  }
`;

export default DISCOVERY_FACETS_QUERY;
