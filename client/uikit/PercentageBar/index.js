import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../utils/useTheme';
import Typography from '../Typography';
import Icon from '../Icon';
import { css } from '../';
import { withProps } from 'recompose';

const ValignedText = withProps(() => ({
  variant: 'data',
  component: 'span',
  css: css`
    display: flex;
    align-items: center;
  `,
}))(Typography);

const PercentageBar = ({ nom, denom, color = 'secondary_2', className }) => {
  const theme = useTheme();
  return (
    <div
      className={className}
      css={css`
        position: relative;
        display: flex;
        justify-content: space-between;
        /* the transform creates a stacking-context so the z-index applies only locally*/
        transform: scale(1);
      `}
    >
      <ValignedText>
        {nom} <Icon name="slash" fill="grey_2" /> {denom}
      </ValignedText>
      <ValignedText>{((nom / denom) * 100).toFixed(2)}%</ValignedText>
      <div
        css={css`
          position: absolute;
          right: 0px;
          top: 0px;
          bottom: 0px;
          left: ${((denom - nom) / denom) * 100}%;
          background: ${theme.colors[color] || color || theme.colors.secondary_2};
          opacity: 0.3;
          z-index: -1;
        `}
      />
    </div>
  );
};

PercentageBar.propTypes = {
  /**
   * the nominator
   */
  nom: PropTypes.number.isRequired,
  /**
   * the denominator
   */
  denom: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default PercentageBar;
