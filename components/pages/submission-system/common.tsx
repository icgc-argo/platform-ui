import { displayDateAndTime } from 'global/utils/common';
import urlJoin from 'url-join';
import { css, styled } from 'uikit';
import Icon, { Outline } from 'uikit/Icon';
import { ThemeColorNames } from 'uikit/theme/types';
import Typography from 'uikit/Typography';
import { formatFileName } from './program-sample-registration/util';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import { HtmlHTMLAttributes } from 'react';
import { getConfig } from 'global/config';

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

export const CellContentCenter = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DataTableStarIcon = (props: { fill: keyof ThemeColorNames; outline?: Outline }) => (
  <Icon name="star" width="16px" height="16px" {...props} />
);
export const StatArea: {
  Container: React.ComponentType;
  Section: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement> & { faded?: boolean }>;
  StatEntryContainer: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>>;
  StarIcon: typeof DataTableStarIcon;
} = (() => {
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
  const Section = styled('div')<{ faded?: boolean }>`
    display: flex;
    align-items: center;
    margin-right: 16px;
    text-align: center;
    opacity: ${({ faded }) => (faded ? 0.3 : 1)};
  `;
  const StatEntryContainer = styled('div')`
    margin-right: 5px;
    display: flex;
    align-items: center;
  `;
  const StarIcon: typeof DataTableStarIcon = props => (
    <div
      css={css`
        margin-right: 5px;
        display: flex;
      `}
    >
      <DataTableStarIcon {...props} />
    </div>
  );
  return {
    Container,
    Section,
    StatEntryContainer,
    StarIcon,
  };
})();

export const SubmissionInfoArea = ({
  fileName,
  createdAt,
  creator,
}: {
  fileName: string;
  creator: string;
  createdAt: string;
}) => (
  <Typography
    variant="data"
    component="div"
    css={css`
      text-align: right;
    `}
  >
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {formatFileName(fileName)}{' '}
    </Typography>
    uploaded on{' '}
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {displayDateAndTime(createdAt)}{' '}
    </Typography>
    by{' '}
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {creator}
    </Typography>
  </Typography>
);

export const TableInfoHeaderContainer = ({
  left,
  right,
  noMargin,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  noMargin?: boolean;
}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        margin-bottom: ${noMargin ? '0px' : '3px'};
        border-radius: 2px;
        background-color: ${theme.colors.grey_3};
        padding: 8px;
      `}
    >
      <Row nogutter>
        {left}
        <Col align="end">{right}</Col>
      </Row>
    </div>
  );
};

export const downloadTsvFileTemplate = (fileName: string) => {
  const { GATEWAY_API_ROOT } = getConfig();
  window.location.assign(urlJoin(GATEWAY_API_ROOT, `clinical/template/${fileName}`));
};
