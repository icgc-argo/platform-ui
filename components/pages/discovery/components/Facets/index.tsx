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

import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';

import {
  getOptions,
  useFacetOptionToggle,
  useFacetSelectAllOptionsToggle,
} from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { get } from 'lodash';
import { FacetPanelOptions } from '../../data/facet';
import DISCOVERY_FACETS_QUERY from './DISCOVERY_FACETS_QUERY';
import { Facet, FacetRow } from './Facet';
import { FacetStateProvider, useFacetState } from './FacetStateProvider';
import { FacetFolder } from './Folder';
import { FiltersSearchBox } from './Search';

/**
 *
 * Takes aggregations state and a set of facets
 * Adds in relevant state for facets
 * return Facet component with state and callbacks
 *
 * @param aggregations
 * @param isLoading
 * @param staticFacetss
 * @returns Rendered facet panel
 */

const FacetCollection = ({
  aggregations,
  isLoading,
  staticFacets,
}: {
  aggregations: any;
  isLoading: boolean;
  staticFacets: FacetPanelOptions;
}) => {
  const { filters } = useFiltersContext();
  const { isFacetExpanded, isFolderExpanded, setVisiblePanels } = useFacetState();

  return (
    <>
      {staticFacets.map(({ name, contents }) => {
        return (
          <FacetFolder
            title={name}
            onClick={() => setVisiblePanels({ type: 'TOGGLE_FOLDER', name })}
            isExpanded={isFolderExpanded(name)}
          >
            {contents.map((facet) => {
              const options = getOptions(facet, filters, aggregations);
              const onOptionToggle = useFacetOptionToggle(facet);
              const onSelectAllOptions = useFacetSelectAllOptionsToggle(facet, aggregations);

              const facetProps = {
                ...facet,
                ...{
                  options,
                  onOptionToggle,
                  onSelectAllOptions,
                  isExpanded: isFacetExpanded(facet.facetPath),
                  onClick: () =>
                    setVisiblePanels({ type: 'TOGGLE_PATH', facetPath: facet.facetPath }),
                },
              };
              return (
                <FacetRow>
                  <Facet facet={facetProps} aggregations={aggregations} />
                </FacetRow>
              );
            })}
          </FacetFolder>
        );
      })}
    </>
  );
};

/**
 *
 * External data loading and filtering
 *
 * @param options - hardcoded facet options
 */
const Facets = ({ options }) => {
  const { filters } = useFiltersContext();
  const {
    data: responseData,
    loading: isLoading,
    error,
  } = useQuery(DISCOVERY_FACETS_QUERY, {
    variables: { filters },
  });

  const aggregations = get(responseData, 'file.aggregations', {});

  const { setVisiblePanels, isFacetExpanded } = useFacetState();

  return (
    <>
      <FiltersSearchBox
        title="Filter"
        isExpanded={isFacetExpanded('')}
        onClick={() => setVisiblePanels({ type: 'TOGGLE_ALL' })}
      />
      <div css={css({ flex: 1, overflow: 'scroll' })}>
        <FacetCollection aggregations={aggregations} staticFacets={options} isLoading={isLoading} />
      </div>
    </>
  );
};

/**
 *
 * Facets panel wrapped in a state provider
 *
 * @param staticFacetOptions - hardcoded facet options
 * @returns Facets panel components
 */
const FacetsPanel = ({ staticFacetOptions }: { staticFacetOptions: FacetPanelOptions }) => {
  return (
    <FacetStateProvider staticFacetOptions={staticFacetOptions}>
      <Facets options={staticFacetOptions} />
    </FacetStateProvider>
  );
};

export default FacetsPanel;
