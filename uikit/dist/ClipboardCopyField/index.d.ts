/// <reference types="react" />
declare const ClipboardCopyField: ({
  value,
  buttonText,
  disabled,
  tagText,
  errorText,
  timeout,
  loading,
  buttonId,
}: {
  buttonText?: string;
  value?: string;
  tagText?: string;
  disabled?: boolean;
  errorText?: string;
  timeout?: number;
  loading: boolean;
  buttonId: string;
}) => JSX.Element;
export default ClipboardCopyField;
