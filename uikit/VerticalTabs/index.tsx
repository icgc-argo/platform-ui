import React, { HtmlHTMLAttributes, HTMLAttributes } from 'react';
import { useTheme } from '../ThemeProvider';
import { css, styled } from '..';
import Typography from 'uikit/Typography';
import Tag from 'uikit/Tag';
import FocusWrapper from 'uikit/FocusWrapper';
import useElementDimention from 'uikit/utils/Hook/useElementDimention';

const Triangle = styled('div')<{ tabStyle: TabStyleType; contHeight: number }>`
  transition: all 0.25s;
  width: 0px;
  position: absolute;
  text-align: center;
  left: 100%;
  top: 0;
  transform: scaleX(0.5);
  &:after,
  &:before {
    transition: all 0.25s;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }
  &:after {
    border-color: transparent transparent transparent
      ${({ theme, tabStyle }) => (tabStyle ? tabStyle.background : theme.colors.secondary_4)};
    border-width: ${({ contHeight }) => contHeight / 2}px;
  }
  &:before {
    top: -1px;
    left: 1px;
    border-color: transparent transparent transparent
      ${({ theme, tabStyle }) => (tabStyle ? tabStyle.border : theme.colors.secondary_2)};
    border-width: ${({ contHeight }) => (contHeight + 2) / 2}px; /* +2 for border around button */
  }
`;

const BaseItemContainer = styled(FocusWrapper)<{ tabStyle: TabStyleType }>`
  width: 100%;
  position: relative;
  transition: all 0.25s;
  min-height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: solid 1px;
  border-left: solid 3px;
  border-right: none;
  border-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grey_3};
  }
`;
const ActiveItemContainer = styled(BaseItemContainer)<{ tabStyle: TabStyleType }>`
  border-color: ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.secondary_2};
  border-bottom-color: ${({ theme }) => theme.colors.secondary_2};
  border-right: solid 1px ${({ theme }) => theme.colors.secondary_2};
  background: ${({ theme, tabStyle }) =>
    tabStyle ? tabStyle.background : theme.colors.secondary_4};
  color: ${({ theme }) => theme.colors.secondary_dark};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary_4};
  }
`;

type TabStyleType = { border: string; background: string };

const VerticalTabsItem: React.ComponentType<
  { active?: boolean; tabStyle?: TabStyleType } & HTMLAttributes<HTMLButtonElement>
> = ({ active = false, children, tabStyle, ...rest }) => {
  const ContainerComponent = active ? ActiveItemContainer : BaseItemContainer;
  const containerRef = React.useRef(null);

  const { height: contHeight } = useElementDimention(containerRef);

  return (
    <ContainerComponent tabStyle={tabStyle} {...rest} ref={containerRef}>
      <Typography
        variant="data"
        as="div"
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          `}
        >
          {children}
        </div>
      </Typography>
      {active && <Triangle tabStyle={tabStyle} contHeight={contHeight} />}
    </ContainerComponent>
  );
};
VerticalTabsItem.displayName = 'VerticalTabs.Item';

const VerticalTabs: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-right: solid 1px ${theme.colors.grey_2};
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

const TabsItemTag: typeof Tag = styled(Tag)`
  min-width: 30px;
  justify-content: center;
  text-align: center;
`;
TabsItemTag.displayName = 'VerticalTabs.Tag';

const output: typeof VerticalTabs & {
  Item: typeof VerticalTabsItem;
  Tag: typeof Tag;
} = (() => {
  const output = VerticalTabs as any;
  output.Item = VerticalTabsItem;
  output.Tag = TabsItemTag;
  return output;
})();

export default output;
