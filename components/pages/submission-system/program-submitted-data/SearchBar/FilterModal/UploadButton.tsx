import React from 'react';
import { Button } from '@icgc-argo/uikit/';

export default function UploadButton({ onClick }: { onClick: any }) {
  return (
    <Button size="sm" onClick={() => onClick()}>
      Browse
    </Button>
  );
}
