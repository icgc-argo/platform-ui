import { css } from 'uikit';
import Container from 'uikit/Container';

export const DashboardCard: React.ComponentType<{ cardHeight?: string; loading?: boolean }> = ({
  children,
  cardHeight = '100%',
  loading = false,
}) => (
  <Container
    loading={loading}
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
