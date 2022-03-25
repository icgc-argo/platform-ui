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
import defaultTheme from 'uikit/theme/defaultTheme';
import { EntityType } from '../types';

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
  available_files: 'Available Files',
  experimental_strategies: 'Experimental Strategies',
  number_of_positive_lymph_nodes: 'Number of Positive Lymph Nodes',
  pathological_t_category: 'Pathological T Category',
  pathological_n_category: 'Pathological N Category',
  pathological_m_category: 'Pathological M Category',
  pathological_TNM_category: 'Pathological TNM Category',
  pathological_tumour_staging_system: 'Pathological Tumour Staging System',
  pathological_stage_group: 'Pathological Stage Group',
  percent_tumour_cells: 'Percent Tumour Cells',
  percent_proliferating_cells: 'Percent Proliferating Calls',
  percent_inflammatory_tissue: 'Percent Inflammatory Tissue',
  percent_stromal_cells: 'Percent Stromal Cells',
  percent_necrosis: 'Percent Necrosis',
  program_id: 'Program ID',
  primary_diagnosis_id: 'Primary Diagnosis ID',
  reference_pathology_confirmed: 'Referrence Pathology Confirmed',
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
  submitter_sample_id: 'Submitter Sample ID',
  submitter_specimen_id: 'Submitter Specimen Id',
  submitter_primary_diagnosis_id: 'Submitter Primary Diagnosis ID',
  tumour_grade: 'Tumour Grade',
  tumour_grading_system: 'Tumour Grading System',
  tumour_histological_type: 'Tumor Histological Type',
  tumour_normal_designation: 'Tumour Normal Designation',
  workflow_names: 'Workflow Names',
};

// format for display
export const formatTableDisplayNames = (data: any[]) =>
  data.length > 0 &&
  data.reduce((acc, val) => {
    Object.keys(val).forEach((key) => {
      const value = val[key];
      const displayKey = donorCentricDisplayNames[key] || key;
      acc[displayKey] = value;
    });
    return acc;
  }, {});

export const getDonorAge = (data) => {
  // TODO: consistent key handling based on real data
  const ageAtDiagnosis = parseInt((data.ageAtDiagnosis || data['Age at Diagnosis']).split(' ')[0]);

  const survivalTime = Math.floor(
    parseInt((data.survivalTime || data['Survival Time'] || '0').split(' ')[0]) / 365,
  );

  const ageAtDeath = ageAtDiagnosis + survivalTime;
  return { ageAtDiagnosis, survivalTime, ageAtDeath };
};

export const formatTimelineEntityData = (data) => {
  // TODO: Expand to other values; remove dummyData
  const specimens = data.specimens?.hits.edges.map(({ node }) => {
    const data = { ...node };
    const samples = node.samples.hits.edges.map((sample) => ({ ...sample.node }));
    delete data.samples;
    return {
      id: `SPECIMEN ${node.specimen_id}`,
      description: node.specimen_type,
      type: EntityType.SPECIMEN,
      interval: node.specimen_acquisition_interval,
      data,
      samples,
    };
  });
  return {
    ...data,
    specimens,
  };
};
