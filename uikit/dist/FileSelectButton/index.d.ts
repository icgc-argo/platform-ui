import React from 'react';
import Button from 'uikit/Button';
declare type FileSelectButtonProps = Omit<React.ComponentProps<typeof Button>, 'onClick'> & {
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
  onFilesSelect: (files: FileList) => void;
};
declare const FileSelectButton: React.ComponentType<FileSelectButtonProps>;
export default FileSelectButton;
