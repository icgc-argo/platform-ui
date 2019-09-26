import * as React from 'react';
import omit from 'lodash/omit';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import {
  NOTIFICATION_INTERACTION_EVENTS,
  NotificationVariant,
  NotificationInteractionEvent,
  NotificationInteraction,
} from 'uikit/notifications/Notification';

type ToastEventPayload = { type: NotificationInteractionEvent; event: any };
type ToastConfig = {
  variant?: NotificationVariant;
  interactionType?: NotificationInteraction;
  title: React.ReactNode;
  content: React.ReactNode;
  onInteraction?: (e: ToastEventPayload) => any;
};
export const useToastState = () => {
  const DEFAULT_TIMEOUT = 8000;
  const [toastStack, setToastStack] = React.useState<(ToastConfig & { id: string })[]>([]);

  const addToast = (toast: ToastConfig & { timeout?: number }) => {
    console.log(`🔥🍞🍞🍞🍞🍞🍞🔥`);
    console.log(`🔥🔥🔥🔥🔥🔥🔥🔥`);
    const id = String(Math.random());
    const DEFAULT_TOAST_CONFIGS: Partial<ToastConfig> = {
      variant: TOAST_VARIANTS.INFO as ToastConfig['variant'],
      onInteraction: e => e,
      interactionType: undefined, // the Toast component internally has its default, no need to cover this
    };
    setToastStack(toastStack => [
      ...toastStack,
      { ...DEFAULT_TOAST_CONFIGS, ...omit(toast, 'timeout'), id },
    ]);
    if (toast.timeout !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.timeout || DEFAULT_TIMEOUT);
    }
    return id;
  };

  const removeToast = (_id: string) => {
    setToastStack(toastStack => toastStack.filter(({ id }) => id !== _id));
    return _id;
  };

  const onInteraction = ({ id: _id, payload }: { id: string; payload: ToastEventPayload }) => {
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
type Toaster = ReturnType<typeof useToastState>;

// @ts-ignore It's ok ts, we will make sure there's always a context
export const ToasterContext = React.createContext<Toaster>();
export const useToaster = () => React.useContext<Toaster>(ToasterContext);
