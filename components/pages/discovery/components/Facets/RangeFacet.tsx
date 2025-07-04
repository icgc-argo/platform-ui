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

import { css, MenuItem } from '@icgc-argo/uikit';
import { useArrangerTheme } from '@overture-stack/arranger-components';
import { RangeAgg } from '@overture-stack/arranger-components/dist/aggregations';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { useRef } from 'react';

/**
 * Using custom wrapper component for facets so only some overrides are applicable
 * Mostly from "buckets" section of the code, which are the children passed to WrapperComponent
 */
const aggregationsStyles = {
  callerName: 'Discovery-Facets',
  components: {
    Aggregations: {
      RangeAgg: {
        RangeLabel: {
          // each of the labels with values
          borderRadius: '3px',
          css: css`
            font-size: 10px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: normal;
            padding: 0 4px;

            &.top {
              background: #dfdfe1;
            }
          `,
          fontWeight: 'bold',
        },
        RangeSlider: {
          // the knobs you click on to select a value
          borderColor: '#aeafb3',
          css: css`
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
          `,
        },
        RangeTrack: {
          // the line behind the component
          inBackground: '#4bc6f0', // within the selected range
          outBackground: '#04518c', // outside the selected range
        },
      },
    },
  },
};

// not tested for extensive SQON usage
const filterToArrangerV2 = (obj) => {
  return JSON.parse(JSON.stringify(obj).replaceAll('fieldName', 'field'));
};

const filterToArrangerV3 = (obj) => {
  return JSON.parse(JSON.stringify(obj).replaceAll('field', 'fieldName'));
};

// returns current value for a given field / operation
const currentFieldValue = ({ sqon, dotFieldName, op }) => {
  return sqon?.content?.find((filter) => filter.content?.field === dotFieldName && filter.op === op)
    ?.content.value;
};

const getSQONValues = ({ filters, fieldName }) => {
  if (Array.isArray(filters.content) && filters.content.length === 0) {
    return { min: 0, max: 100 };
  }
  return {
    min: currentFieldValue({ sqon: filters, dotFieldName: fieldName, op: '>=' }),
    max: currentFieldValue({ sqon: filters, dotFieldName: fieldName, op: '<=' }),
  };
};

/**
 * !important
 * Arranger v3 uses fieldName not field
 */
export const RangeFacet = ({ displayName, fieldName, stats }) => {
  // set styles side effect
  useArrangerTheme(aggregationsStyles);

  // current SQON
  const { filters, replaceAllFilters } = useFiltersContext();

  const currentSQON = getSQONValues({ filters, fieldName });

  /**
   * keep the range data across renders,
   * aggregations data changes based on filters
   * for range, we don't filter out values on the ui, we need the whole range to be visible
   */
  const statsRef = useRef({ min: 0, max: 100 });
  if (stats) {
    statsRef.current = stats;
  }

  return (
    <RangeAgg
      fieldName={fieldName}
      displayName={displayName}
      sqonValues={currentSQON}
      handleChange={({ generateNextSQON }) => {
        /**
         * SQON from RangeAgg uses "fieldName"
         * SQONViewer component in platform-ui uses v2 Arranger code that uses "field"
         */
        const newSQON = generateNextSQON(filterToArrangerV3(filters));
        const newFiltersArrangerV2 = filterToArrangerV2(newSQON);
        replaceAllFilters(newFiltersArrangerV2);
      }}
      stats={statsRef.current}
      WrapperComponent={({ children, displayName }) => (
        <MenuItem
          className="FacetMenu"
          content={displayName}
          css={css`
            width: 100%;
          `}
          chevronOnLeftSide
          isFacetVariant
        >
          {children}
        </MenuItem>
      )}
    />
  );
};
