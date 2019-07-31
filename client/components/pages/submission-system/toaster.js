// @flow
import * as React from 'react';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';

type ToastEventPayload = { type: 'CLOSE' | 'ACTION' | 'DISMISS', event: any };
type ToastConfig = {
  variant?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR',
  interactionType?: 'NONE' | 'CLOSE' | 'ACTION_DISMISS',
  title: React.Node,
  content: React.Node,
  onInteraction?: (e: ToastEventPayload) => any,
};
export const useToastState = () => {
  const DISMISS_TIMEOUT = 8000;
  const [toastStack, setToastStack] = React.useState<(ToastConfig & { id: string })[]>([]);

  const addToast = (toast: ToastConfig) => {
    console.log(`🔥🍞🍞🍞🍞🍞🍞🔥`);
    console.log(`🔥🔥🔥🔥🔥🔥🔥🔥`);
    const id = String(Math.random());
    const DEFAULT_TOAST_CONFIGS: $Shape<ToastConfig> = {
      variant: TOAST_VARIANTS.INFO,
      onInteraction: e => e,
      interactionType: undefined, // the Toast component internally has its default, no need to cover this
    };
    setToastStack(toastStack => [...toastStack, { ...DEFAULT_TOAST_CONFIGS, ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, DISMISS_TIMEOUT);
    return id;
  };

  const removeToast = (_id: string) => {
    setToastStack(toastStack => toastStack.filter(({ id }) => id !== _id));
    return _id;
  };

  const onInteraction = ({ id: _id, payload }: { id: string, payload: ToastEventPayload }) => {
    if (
      [NOTIFICATION_INTERACTION_EVENTS.CLOSE, NOTIFICATION_INTERACTION_EVENTS.DISMISS].includes(
        payload.type,
      )
    ) {
      removeToast(_id);
    }
  };

  return {
    toastStack,
    addToast,
    removeToast,
    onInteraction,
  };
};
type Toaster = $Call<typeof useToastState, void>;

// $FlowFixMe It's ok flow, we will make sure there's always a context
export const ToasterContext = React.createContext<Toaster>();
export const useToaster = () => React.useContext<Toaster>(ToasterContext);
