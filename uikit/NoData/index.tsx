import React from 'react';
import noDataSvg from 'uikit/assets/noData.svg';
import Typography from '../Typography';
import { css, styled } from '../';
import Link from 'uikit/Link';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;

type NoDataProps = {
  title?: string;
  subtitle?: string;
  link?: React.ReactNode;
} & React.ComponentProps<typeof Container>;

const NoData: React.ComponentType<NoDataProps> = ({
  children = <img alt="no data found" src={noDataSvg} />,
  title = 'No Data Found.',
  subtitle,
  link,
  ...rest
}) => (
  <Container {...rest}>
    {children}
    <Typography
      css={css`
        margin-top: 14px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="navigation"
      as="p"
      bold
    >
      {title}
    </Typography>
    <Typography
      css={css`
        margin-top: 10px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="data"
      as="p"
    >
      {subtitle}
    </Typography>
    {link}
  </Container>
);

export default NoData;
