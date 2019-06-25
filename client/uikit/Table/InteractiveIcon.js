import React from 'react';
import { css } from '..';
import Icon from 'uikit/Icon';

const InteractiveIcon = props => {
  const [hovvered, setHovered] = React.useState(false);
  return (
    <Icon
      css={css`
        cursor: pointer;
      `}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      fill={hovvered ? 'accent2_1' : 'accent2'}
      {...props}
    />
  );
};
InteractiveIcon.propTypes = Icon.propTypes;

export default InteractiveIcon;
