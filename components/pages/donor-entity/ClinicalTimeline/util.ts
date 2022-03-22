import { isEmpty, chunk } from 'lodash';
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

import defaultTheme from 'uikit/theme/defaultTheme';

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
  submitter_specimen_id: 'Submitter Specimen Id',
  submitter_primary_diagnosis_id: 'Submitter Primary Diagnosis ID',
  tumour_normal_designation: 'Tumour Normal Designation',
  specimen_tissue_source: 'Specimen Tissue Source',
  specimen_type: 'Specimen Type',
  pathological_tumour_staging_system: 'Pathological Tumour Staging System',
  age_at_diagnosis: 'Age at Diagnosis',
  pathological_TNM_category: 'Pathological TNM Category',
  pathological_stage_group: 'Pathological Stage Group',
  specimen_acquisition_interval: 'Specimen Acquisition Interval',
  tumour_histological_type: 'Tumor Histological Type',
  specimen_anatomic_location: 'Specimen Anatomic Location',
  specimen_laterality: 'Specimen Laterality',
  specimen_processing: 'Specimen Processing',
  number_of_positive_lymph_nodes: 'Number of Positive Lymph Nodes',
  referrence_pathology_confirmed: 'Referrence Pathology Confirmed',
  tumour_grading_system: 'Tumour Grading System',
  tumour_grade: 'Tumour Grade',
  percent_tumour_cells: 'Percent Tumour Cells',
  percent_proliferating_calls: 'Percent Proliferating Calls',
  percent_inflammatory_tissue: 'Percent Inflammatory Tissue',
  percent_stromal_cells: 'Percent Stromal Cells',
  percent_necrosis: 'Percent Necrosis',
};

// format for display
export const tableFormat = (data) =>
  data.length > 0 &&
  data.reduce((acc, val) => {
    const [key, value] = Object.entries(val)[0];
    const displayKey = donorCentricDisplayNames[key] || key;
    acc[displayKey] = value;
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
