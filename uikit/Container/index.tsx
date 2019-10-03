import * as React from 'react';
import * as ReactDOM from 'react-dom';
import color from 'color';
import { css, styled } from '..';
import useTheme from '../utils/useTheme';
import DnaLoader from '../DnaLoader';

const ContainerBackground = styled('div')`
  border-radius: 8px;
  position: relative;
  overflow: ${(props: any) => (props.loading ? 'hidden' : 'visible')};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoadingOverlay = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background: ${color(theme.colors.white)
          .alpha(0.7)
          .hsl()
          .string()};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <DnaLoader />
    </div>
  );
};

const Container: React.ComponentType<
  {
    loading?: boolean;
  } & React.ComponentProps<typeof ContainerBackground>
> = ({ children, loading = false, ...props }) => (
  <ContainerBackground loading={loading} {...props}>
    {children}
    {loading && <LoadingOverlay />}
  </ContainerBackground>
);

export default Container;
