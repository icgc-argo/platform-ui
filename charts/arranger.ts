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

/**
 * It is consistent with usage across this repo eg. `useQuery` and per component querying
 */

import { useQuery } from '@apollo/client';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { Options } from './Chart';

/**
 *
 * Queries Arranger server using provided query and variables
 * Also applies in filters if context is available
 * On success, transforms response using provided dataTransformer
 *
 * @param options
 * @param options.query - GQL query
 * @param options.variables - GQL variables object
 * @param options.dataTransformer - Function to transform raw query response to chart data
 *
 * @returns Data, loading and error states
 */

export const useArrangerCharts = ({ query, variables, dataTransformer }: Options) => {
  const { filters } = useFiltersContext();

  const arrangerV3Filters = toArrangerV3Filter(filters);
  const {
    data: rawData,
    loading,
    error,
  } = useQuery(query, {
    variables: {
      ...variables,
      filters: arrangerV3Filters,
    },
  });

  const data =
    (!error && !loading && typeof dataTransformer === 'function' && dataTransformer(rawData)) ||
    rawData;

  return {
    data,
    loading,
    error,
  };
};
