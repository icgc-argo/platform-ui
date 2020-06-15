/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from 'uikit';
import theme from 'uikit/theme/defaultTheme';
import dynamic from 'next/dynamic';
import useFiltersContext from '../hooks/useFiltersContext';
import { FileRepoFiltersType } from '../utils/types';
import Button from 'uikit/Button';
import isEmpty from 'lodash/isEmpty';
import { toDisplayValue } from '../utils';
import Typography from 'uikit/Typography';
import { FileCentricDocumentField } from '../FileTable/types';
import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';

type AndOp = 'and';

type FilterOp = AndOp | 'in' | 'is' | '>=' | '<=' | '>' | '<' | 'not' | 'filter';
type FilterObj = {
  op: FilterOp;
  content: {
    field: string;
    value: string[];
  };
};

type Filters = {
  op: AndOp;
  content: FilterObj[];
};

type ValueNode = React.FunctionComponent<{
  onClick?: () => void;
}>;

type FieldNode = React.FunctionComponent<{
  onClick?: () => void;
}>;
type Filter = React.FunctionComponent<{
  sqon: Filters | {};
  setSQON: ({ field, value }: { field: string; value: string }) => void;
  onClear?: () => void;
  Clear?: React.FunctionComponent<{}>;
  ValueCrumb?: ValueNode;
  FieldCrumb?: FieldNode;
}>;

const SQONView = dynamic(() => import('@arranger/components/dist/SQONView')) as Filter;
const Value = dynamic(() =>
  import('@arranger/components/dist/SQONView').then((comp) => comp.Value),
) as ValueNode;

const content = css`
  & .sqon-view {
    background-color: transparent;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0;
    margin: 3px 0 12px;
    & .sqon-group {
      flex-wrap: wrap;
    }
    & .sqon-group > * {
      margin-top: 10px;
    }
    & .sqon-view-empty {
      display: none;
    }
    & .sqon-bubble {
      display: flex;
      align-items: center;
      height: 22px;
      border-radius: 8px;
      font-family: Work Sans, sans-serif;
      font-size: 11px;
      font-weight: 300;
      letter-spacing: 0.2px;
      margin-right: 10px;
      flex: none;
    }
    & .sqon-bubble.sqon-clear {
      border: solid 1px ${theme.colors.grey_1};
      background-color: ${theme.colors.white};
      color: ${theme.colors.accent2_dark};
      &:hover {
        background-color: ${theme.button.colors.secondary.hover};
      }
      padding: 0 12px;
      text-transform: uppercase;
      font-weight: 600;
      cursor: pointer;
      border-radius: 20px;
    }
    & .sqon-op {
      color: inherit;
      font-weight: normal;
      margin-right: 5px;
    }
    & .sqon-value {
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.white};
      padding: 0 7px 0 12px;
      margin-right: 4px;
      cursor: pointer;
      padding: 0 7px;
      margin-right: 6px;
      font-weight: bold;
      cursor: pointer;
      text-transform: capitalize;
    }
    & .sqon-less,
    .sqon-more {
      background-color: ${theme.colors.secondary_1};
      color: ${theme.colors.white};
      padding: 0 12px;
      text-transform: uppercase;
      cursor: pointer;
      margin-right: 6px;
      cursor: pointer;
      justify-content: center;
      display: flex;
      align-items: center;
      height: 22px;
      border-radius: 8px;
      font-size: 11px;
      letter-spacing: 0.2px;
      flex: none;
      font-weight: 500;
      font-family: Work Sans, sans-serif;
    }
    & .sqon-more {
      width: 20px;
      padding: 0 5px;
      justify-content: center;
    }
    & .sqon-less {
      padding: 0 10px;
    }
    & .sqon-value-group {
      font-size: 22px;
      line-height: 22px;
      color: ${theme.colors.secondary};
    }
    & .sqon-value-group-start {
      margin-right: 6px;
      margin-left: 2px;
    }
    & .sqon-value-group-end {
      margin-right: 10px;
    }
    & .sqon-value:after {
      content: url(data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%228%22%20stroke%3D%22white%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%228%22%20y2%3D%228%22%20/%3E%0A%20%20%3Cline%20x1%3D%228%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%228%22%20/%3E%0A%3C/svg%3E);
      margin-left: 9px;
    }

    & .sqon-value-single {
      margin-right: 10px;
    }
  }
`;

const FieldCrumb = ({ field }: { field: FileCentricDocumentField }) => {
  const { data: fieldDisplayName } = useFileCentricFieldDisplayName();
  return (
    <Typography
      bold
      css={css`
        margin: 0px;
        margin-right: 0.3rem;
        text-transform: uppercase;
        font-size: 12px;
      `}
    >
      {fieldDisplayName[field] || field}
    </Typography>
  );
};

const QueryBar = ({ filters }: { filters: FileRepoFiltersType }) => {
  const { clearFilters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  return (
    <div css={content}>
      <SQONView
        sqon={filters}
        setSQON={setFilterFromFieldAndValue}
        Clear={() => (
          <Button className="sqon-bubble sqon-clear" onClick={() => clearFilters()}>
            Clear
          </Button>
        )}
        // @ts-ignore types from arranger is just wrong here, it isn't even ts
        FieldCrumb={({ field }) => <FieldCrumb field={field} />}
        ValueCrumb={({ field, value, nextSQON, ...props }: any) => (
          <Value
            onClick={() => {
              // deleting the last value listed returns nextSQON = null, so check if empty to reset to defaultFilters
              if (isEmpty(nextSQON)) {
                clearFilters();
              } else {
                replaceAllFilters(nextSQON);
              }
            }}
            {...props}
          >
            {toDisplayValue(value)}
          </Value>
        )}
      />
    </div>
  );
};

export default QueryBar;
