import styled from '@emotion/styled';

type FadingDivProps = {
  enterAnimationLength?: number;
  exitAnimationLength?: number;
};

export const FadingDiv = styled('div')`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  z-index: 9000;

  &.on-enter {
    opacity: 0.5;
  }
  &.on-enter-active {
    opacity: 1;
    transition: opacity ${(props: FadingDivProps) => props.enterAnimationLength || 500}ms;
  }
  &.on-exit {
    opacity: 1;
    transition: opacity ${(props: FadingDivProps) => props.enterAnimationLength || 500}ms;
  }
  &.on-exit-active {
    opacity: 0;
  }
`;
