import React, { HtmlHTMLAttributes, HTMLAttributes } from 'react';
import { useTheme } from '../../ThemeProvider';
import { css, styled } from '../..';
import Typography from 'uikit/Typography';
import Tag from 'uikit/Tag';
import FocusWrapper from 'uikit/FocusWrapper';

const Triangle = styled('div')`
  transition: all 0.25s;
  width: 0px;
  position: absolute;
  text-align: center;
  left: 100%;
  top: 1px;
  top: 50%;
  margin-top: -18px;
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
    top: 0px;
    border-color: transparent transparent transparent ${({ theme }) => theme.colors.secondary_4};
    border-width: calc(20px - 2px);
  }
  &:before {
    top: -3px;
    border-color: transparent transparent transparent ${({ theme }) => theme.colors.secondary_2};
    border-width: calc(23px - 2px);
  }
`;
const BaseItemContainer = styled(FocusWrapper)`
  width: 100%;
  position: relative;
  transition: all 0.25s;
  min-height: 22px;
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
const ActiveItemContainer = styled(BaseItemContainer)`
  border-color: ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.secondary_2};
  border-bottom-color: ${({ theme }) => theme.colors.secondary_2};
  border-right: solid 1px ${({ theme }) => theme.colors.secondary_2};
  background: ${({ theme }) => theme.colors.secondary_4};
  color: ${({ theme }) => theme.colors.secondary_dark};
  &:hover {
    background: ${({ theme }) => theme.colors.secondary_4};
  }
`;

const VerticalTabsItem: React.ComponentType<
  { active?: boolean } & HTMLAttributes<HTMLButtonElement>
> = ({ active = false, children, ...rest }) => {
  const ContainerComponent = active ? ActiveItemContainer : BaseItemContainer;
  return (
    <ContainerComponent {...rest}>
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
      {active && <Triangle />}
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
