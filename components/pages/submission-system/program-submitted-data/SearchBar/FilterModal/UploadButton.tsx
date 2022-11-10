import React from 'react';
import { Button } from '@icgc-argo/uikit/';
import { fileOpen, supported } from 'browser-fs-access';

export default function UploadButton({ onUpload }: { onUpload: any }) {
  const formatResult = (texts: string[]) => texts.join().replace(/\s/g, '').replace(/,/g, ', ');

  const handleOnClick = async () => {
    let fileHandle;

    // Refer to File System Access API. Restrict conditions when doing file uploads
    const ifSupportedPickerOpts = {
      types: [
        {
          accept: {
            'text/*': ['.txt', '.csv', '.tsv'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: true,
    };

    // upload button will use showOpenFilePicker (file system access API )method when supported by browser ie. Chrome and Edge, then fall back to legacy method if unsupported ie. FireFox.
    if (supported) {
      try {
        fileHandle = await window.showOpenFilePicker(ifSupportedPickerOpts);
        const files = await Promise.all(fileHandle.map(async (file) => await file.getFile()));
        const texts = await Promise.all(files.map(async (text) => await text.text()));
        // format results so each id has ', ' in between
        const results = formatResult(texts);
        onUpload(results);
        // if (filterTextBox) {
        //   setFilterTextBox(filterTextBox + ', ' + results);
        // } else {
        //   setFilterTextBox(results);
        // }
      } catch (err) {
        return;
      }
    } else {
      // if browser doesn't support File System Access API, then use legacy method
      const unsupportedFiles = await fileOpen([
        {
          description: 'Text files',
          mimeTypes: ['text/*'],
          extensions: ['.txt', '.csv', '.tsv'],
          multiple: true,
        },
      ]);

      const unsupportedText = await Promise.all(
        unsupportedFiles.map((file) => {
          return file.text();
        }),
      );
      // format results so each id has ', ' in between
      const results = formatResult(unsupportedText);
      onUpload(results);
    }
  };

  return (
    <Button size="sm" onClick={handleOnClick}>
      Browse
    </Button>
  );
}
