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

import { isEmpty, chunk } from 'lodash';
import sqonBuilder from 'sqon-builder';
import urlJoin from 'url-join';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import { usePageQuery } from 'global/hooks/usePageContext';
import Link from 'uikit/Link';
import defaultTheme from 'uikit/theme/defaultTheme';
import { DiagnosisNode, EntityType, SpecimenNode } from '../types';

export const getTimelineStyles = (theme: typeof defaultTheme) => {
  const colors = theme.colors;
  return {
    primary_diagnosis: {
      checkboxColor: colors.secondary,
      borderColor: colors.secondary_1,
      backgroundColor: colors.secondary_4,
    },
    specimen: {
      checkboxColor: colors.accent3_dark,
      borderColor: colors.accent3,
      backgroundColor: colors.accent3_4,
    },
    treatment: {
      checkboxColor: colors.accent4,
      borderColor: colors.accent4_1,
      backgroundColor: colors.accent4_4,
    },
    follow_up: {
      checkboxColor: colors.accent2,
      borderColor: colors.accent2_1,
      backgroundColor: colors.accent2_4,
    },
    biomarker: {
      checkboxColor: colors.warning,
      borderColor: colors.warning_1,
      backgroundColor: colors.warning_4,
    },
    deceased: {
      borderColor: colors.grey_1,
      backgroundColor: colors.white,
      checkboxColor: colors.white,
    },
  };
};

export const splitIntoColumns = (
  data: { [key: string]: any },
  numberOfColumns: number,
): any[][] => {
  if (isEmpty(data)) {
    return [];
  } else {
    const chunks = chunk(
      Object.entries(data).map(([key, value]) => ({
        [key]: value,
      })),
      // account for data size being smaller than numberOfColumns
      Math.ceil(Object.entries(data).length / numberOfColumns),
    );

    while (chunks.length < numberOfColumns) {
      chunks.push([]);
    }

    return chunks;
  }
};

const donorCentricDisplayNames = {
  age_at_diagnosis: 'Age at Diagnosis',
  age_at_menarche: 'Age at Menarche',
  available_files: 'Available Files',
  bmi: 'BMI',
  cancer_type: 'Cancer Type',
  cancer_type_code: 'Cancer Type Code',
  cancer_type_additional_information: 'Cancer Type Additional Information',
  cause_of_death: 'Cause of Death',
  clinical_stage_group: 'Clinical Stage Group',
  clinical_t_category: 'Clinical T Category',
  clinical_n_category: 'Clinical N Category',
  clinical_m_category: 'Clinical M Category',
  clinical_tumour_staging_system: 'Clinical Tumour Staging System',
  contraception_type: 'Contraception Type',
  contraception_duration: 'Contraception Duration',
  disease_status_at_followup: 'Disease Status at Followup',
  donor_id: 'Donor ID',
  experimental_strategies: 'Experimental Strategies',
  gender: 'Gender',
  genetic_disorders: 'Genetic Disorders',
  height: 'Height',
  hrt_type: 'HRT Type',
  hrt_duration: 'HRT Duration',
  interval_of_followup: 'Interval of Followup',
  lymph_nodes_examined_status: 'Lymph Nodes Examined status',
  menopause_status: 'Menopause Status',
  number_of_children: 'Number of Children',
  number_lymph_nodes_positive: 'Number of Positive Lymph Nodes',
  number_lymph_nodes_examined: 'Number of Lymph Nodes Examined',
  number_of_positive_lymph_nodes: 'Number of Positive Lymph Nodes',
  number_of_pregnancies: 'Number of Pregnancies',
  pathological_t_category: 'Pathological T Category',
  pathological_n_category: 'Pathological N Category',
  pathological_m_category: 'Pathological M Category',
  pathological_tnm_category: 'Pathological TNM Category',
  pathological_tumour_staging_system: 'Pathological Tumour Staging System',
  pathological_stage_group: 'Pathological Stage Group',
  percent_tumour_cells: 'Percent Tumour Cells',
  percent_proliferating_cells: 'Percent Proliferating Calls',
  percent_inflammatory_tissue: 'Percent Inflammatory Tissue',
  percent_stromal_cells: 'Percent Stromal Cells',
  percent_necrosis: 'Percent Necrosis',
  performance_status: 'Performance Status',
  presenting_symptoms: 'Presenting Symptoms',
  program_id: 'Program ID',
  primary_diagnosis_id: 'Primary Diagnosis ID',
  primary_site: 'Primary Site',
  reference_pathology_confirmed: 'Referrence Pathology Confirmed',
  relapse_interval: 'Relapse Interval',
  relapse_type: 'Relapse Type',
  sample_id: 'Sample ID',
  sample_type: 'Sample Type',
  specimen_type: 'Specimen Type',
  specimen_tissue_source: 'Specimen Tissue Source',
  specimen_acquisition_interval: 'Specimen Acquisition Interval',
  specimen_anatomic_location: 'Specimen Anatomic Location',
  specimen_laterality: 'Specimen Laterality',
  specimen_processing: 'Specimen Processing',
  specimen_storage: 'Specimen Storage',
  specimen_id: 'Specimen ID',
  submitter_donor_id: 'Submitter Donor ID',
  submitter_follow_up_id: 'Submitter Follow Up ID',
  submitter_sample_id: 'Submitter Sample ID',
  submitter_specimen_id: 'Submitter Specimen Id',
  submitter_primary_diagnosis_id: 'Submitter Primary Diagnosis ID',
  survival_time: 'Survival Time',
  tumour_grade: 'Tumour Grade',
  tumour_grading_system: 'Tumour Grading System',
  tumour_histological_type: 'Tumor Histological Type',
  tumour_normal_designation: 'Tumour Normal Designation',
  vital_status: 'Vital Status',
  weight: 'Weight',
  weight_at_followup: 'Weight at Followup',
  workflow_names: 'Workflow Names',
};

