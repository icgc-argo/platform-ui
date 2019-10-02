import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';
import { ThemeColorNames } from 'uikit/theme/types';
import Typography from 'uikit/Typography';

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

export const StatArea = (() => {
  const Container: React.ComponentType = ({ children }) => (
    <Typography
      variant="data"
      component="div"
      color="grey"
      css={css`
        display: flex;
        align-items: center;
        margin-right: 50px;
      `}
    >
      {children}
    </Typography>
  );
  const Section = styled('div')`
    display: flex;
    align-items: center;
    margin-right: 16px;
    text-align: center;
  `;
  const StatEntryContainer = styled('div')`
    margin-right: 5px;
    display: flex;
    align-items: center;
  `;
  return {
    Container,
    Section,
    StatEntryContainer,
  };
})();
