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

import stringify from 'fast-json-stable-stringify';
import useUrlParamState from 'global/hooks/useUrlParamState';
import { createContext, useContext } from 'react';
import sqonBuilder from 'sqon-builder';
import { addInFilters } from '../utils';
import { FileRepoFiltersType } from '../utils/types';

type FiltersContextType = {
  filters: FileRepoFiltersType;
  clearFilters: () => void;
  setFilterFromFieldAndValue: ({
    field,
    value,
  }: {
    field: string;
    value: string | string[];
  }) => FileRepoFiltersType | undefined;
  replaceAllFilters: (filters: FileRepoFiltersType) => void;
};

export const defaultFilters: FileRepoFiltersType = {
  op: 'and',
  content: [],
};

const FiltersContext = createContext<FiltersContextType>({
  filters: defaultFilters,
  clearFilters: () => {},
  setFilterFromFieldAndValue: () => undefined,
  replaceAllFilters: () => {},
});

// stringifying SQONs
const useFilterState = () => {
  const [currentFilters, setCurrentFilters] = useUrlParamState('filters', defaultFilters, {
    serialize: (v) => stringify(v),
    deSerialize: (v) => JSON.parse(v),
  });

  return { currentFilters, setCurrentFilters };
};

export function FiltersProvider({ children }) {
  const { currentFilters, setCurrentFilters } = useFilterState();

  const clearFilters = () => {
    setCurrentFilters(defaultFilters);
  };

  const replaceAllFilters = (filters) => setCurrentFilters(filters);
  const setFilterFromFieldAndValue = ({ field, value }) => {
    const operator = sqonBuilder.has(field, value).build();
    const newFilters = addInFilters(operator, currentFilters);
    setCurrentFilters(newFilters);
    return newFilters;
  };

  const data = {
    filters: currentFilters,
    setFilterFromFieldAndValue,
    clearFilters,
    replaceAllFilters,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useFiltersContext() {
  return useContext(FiltersContext);
}
