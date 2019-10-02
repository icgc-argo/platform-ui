import { css } from 'uikit';
import Icon from 'uikit/Icon';
import { ThemeColorNames } from 'uikit/theme/types';

export const containerStyle = css`
  padding: 8px;
  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;
export const instructionBoxButtonIconStyle = css`
  margin-right: 5px;
`;
export const instructionBoxButtonContentStyle = css`
  display: flex;
  align-items: center;
`;
export const instructionBoxButtonStyle = css`
  margin-top: 10px;
`;

export const DataTableStarIcon = (props: { fill: keyof ThemeColorNames }) => (
  <Icon name="star" fill={props.fill} width="16px" height="16px" />
);
