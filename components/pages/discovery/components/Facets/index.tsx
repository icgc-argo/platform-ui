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

import { SQONType, useArrangerData } from '@overture-stack/arranger-components';
import {
  getOptions,
  useFacetOptionToggle,
  useFacetSelectAllOptionsToggle,
} from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { FileRepoFiltersType } from 'components/pages/file-repository/utils/types';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { get, isEmpty } from 'lodash';
import { FacetPanelOptions } from '../../data/facet';
import DISCOVERY_FACETS_QUERY from './DISCOVERY_FACETS_QUERY';
import { Facet, FacetRow } from './Facet';
import {
  FacetStateProvider,
  FACET_VISIBILITY_TOGGLE_ACTIONS,
  useFacetState,
} from './FacetStateProvider';
import { FacetFolder } from './Folder';
import { RangeFacet } from './RangeFacet';
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
  const { setSQON } = useArrangerData();
  const { isFacetExpanded, isFolderExpanded, setVisiblePanels } = useFacetState();

  return (
    <>
      {staticFacets.map(({ name, contents }, idx) => {
        return (
          <FacetFolder
            title={name}
            onClick={() =>
              setVisiblePanels({ type: FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_FOLDER, name })
            }
            isExpanded={isFolderExpanded(name)}
            key={`name_${idx}`}
          >
            {contents.map((facet) => {
              if (facet.variant === 'NumericAggregation') {
                const stats = aggregations[facet.facetPath]?.stats;

                return (
                  <RangeFacet
                    displayName={facet.name}
                    fieldName={facet.esDocumentField}
                    stats={stats}
                  />
                );
              } else {
                // default to "Aggregation" type
                const options = getOptions(facet, filters, aggregations);

                /**
                 * toggle facet panel and ArrangerDataProvider state for charts
                 */
                const facetToggle = useFacetOptionToggle(facet);
                const onOptionToggle = (facetValue) => {
                  // set ARGO url filters (not using Arranger v3)
                  const filter = facetToggle(facetValue);
                  // set SQON for Arranger v3 features in use
                  setSQON(toArrangerV3Filter(filter) as SQONType);
                };

                const facetAllToggle = useFacetSelectAllOptionsToggle(facet, aggregations);
                const onSelectAllOptions = (facetValue) => {
                  // set ARGO url filters (not using Arranger v3)
                  const filter = facetAllToggle(facetValue) as FileRepoFiltersType;
                  // set SQON for Arranger v3 features in use
                  setSQON(toArrangerV3Filter(filter) as SQONType);
                };

                const facetProps = {
                  ...facet,
                  ...{
                    parseDisplayValue: (value) => {
                      const IS_MISSING = '__missing__';
                      if (value === IS_MISSING) {
                        return 'No Data';
                      }
                      return value;
                    },
                    options,
                    onOptionToggle,
                    onSelectAllOptions,
                    isExpanded: isFacetExpanded(facet.facetPath),
                    onClick: () =>
                      setVisiblePanels({
                        type: FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_PATH,
                        facetPath: facet.facetPath,
                      }),
                  },
                };

                return isEmpty(options) ? null : (
                  <FacetRow key={facet.facetPath}>
                    <Facet {...facetProps} />
                  </FacetRow>
                );
              }
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

  const { setVisiblePanels, isExpanded } = useFacetState();

  /**
   * response aggregations + static facet options
   * this is inbuilt functionality in Arranger v3
   */
  return (
    <>
      <FiltersSearchBox
        title="Filter"
        isExpanded={isExpanded}
        onClick={() => setVisiblePanels({ type: FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_ALL })}
      />
      <div css={css([{ flex: 1, overflow: 'scroll' }])}>
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
