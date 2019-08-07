import React from 'react';
import { css } from '..';
import Icon from 'uikit/Icon';

const InteractiveIcon = ({ disabled, onClick, ...props }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Icon
      css={css`
        ${disabled ? '' : 'cursor: pointer'};
      `}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (!disabled ? onClick() : false)}
      fill={disabled ? '#cecfd3' : hovered ? 'accent2_1' : 'accent2'}
      {...props}
    />
  );
};
InteractiveIcon.propTypes = Icon.propTypes;

export default InteractiveIcon;
