import React from 'react';
import { css } from '..';
import Icon from 'uikit/Icon';

type IconProps = React.ComponentProps<typeof Icon>;
const InteractiveIcon = ({ disabled, onClick, ...props }: IconProps & { disabled?: boolean }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Icon
      css={css`
        ${disabled ? '' : 'cursor: pointer'};
      `}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={e => (!disabled ? onClick(e) : false)}
      fill={disabled ? '#cecfd3' : hovered ? 'accent2_1' : 'accent2'}
      {...props}
    />
  );
};
InteractiveIcon.propTypes = Icon.propTypes;

export default InteractiveIcon;
