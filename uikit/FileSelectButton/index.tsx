import React from 'react';
import Button from 'uikit/Button';
import { css } from 'uikit';

/*
 * Please edit me!
 */
type FileSelectButtonProps = Omit<React.ComponentProps<typeof Button>, 'onClick'> & {
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
  onFilesSelect: (files: FileList) => void;
};
const FileSelectButton: React.ComponentType<FileSelectButtonProps> = ({
  children,
  inputProps,
  onFilesSelect,
  ...rest
}) => {
  const fileInputRef = React.createRef<HTMLInputElement>();
  const selectFile = () => {
    const fp = fileInputRef.current;
    if (fp) {
      fp.click();
    }
  };
  return (
    <Button {...rest} onClick={selectFile}>
      <input
        type="file"
        ref={fileInputRef}
        accept=".tsv"
        onChange={e => {
          onFilesSelect(e.target.files);
        }}
        css={css`
          display: none;
        `}
        {...inputProps}
      />
      {children}
    </Button>
  );
};

export default FileSelectButton;
