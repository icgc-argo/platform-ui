export const formatFileName = (fileName: string): string => {
  return fileName.length > 40 ? `${fileName.substr(0, 39)}...` : fileName;
};
