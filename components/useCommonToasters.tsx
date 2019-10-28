import React from 'react';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';

export default function useCommonToasters() {
  const toaster = useToaster();
  return {
    unknownError: () =>
      toaster.addToast({
        title: '',
        variant: TOAST_VARIANTS.ERROR,
        content: 'Something went wrong, please try again later or contact us for assistance.',
      }),
    unknownErrorWithReloadMessage: () =>
      toaster.addToast({
        variant: 'ERROR',
        title: 'Something went wrong',
        content: 'Uh oh! It looks like something went wrong. This page has been reloaded.',
      }),
    onSave: () =>
      toaster.addToast({
        title: 'Success!',
        variant: TOAST_VARIANTS.SUCCESS,
        content: 'Your changes have been saved.',
        interactionType: 'CLOSE',
      }),
  };
}
