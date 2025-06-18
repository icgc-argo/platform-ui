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

import { css, useTheme } from '@icgc-argo/uikit';
import Charts from 'charts';
import { ChartContainer } from './Chart';
import { Error, Loader } from './common';
import { chartThemeFn } from './theme';
import { injectTheme } from './util';

const cancerTypeCodeMapping = {
  C00: 'Lip, Oral Cavity & Pharynx',
  C01: 'Lip, Oral Cavity & Pharynx',
  C02: 'Lip, Oral Cavity & Pharynx',
  C03: 'Lip, Oral Cavity & Pharynx',
  C04: 'Lip, Oral Cavity & Pharynx',
  C05: 'Lip, Oral Cavity & Pharynx',
  C06: 'Lip, Oral Cavity & Pharynx',
  C07: 'Lip, Oral Cavity & Pharynx',
  C08: 'Lip, Oral Cavity & Pharynx',
  C09: 'Lip, Oral Cavity & Pharynx',
  C10: 'Lip, Oral Cavity & Pharynx',
  C11: 'Lip, Oral Cavity & Pharynx',
  C12: 'Lip, Oral Cavity & Pharynx',
  C13: 'Lip, Oral Cavity & Pharynx',
  C14: 'Lip, Oral Cavity & Pharynx',
  C15: 'Esophagus',
  C16: 'Stomach',
  C17: 'Small Intestine',
  C18: 'Colorectal',
  C19: 'Colorectal',
  C20: 'Colorectal',
  C21: 'Colorectal',
  C22: 'Liver & Intrahepatic Bile Duct',
  C23: 'Gallbladder & Other Biliary',
  C24: 'Gallbladder & Other Biliary',
  C25: 'Pancreas',
  C26: 'Other Digestive Organs',
  C30: 'Nasal Cavity & Sinuses',
  C31: 'Nasal Cavity & Sinuses',
  C32: 'Larynx',
  C33: 'Lung & Bronchus',
  C34: 'Lung & Bronchus',
  C37: 'Thymus, Heart, Mediastinum & Pleura',
  C38: 'Thymus, Heart, Mediastinum & Pleura',
  C39: 'Other Respiratory Organs',
  C40: 'Bone & Articular Cartilage',
  C41: 'Bone & Articular Cartilage',
  C43: 'Melanoma of Skin',
  C44: 'Other Skin',
  C45: 'Mesothelioma',
  C46: "Kaposi's Sarcoma",
  C47: 'Soft Tissue Sarcomas',
  C49: 'Soft Tissue Sarcomas',
  C50: 'Breast',
  C51: 'Vulva & Vagina',
  C52: 'Vulva & Vagina',
  C53: 'Cervix Uteri',
  C54: 'Corpus Uteri & Uterus NOS',
  C55: 'Corpus Uteri & Uterus NOS',
  C56: 'Ovary',
  C57: 'Other Female Genital Organs',
  C58: 'Placenta',
  C60: 'Penis',
  C61: 'Prostate',
  C62: 'Testis',
  C63: 'Other Male Genital Organs',
  C64: 'Kidney & Other Urinary Organs',
  C65: 'Kidney & Other Urinary Organs',
  C66: 'Kidney & Other Urinary Organs',
  C67: 'Bladder',
  C68: 'Other Urinary Organs',
  C69: 'Eye & Adnexa',
  C70: 'Brain & Other CNS',
  C71: 'Brain & Other CNS',
  C72: 'Brain & Other CNS',
  C73: 'Thyroid',
  C74: 'Other Endocrine Glands',
  C75: 'Other Endocrine Glands',
  C76: 'Other Ill-Defined Sites',
  C77: 'Lymph Nodes',
  C78: 'Secondary Malignant Neoplasms',
  C79: 'Secondary Malignant Neoplasms',
  C80: 'Malignant Neoplasm, Unknown Primary',
  C81: 'Hodgkin Lymphoma',
  C82: 'Non-Hodgkin Lymphoma',
  C83: 'Non-Hodgkin Lymphoma',
  C84: 'Non-Hodgkin Lymphoma',
  C85: 'Non-Hodgkin Lymphoma',
  C86: 'Non-Hodgkin Lymphoma',
  C88: 'Malignant Immunoproliferative Diseases',
  C90: 'Multiple Myeloma & Plasmacytoma',
  C91: 'Leukemias',
  C92: 'Leukemias',
  C93: 'Leukemias',
  C94: 'Leukemias',
  C95: 'Leukemias',
  C96: 'Other & Unspecified Lymphoid, Hematopoietic & Related Tissue',
  C97: 'Multiple Independent Primary Sites',
  D00: 'Carcinoma in Situ',
  D01: 'Carcinoma in Situ',
  D02: 'Carcinoma in Situ',
  D03: 'Carcinoma in Situ',
  D04: 'Carcinoma in Situ',
  D05: 'Carcinoma in Situ',
  D06: 'Carcinoma in Situ',
  D07: 'Carcinoma in Situ',
  D08: 'Carcinoma in Situ',
  D09: 'Carcinoma in Situ',
  D10: 'Benign Neoplasms',
  D11: 'Benign Neoplasms',
  D12: 'Benign Neoplasms',
  D13: 'Benign Neoplasms',
  D14: 'Benign Neoplasms',
  D15: 'Benign Neoplasms',
  D16: 'Benign Neoplasms',
  D17: 'Benign Neoplasms',
  D18: 'Benign Neoplasms',
  D19: 'Benign Neoplasms',
  D20: 'Benign Neoplasms',
  D21: 'Benign Neoplasms',
  D22: 'Benign Neoplasms',
  D23: 'Benign Neoplasms',
  D24: 'Benign Neoplasms',
  D25: 'Benign Neoplasms',
  D26: 'Benign Neoplasms',
  D27: 'Benign Neoplasms',
  D28: 'Benign Neoplasms',
  D29: 'Benign Neoplasms',
  D30: 'Benign Neoplasms',
  D31: 'Benign Neoplasms',
  D32: 'Benign Neoplasms',
  D33: 'Benign Neoplasms',
  D34: 'Benign Neoplasms',
  D35: 'Benign Neoplasms',
  D36: 'Benign Neoplasms',
  D37: 'Neoplasms of Uncertain or Unknown Behaviour',
  D38: 'Neoplasms of Uncertain or Unknown Behaviour',
  D39: 'Neoplasms of Uncertain or Unknown Behaviour',
  D40: 'Neoplasms of Uncertain or Unknown Behaviour',
  D41: 'Neoplasms of Uncertain or Unknown Behaviour',
  D42: 'Neoplasms of Uncertain or Unknown Behaviour',
  D43: 'Neoplasms of Uncertain or Unknown Behaviour',
  D44: 'Neoplasms of Uncertain or Unknown Behaviour',
  D45: 'Neoplasms of Uncertain or Unknown Behaviour',
  D46: 'Neoplasms of Uncertain or Unknown Behaviour',
  D47: 'Neoplasms of Uncertain or Unknown Behaviour',
  D48: 'Neoplasms of Uncertain or Unknown Behaviour',
};