type AliasedDisplayData = {
  [K in keyof typeof donorCentricDisplayNames]?: any;
};

// format for display
export const formatTableDisplayNames = (data: any[]) =>
  data.length > 0 &&
  data.reduce((acc, val) => {
    Object.keys(val).forEach((key) => {
      const value = val[key];
      const displayKey = donorCentricDisplayNames[key] || key;

      let displayValue;
      switch (key) {
        case 'age_at_diagnosis':
          displayValue = `${value} years`;
          break;
        case 'survival_time':
          displayValue = `${value} days`;
          break;
        case 'specimen_acquisition_interval':
          displayValue = `${value} days`;
          break;
        case 'height':
          displayValue = `${value} cm`;
          break;
        case 'weight':
          displayValue = `${value} kg`;
          break;
        case 'bmi':
          displayValue = `${value} kg/m²`;
          break;
        default:
          displayValue = value;
      }
      acc[displayKey] = displayValue;
    });
    return acc;
  }, {});

export const removeAliasedKeys = (node, aliasedKeys) =>
  Object.keys(node).reduce((acc, val) => {
    if (!aliasedKeys.includes(val)) acc[val] = node[val];
    return acc;
  }, {});

export const getDonorAge = (data) => {
  // TODO: consistent key handling based on real data
  const ageAtDiagnosis: number = data.ageAtDiagnosis || data['age_at_diagnosis'];

  const survivalTime: number = Math.floor((data.survivalTime || data['survival_time']) / 365);

  const ageAtDeath: number = ageAtDiagnosis + survivalTime;
  return { ageAtDiagnosis, survivalTime, ageAtDeath };
};

const removePipeDelimiter = (data: AliasedDisplayData) => {
  const displayData = { ...data };
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && value.includes('|')) {
      displayData[key] = value.replace(/\ \|/g, ',');
    }
  }
  return displayData;
};

export const formatTimelineEntityData = (donorData) => {
  // TODO: Add functions for treatment, followUp, biomarker, etc; remove dummyData
  const primary_diagnosis = donorData.primary_diagnosis?.hits.edges.map(
    ({ node }: DiagnosisNode) => {
      const { clinical_t_category, clinical_n_category, clinical_m_category } = node;
      const aliasedKeys = ['clinical_t_category', 'clinical_n_category', 'clinical_m_category'];
      const data: AliasedDisplayData = removePipeDelimiter(removeAliasedKeys(node, aliasedKeys));
      if (clinical_t_category && clinical_n_category && clinical_m_category)
        data.pathological_tnm_category = `${clinical_t_category}${clinical_n_category}${clinical_m_category}`;

      return {
        id: `PRIMARY DIAGNOSIS ${node.primary_diagnosis_id}`,
        description: node.cancer_type_code,
        type: EntityType.PRIMARY_DIAGNOSIS,
        interval: 0,
        data,
      };
    },
  )[0];

  const specimens = donorData.specimens?.hits.edges.map(({ node }: SpecimenNode) => {
    const { pathological_t_category, pathological_n_category, pathological_m_category } = node;

    const aliasedKeys = [
      'samples',
      'pathological_t_category',
      'pathological_n_category',
      'pathological_m_category',
    ];

    const data: AliasedDisplayData = removePipeDelimiter(removeAliasedKeys(node, aliasedKeys));

    if (pathological_t_category && pathological_n_category && pathological_m_category)
      data.pathological_tnm_category = `${pathological_t_category}${pathological_n_category}${pathological_m_category}`;

    const samples = node.samples.hits.edges.map((sample) => {
      const { donorId } = usePageQuery<{ donorId: string }>();
      const sampleFilter = sqonBuilder
        .has('donor_id', donorId)
        .has('submitter_sample_id', sample.node['submitter_sample_id'])
        .build();

      const sampleFilterUrl = urlJoin(
        FILE_REPOSITORY_PATH,
        `?filters=${encodeURIComponent(JSON.stringify(sampleFilter))}`,
      );

      const available_files = (
        <Link variant="INLINE" href={sampleFilterUrl}>
          {sample.node['available_files']}
        </Link>
      );
      return { ...sample.node, available_files };
    });

    return {
      id: `SPECIMEN ${node.specimen_id}`,
      description: node.tumour_normal_designation,
      type: EntityType.SPECIMEN,
      interval: node.specimen_acquisition_interval,
      data,
      samples,
    };
  });

  return {
    ...donorData,
    primary_diagnosis,
    specimens,
  };
};
