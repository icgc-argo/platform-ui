import { css } from 'uikit';
import Container from 'uikit/Container';

export const DashboardCard: React.ComponentType<{ cardHeight?: string }> = ({
  children,
  cardHeight = '100%',
}) => (
  <Container
    css={css`
      height: ${cardHeight};
    `}
  >
    <div
      css={css`
        padding: 16px;
      `}
    >
      {children}
    </div>
  </Container>
);
