/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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

import { chartColors } from 'components/pages/discovery';

/**
 * map
 * inner => outer
 * clicking inner ring filters with outer values
 *
 * our dynamic data from api is the property key
 */

export const cancerTypeCodeMapping = {
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

/**
 * formats the data dynamic data with a mapping
 */
export const createCategoryMap = (dynamicData, mapping) => {
  const categoryMap = new Map();
  // put in order to line up
  dynamicData.forEach((code) => {
    const parentId = mapping[code.key];

    // no cancer type mapping, skip
    if (!parentId) {
      return;
    }

    if (!categoryMap.has(parentId)) {
      categoryMap.set(parentId, { total: code.doc_count, codes: [{ ...code, parentId }] });
    } else {
      const { total, codes: existingCodes } = categoryMap.get(parentId);
      const updatedCodes = existingCodes.concat([code]);
      categoryMap.set(parentId, { total: total + code.doc_count, codes: updatedCodes });
    }
  });

  return categoryMap;
};

type Segment = {
  id: string;
  label: string;
  value: number | string;
  color: string;
  parentId?: string;
  children?: string[];
};

/**
 * Format for input into chart
 *
 * @param categoryMap
 * @returns
 */
export const createChartInput = (categoryMap) => {
  return Array.from(categoryMap).reduce<{
    inner: Segment[];
    outer: Segment[];
    legend: { label: string; color: string }[];
  }>(
    (acc, category, index) => {
      // @ts-ignore TS doesn't like tuple
      const [name, { codes, total }] = category;

      // don't show undefined values
      if (name === undefined) {
        return acc;
      }

      const color = chartColors[index];

      const inner = acc.inner.concat({
        id: name,
        label: name,
        value: total,
        children: codes.map((code) => code.key),
        color,
      });

      const outer = acc.outer.concat(
        codes.map((code) => ({
          id: code.key,
          label: code.key,
          value: code.doc_count,
          parentId: code.parentId,
          color,
        })),
      );
      const legend = acc.legend.concat({ label: name, color });

      return { outer, inner, legend };
    },
    {
      legend: [],
      outer: [],
      inner: [],
    },
  );
};
