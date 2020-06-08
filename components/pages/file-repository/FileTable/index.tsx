import React from 'react';
import { SelectTable, TableColumnConfig } from 'uikit/Table';
import Tooltip from 'uikit/Tooltip';
import { FileRepositoryRecord } from './types';
import Link from 'next/link';
import HyperLink from 'uikit/Link';
import filesize from 'filesize';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import { css } from '@emotion/core';
import DropdownButton from 'uikit/DropdownButton';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { useQuery } from '@apollo/react-hooks';
import FILE_REPOSITORY_TABLE_QUERY from './FILE_REPOSITORY_TABLE_QUERY.gql';
import useFiltersContext from '../hooks/useFiltersContext';
import useAuthContext from 'global/hooks/useAuthContext';

export default () => {
  const { token } = useAuthContext();
  const { filters } = useFiltersContext();
  const { data, loading } = useQuery<any, any>(FILE_REPOSITORY_TABLE_QUERY, {
    variables: {
      first: 20,
      offset: 0,
      filters,
    },
  });

  const fileRepoEntries: Array<FileRepositoryRecord> = data
    ? data.file.hits.edges.map(({ node }) => ({
        fileID: node.object_id,
        donorID: node.donors.hits.edges[0].node.donor_id,
        program: { shortName: node.study_id, fullName: node.study_id },
        dataType: node.data_type,
        // TODO: this field name will need to be changed https://github.com/icgc-argo/argo-metadata-schemas/issues/32
        strategy: node.analysis.experiment.library_strategy,
        format: node.file_type,
        size: node.file.size,
        isDownloadable: false, // mocked, column will be temporarily hidden in https://github.com/icgc-argo/platform-ui/issues/1553
      }))
    : [];
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [allRowsSelected, setAllRowsSelected] = React.useState(false);
  const toggleHandler = (fileID: String) => {
    if (selectedRows.includes(fileID)) {
      const newSelectionState = selectedRows.filter(selection => selection !== fileID);
      setSelectedRows(newSelectionState);
    } else {
      setSelectedRows(prevSelected => [...prevSelected, fileID]);
    }
  };
  const toggleAllHandler = () => {
    if (!allRowsSelected) {
      const newSelectionState = fileRepoEntries.map(entry => `select-${entry.fileID}`);
      setSelectedRows(newSelectionState);
    } else {
      setSelectedRows([]);
    }
    setAllRowsSelected(!allRowsSelected);
  };
  const fileDownloader = (fileID: String) => {
    //todo
    alert(`we are working hard to download your file, ${fileID}`);
  };

  const getDownloadStatus = (isDownloadable: boolean) => {
    const canUserDownload = token && isDownloadable;
    const toolTipText = token
      ? isDownloadable
        ? 'Download file'
        : 'You do not have permission to download this file'
      : 'Please log in to access controlled files';
    return { canUserDownload, toolTipText };
  };
  const tableColumns: Array<TableColumnConfig<FileRepositoryRecord>> = [
    {
      Header: 'File ID',
      accessor: 'fileID',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.fileID,
    },
    {
      Header: 'Donor ID',
      accessor: 'donorID',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.donorID,
    },
    {
      Header: 'Program',
      id: 'programShortName',
      accessor: d => d.program.shortName,
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.program.shortName,
    },
    {
      Header: 'Data Type',
      accessor: 'dataType',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.dataType,
    },
    {
      Header: 'Strategy',
      accessor: 'strategy',
    },
    {
      Header: 'Format',
      accessor: 'format',
    },
    {
      Header: 'Size',
      accessor: 'size',
      Cell: ({ original }: { original: FileRepositoryRecord }) => filesize(original.size),
    },
    {
      Header: 'Actions',
      width: 80,
      sortable: false,
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        const downloadStatus = getDownloadStatus(original.isDownloadable);

        return (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          >
            <Tooltip
              unmountHTMLWhenHide
              position="left"
              html={<span>{downloadStatus.toolTipText}</span>}
            >
              <InteractiveIcon
                disabled={!downloadStatus.canUserDownload}
                height="16px"
                width="16px"
                name={downloadStatus.canUserDownload ? 'download' : 'lock'}
                fill={downloadStatus.canUserDownload ? 'accent2_dark' : 'primary_2'}
                onClick={e => fileDownloader(original.fileID)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const containerRef = React.createRef<HTMLDivElement>();
  const tableElement = (
    <div
      ref={containerRef}
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      <SelectTable
        loading={loading}
        keyField="fileID"
        parentRef={containerRef}
        columns={tableColumns}
        data={fileRepoEntries}
        isSelected={key => {
          // react table prepends the word `select-` to the selected keys
          return selectedRows.includes(`select-${key}`);
        }}
        toggleSelection={fileID => toggleHandler(fileID)}
        toggleAll={() => toggleAllHandler()}
        selectAll={allRowsSelected}
      />
    </div>
  );

  return (
    <Container
      css={css`
        padding: 10px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          css={css`
            margin-left: 10px;
          `}
        >
          <Typography variant="data" color="grey">
            {fileRepoEntries.length} files
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <DropdownButton
            css={css`
              margin-right: 8px;
            `}
            variant="secondary"
            size="sm"
            onItemClick={item => console.log('well done, you clicked the button')}
            menuItems={[
              {
                display: 'Clinical Data',
                value: 'Clinical Data',
              },
              {
                display: 'File Manifest',
                value: 'File Manifest',
              },
              {
                display: 'File Table',
                value: 'File Table',
              },
            ]}
          >
            <span css={instructionBoxButtonContentStyle}>
              <Icon
                name="download"
                fill="accent2_dark"
                height="12px"
                css={instructionBoxButtonIconStyle}
              />
              Download
              <Icon
                name="chevron_down"
                fill="accent2_dark"
                height="9px"
                css={css`
                  ${instructionBoxButtonIconStyle}
                  margin-left: 5px;
                `}
              />
            </span>
          </DropdownButton>
          <DropdownButton
            variant="secondary"
            size="sm"
            onItemClick={item => console.log('well done, you clicked the button')}
            menuItems={[
              {
                display: 'placeholder',
                value: 'placeholder',
              },
            ]}
          >
            <span css={instructionBoxButtonContentStyle}>
              Columns
              <Icon
                name="chevron_down"
                fill="accent2_dark"
                height="9px"
                css={css`
                  ${instructionBoxButtonIconStyle}
                  margin-left: 5px;
                `}
              />
            </span>
          </DropdownButton>
        </div>
      </div>
      {tableElement}
    </Container>
  );
};
