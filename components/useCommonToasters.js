//@flow
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
        content: 'Something went wrong, please try again later or contact us for assistance',
      }),
  };
}
