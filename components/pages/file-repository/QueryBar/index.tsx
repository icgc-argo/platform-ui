import { css } from 'uikit';
import theme from 'uikit/theme/defaultTheme';
import dynamic from 'next/dynamic';
import useSqonContext from 'global/hooks/useSqonContext';
import Button from 'uikit/Button';

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
  onClick?: Function;
}>;
type Sqon = React.FunctionComponent<{
  sqon: Filters | {};
  setSQON: Function;
  onClear?: Function;
  Clear?: any;
  ValueCrumb?: ValueNode;
  FieldCrumb?: any;
}>;

const SQONView = dynamic(() => import('@arranger/components/dist/SQONView')) as Sqon;
const Value = dynamic(() =>
  import('@arranger/components/dist/SQONView').then(comp => comp.Value),
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
    & .sqon-field {
      font-weight: 600;
      text-transform: uppercase;
      margin-right: 0.3rem;
      font-size: 12px;
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

const QueryBar = ({ sqon = {} }) => {
  const { clearSQON, setSQON } = useSqonContext();

  return (
    <div css={content}>
      <SQONView
        sqon={sqon}
        setSQON={setSQON}
        Clear={() => (
          <Button className="sqon-bubble sqon-clear" onClick={() => clearSQON()}>
            Clear
          </Button>
        )}
        ValueCrumb={({ field, value, nextSQON, ...props }: any) => (
          <Value onClick={() => setSQON(nextSQON)} {...props}>
            {value}
          </Value>
        )}
      />
    </div>
  );
};

export default QueryBar;
