import React from 'react';
import DefaultLayout from '../DefaultLayout';
import Typography from 'uikit/dist/uikit/Typography';
import FileTable from './FileTable';
import { FileRepositoryRecord } from './FileTable/types';

export default ({ token, data }: { token: string; data: FileRepositoryRecord[] }) => {
  return (
    <DefaultLayout>
      <Typography>This is the File Repository</Typography>
      <FileTable fileRepoEntries={data} userLoggedIn={!!token} />
    </DefaultLayout>
  );
};