const TEMP_DATA = [
  {
    id: 'Biliary Tract',
    label: 'Biliary Tract',
    colour: '#D4A268',
    value: 68,
  },
  { id: 'Lung', label: 'Lung', colour: '#E66550', value: 24 },
  { id: 'Bladder', label: 'Bladder', colour: '#8B5E9F', value: 12 },
  { id: 'Prostate', label: 'Prostate', colour: '#B8CCE4', value: 3 },
  { id: 'Colorectal', label: 'Colorectal', colour: '#E789F', value: 927 },
  { id: 'Breast', label: 'Breast', colour: '#F2CBBD', value: 24 },
  { id: 'Uterine', label: 'Uterine', colour: '#4472C4', value: 66 },
  { id: 'Skin', label: 'Skin', colour: '#A8D08D', value: 77 },
  { id: 'Oral', label: 'Oral', colour: '#70C4C4', value: 87 },
  { id: 'Ovarian', label: 'Ovarian', colour: '#E371B2', value: 44 },
  { id: 'Brain', label: 'Brain', colour: '#70AD47', value: 23 },
  { id: 'Esophageal', label: 'Esophageal', colour: '#ED7D31', value: 11 },
  { id: 'Liver', label: 'Liver', colour: '#D64F42', value: 88 },
  { id: 'Thyroid', label: 'Thyroid', colour: '#4BACC6', value: 65 },
];

const DoughnutChart = ({ field }) => {
  const theme = useTheme();
  const [chartTheme] = injectTheme(theme)([chartThemeFn]);

  const config = {
    layout: 'horizontal',
    padding: 0.3,
    valueScale: { type: 'linear' },
    colors: { scheme: 'paired' },
    borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
    axisTop: null,
    axisRight: null,
    animate: false,
    enableGridX: false,
    enableGridY: false,
    enableLabel: false,
    axisBottom: {
      legend: 'Donors',
      legendPosition: 'middle',
      tickValues: 4,
      legendOffset: 34,
    },
    axisLeft: {
      legend: 'ID',
      legendPosition: 'middle',
      renderTick: () => null,
      legendOffset: -12,
    },
    margin: {
      top: 12,
      right: 24,
      left: 24,
      bottom: 56,
    },

    colorBy: 'indexValue',
    theme: chartTheme.theme,

    //temp data
    data: TEMP_DATA,
  };

  return (
    <ChartContainer css={css({ margin: '16px 0' })}>
      <Charts.Doughnut
        field={field}
        consumerConfig={config}
        onLoading={() => <Loader />}
        onError={() => <Error />}
      />
    </ChartContainer>
  );
};

export default DoughnutChart;
