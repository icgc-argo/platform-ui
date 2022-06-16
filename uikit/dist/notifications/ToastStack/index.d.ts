/// <reference types="react" />
import PropTypes from 'prop-types';
declare const ToastStack: {
  ({
    toastConfigs,
    onInteraction,
  }: {
    toastConfigs?: any[];
    onInteraction?: ({
      id,
      toastIndex,
      payload,
    }: {
      id: any;
      toastIndex: any;
      payload: any;
    }) => void;
  }): JSX.Element;
  propTypes: {
    /**
     * This is directly the props that goes to `Toast` component, with addition of a unique `id` field.
     * Check out https://argo-ui-storybook.netlify.com/?path=/story/uikit-toast--basic
     */
    toastConfigs: PropTypes.Requireable<
      PropTypes.InferProps<{
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        content: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        variant: PropTypes.Requireable<import('../Notification').NotificationVariant>;
        interactionType: PropTypes.Requireable<import('../Notification').NotificationInteraction>;
        onInteraction: PropTypes.Requireable<(...args: any[]) => any>;
        id: PropTypes.Validator<string>;
      }>[]
    >;
    onInteraction: PropTypes.Requireable<(...args: any[]) => any>;
  };
};
export default ToastStack;
