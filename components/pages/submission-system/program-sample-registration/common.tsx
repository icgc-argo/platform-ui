export const ERROR_CODES = {
  INVALID_FILE_NAME: {
    code: 'INVALID_FILE_NAME',
    title: fileName => `File failed to upload: ${fileName}`,
    content:
      'Please retain the template file name and only append characters to the end. For example, registration<_optional_extension>.tsv',
  },
};
