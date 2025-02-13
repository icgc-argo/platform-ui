import { css } from '@emotion/react';
import { Icon } from '@icgc-argo/uikit';

export const ArrowToggle = ({ isOpen }) => {
  return <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} fill="white" height="8px" />;
};

export const commonStyle = {
  header: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '> div, svg': {
      marginLeft: 'auto',
    },
  }),
};
