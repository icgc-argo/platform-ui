import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from 'uikit';
import { range } from 'lodash';

const LoaderContainer = styled('div')`
  padding-top: 15px;
  padding-bottom: 15px;
  width: ${({ dotsCount }) => dotsCount * 10}px;

  div:nth-of-type(odd) {
    position: absolute;
  }
  div:nth-of-type(even) {
    width: ${({ dotsCount }) => dotsCount * 10}px;
  }
  span {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    transform: scale(0, 0);
  }

  ${({ dotsCount }) =>
    range(1, dotsCount + 1).map(
      i => css`
        div:nth-of-type(odd) span:nth-of-type(${i}) {
          animation: animateFirstDots 0.8s ease-in-out infinite;
          animation-direction: alternate;
          animation-delay: ${i * 0.2}s;
        }
        div:nth-of-type(even) span:nth-of-type(${i}) {
          animation: animateSecondDots 0.8s ease-in-out infinite;
          animation-direction: alternate-reverse;
          animation-delay: ${i * 0.2}s;
        }
      `,
    )}

  @keyframes animateFirstDots {
    0% {
      transform: translateY(200%) scale(0.7, 0.7);
      background-color: ${({ theme }) => theme.colors.accent1};
    }
    100% {
      transform: translateY(-200%) scale(1, 1);
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  @keyframes animateSecondDots {
    0% {
      transform: translateY(200%) scale(0.7, 0.7);
      background-color: ${({ theme }) => theme.colors.accent4};
    }
    100% {
      transform: translateY(-200%) scale(1, 1);
      background-color: ${({ theme }) => theme.colors.warning};
    }
  }
`;

const DnaLoader = ({ dotsCount = 5, ...rest }) => (
  <LoaderContainer className="dna-loader" dotsCount={dotsCount} {...rest}>
    <div>
      {range(0, dotsCount).map(i => (
        <span key={i} />
      ))}
    </div>
    <div>
      {range(0, dotsCount).map(i => (
        <span key={i} />
      ))}
    </div>
  </LoaderContainer>
);

DnaLoader.propTypes = {
  dotsCount: PropTypes.number,
};

export default DnaLoader;
