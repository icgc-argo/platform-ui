import React from 'react';
import { createPage } from 'global/utils/pages';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import { css, styled } from 'uikit';
import debounce from 'lodash/debounce';
import { useTheme } from 'uikit/ThemeProvider';
import { Tree as ReactTree, TreeNode } from 'react-organizational-chart';
import Button from 'uikit/Button';

type TreeData = {
  name: string;
  children?: Array<TreeData>;
};
const table: Array<{ name: string; parent: string }> = [
  { name: 'donor', parent: '' },
  { name: 'clinical_trial', parent: 'donor' },
  { name: 'trial_observation', parent: 'clinical_trial' },
  { name: 'specimen', parent: 'donor' },
  { name: 'sample', parent: 'specimen' },
  { name: 'follow_up', parent: 'donor' },
  { name: 'primary_diagnosis', parent: 'donor' },
  { name: 'treatment', parent: 'primary_diagnosis' },
  { name: 'chemotherapy', parent: 'treatment' },
  { name: 'radiation', parent: 'treatment' },
];
const data: TreeData = {
  name: 'donor',
  children: [
    {
      name: 'clinical_trial',
      children: [
        {
          name: 'trial_observation',
        },
      ],
    },
    {
      name: 'specimen',
      children: [
        {
          name: 'sample',
        },
      ],
    },
    {
      name: 'follow_up',
    },
    {
      name: 'primary_diagnosis',
      children: [
        {
          name: 'treatment',
          children: [
            {
              name: 'chemotherapy',
            },
            {
              name: 'radiation',
            },
          ],
        },
      ],
    },
  ],
};

type Tree = TreeData & {
  state: {
    isOpen: false;
  };
};

const NodeContent = ({ children }) => {
  const Pill = styled('div')`
    border-radius: 10px;
    max-width: 200px;
    width: 100%;
    border: solid 1px ${({ theme }) => theme.colors.warning_dark};
    background-color: ${({ theme }) => theme.colors.white};
  `;
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <Pill>
        <Pill>
          Some Header Text here
          <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
            expand
          </Button>
        </Pill>
        {children}
        {isOpen && (
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make
          </div>
        )}
      </Pill>
    </div>
  );
};

export default createPage({
  isPublic: true,
})(() => {
  const containerRef = React.createRef<HTMLDivElement>();
  const [{ width, height }, setDimention] = React.useState({
    width: 0,
    height: 0,
  });
  const nodeSize = {
    width: 300,
    height: 200,
  };
  type Point = { x: number; y: number };
  const theme = useTheme();
  const [currentPan, setCurrentPan] = React.useState<Point>({ x: 0, y: 0 });
  const [panStartPosition, setPanStartPosition] = React.useState<Point>(null);
  const [isPanning, setIsPanning] = React.useState(false);

  const root = React.useMemo(() => d3.hierarchy(data, node => node.children), [data]);
  const info = React.useMemo(
    () =>
      d3
        .tree<TreeData>()
        .nodeSize([nodeSize.width, nodeSize.height])
        .separation(() => 1000)
        .size([width, height - nodeSize.height])(root),
    [width, height],
  );

  React.useEffect(() => {
    const sync = () => setDimention({ width: 1440, height: 1000 });
    sync();
    const onResize = debounce(sync, 500);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    const onMouseUp = () => {
      setPanStartPosition(null);
      setIsPanning(false);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  });

  return (
    // <div
    //   css={css`
    //     width: 100%;
    //     height: 100%;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //   `}
    // >
    //   <div
    //     ref={containerRef}
    //     id="yo"
    //     css={css`
    //       width: 80%;
    //       height: 80%;
    //       overflow: scroll;
    //       position: relative;
    //       border: solid 2px red;
    //       * {
    //         transition: all 0.5s;
    //       }
    //     `}
    //   >
    //     {info && (
    //       <div
    //         style={{
    //           cursor: 'move',
    //           position: 'absolute',
    //           left: `${currentPan.x}px`,
    //           top: `${currentPan.y}px`,
    //           transition: 'none',
    //         }}
    //         onMouseDown={e => {
    //           setPanStartPosition({
    //             x: e.movementX,
    //             y: e.movementY,
    //           });
    //           setIsPanning(true);
    //         }}
    //         onMouseMove={e => {
    //           if (isPanning) {
    //             setCurrentPan({
    //               x: Math.max(
    //                 Math.min(currentPan.x + (e.movementX - panStartPosition.x), 0),
    //                 containerRef.current.clientWidth - width,
    //               ),
    //               y: Math.max(
    //                 Math.min(currentPan.y + (e.movementY - panStartPosition.y), 0),
    //                 containerRef.current.clientHeight - height,
    //               ),
    //             });
    //           }
    //         }}
    //       >
    //         <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    //           <g>
    //             {info.links().map((d, i) => {
    //               const sourceY = d.source.y + nodeSize.height;
    //               return (
    //                 <path
    //                   key={i}
    //                   fill="none"
    //                   stroke="red"
    //                   d={`M${d.source.x},${sourceY} ${d.target.x},${d.target.y}`}
    //                 />
    //               );
    //             })}
    //           </g>
    //         </svg>
    //         <>
    //           {info.descendants().map((node, i) => {
    //             return (
    //               <div
    //                 key={i}
    //                 css={css`
    //                   position: absolute;
    //                   left: ${node.x - nodeSize.width / 2}px;
    //                   top: ${node.y}px;
    //                   width: ${nodeSize.width}px;
    //                   height: ${nodeSize.height}px;
    //                   border-radius: 10px;
    //                   border: solid 1px ${theme.colors.warning_dark};
    //                   background-color: ${theme.colors.white};
    //                 `}
    //               >
    //                 <div>{node.data.name}</div>
    //               </div>
    //             );
    //           })}
    //         </>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <ReactTree
      lineWidth={'2px'}
      lineColor={theme.colors.primary_1}
      lineBorderRadius={'10px'}
      lineHeight="50px"
      nodePadding="5px"
      label={<NodeContent>Root</NodeContent>}
    >
      <TreeNode label={<NodeContent>Child 1</NodeContent>}>
        <TreeNode
          label={
            <NodeContent>
              <div>asdf</div>
              Grand Child
            </NodeContent>
          }
        />
        <TreeNode label={<NodeContent>Grand Child</NodeContent>}>
          <TreeNode
            label={
              <NodeContent>
                <div>asdf</div>
                Grand Child
              </NodeContent>
            }
          />
          <TreeNode label={<NodeContent>Grand Child</NodeContent>}>
            <TreeNode label={<NodeContent>Grand Child</NodeContent>} />
            <TreeNode label={<NodeContent>Grand Child</NodeContent>} />
            <TreeNode label={<NodeContent>Grand Child</NodeContent>} />
          </TreeNode>
          <TreeNode label={<NodeContent>Grand Child</NodeContent>} />
          <TreeNode
            label={
              <NodeContent>
                <div>asdf</div>
                Grand Child
              </NodeContent>
            }
          />
        </TreeNode>
      </TreeNode>
    </ReactTree>
  );
});
