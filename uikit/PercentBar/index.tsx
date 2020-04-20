import useTheme from 'uikit/utils/useTheme';
import { css, keyframes } from '@emotion/core';

const PercentBar: React.ComponentType<{
  num: number;
  den: number;
  length?: number;
  fillColor?: string;
}> = ({ num, den, length, fillColor }) => {
  const theme = useTheme();

  // Negative Numbers should be zero, percentages over 100 should be capped
  num < 0 ? (num = 0) : { num };
  const fraction = Math.min((num / den) * 100, 100);
  const fill_amount = `${fraction}%`;
  const lengthpx = `${length || 120}px`;

  // Animation
  const grow = keyframes`
      0% {
        width: 0%;
      }
  
      100% {
        width: ${fill_amount};
      }
     `;

  return (
    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.grey_2};
          border-radius: 8px;
          width: ${lengthpx};
        `}
      >
        <div
          css={css`
            background-color: ${theme.colors[fillColor] || fillColor || theme.colors.secondary};
            width: ${fill_amount};
            height: 6px;
            border-radius: 8px;
            animation-name: ${grow};
            animation-duration: 1s;
            transition: width 2s ease-in-out;
          `}
        />
      </div>
    </div>
  );
};

export default PercentBar;
