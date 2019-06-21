import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '../';
import Typography from '../Typography';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';

const ToastContainer = styled('div')`
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.grey_2};
  border: solid 1px ${({ theme }) => theme.colors.secondary_2};
  background-color: ${({ theme }) => theme.colors.secondary_4};
  display: flex;
`;

const ToastIconContainer = styled('div')`
  margin: 8px;
`;

const ToastBodyContainer = styled('div')`
  margin-top: 8px;
  margin-bottom: 8px;
  flex: 1;
`;
const InteractionContainer = styled('div')`
  margin: 8px;
`;

const Toast = ({
  title = 'Hipster Ipsum',
  content = 'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  icon = <Icon name="info" fill="secondary" width="30px" height="30px" />,
  onInteraction = ({ type, event }) => {},
}) => {
  const dispatchEvent = eventType => e => onInteraction({ type: eventType, event: e });
  const EVENT_TYPES = {
    CLOSE: 'CLOSE',
  };
  return (
    <ToastContainer>
      <ToastIconContainer>{icon}</ToastIconContainer>
      <ToastBodyContainer>
        <Typography
          variant="subtitle2"
          bold
          css={css`
            margin: 0px;
            margin-top: 4px;
            margin-bottom: 4px;
          `}
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          css={css`
            margin: 0px;
          `}
        >
          {content}
        </Typography>
      </ToastBodyContainer>
      <InteractionContainer>
        <FocusWrapper onClick={dispatchEvent(EVENT_TYPES.CLOSE)}>
          <Icon name="times" width="15px" height="15px" fill="primary_1" />
        </FocusWrapper>
      </InteractionContainer>
    </ToastContainer>
  );
};

Toast.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default Toast;
