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

import {
  CombinationKeys,
  FieldOperator,
} from '@overture-stack/arranger-components/dist/SQONViewer/types';
import { defaultFilters } from 'components/pages/file-repository/hooks/useFiltersContext';
import { FileRepoFiltersType } from 'components/pages/file-repository/utils/types';
import isEmpty from 'lodash/isEmpty';

export type FacetFilter = {
  op: CombinationKeys;
  content: Array<FieldOperator>;
};
/**
 * Converts Arranger v2 filter to Arranger v3
 * - changes "field" to "fieldName"
 * - IMPORTANT: does not take into account nested filters
 *
 * Large amount of functionality already in use with filters.
 * This is a quick fix to make it work with Arranger v3
 */
export const toArrangerV3Filter = (inputFilter: FileRepoFiltersType) => {
  if (isEmpty(inputFilter?.content)) {
    // empty filter SQON object
    return defaultFilters;
  }
  const content = inputFilter.content.map((filter) => {
    // ignore FilterField fields property as is
    if (filter.content.hasOwnProperty('fields')) {
      return filter;
    } else {
      return {
        ...filter,
        content: {
          fieldName: filter.content.field,
          value: filter.content.value,
        },
      };
    }
  });

  return {
    content,
    op: inputFilter.op,
  };
};
