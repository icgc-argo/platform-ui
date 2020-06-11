import DropdownButton, { DownloadButtonProps } from 'uikit/DropdownButton';
import pluralize from 'pluralize';
import { css } from '@emotion/core';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';

enum DownloadOptionValues {
  ALL_FILES = 'ALL_FILES',
  SCORE_MANIFEST = 'SCORE_MANIFEST',
  CLINICAL_DATA = 'CLINICAL_DATA',
  FILE_TABLE = 'FILE_TABLE',
}

export default ({
  allFilesSelected,
  selectedRows,
}: {
  allFilesSelected: boolean;
  selectedRows: string[];
}) => {
  const theme = useTheme();
  const menuItems: DownloadButtonProps<DownloadOptionValues>['menuItems'] = [
    {
      display:
        allFilesSelected || selectedRows.length === 0
          ? 'All Files'
          : `${pluralize('file', selectedRows.length, true)} selected`,
      value: DownloadOptionValues.ALL_FILES,
      css: css`
        color: ${theme.colors.secondary_dark};
        border-bottom: 1px solid ${theme.colors.grey_2};
        cursor: auto;
        &:hover {
          background: transparent;
        }
      `,
    },
    // only manifest download enabled for initial File Repo release
    // {
    //   display: 'Clinical Data',
    //   value: DownloadOptionValues.CLINICAL_DATA,
    // },
    {
      display: 'File Manifest',
      value: DownloadOptionValues.SCORE_MANIFEST,
    },
    // {
    //   display: 'File Table',
    //   value: DownloadOptionValues.FILE_TABLE,
    // },
  ];
  const onItemClick: DownloadButtonProps<DownloadOptionValues>['onItemClick'] = item => {};
  return (
    <DropdownButton
      css={css`
        margin-right: 8px;
      `}
      variant="secondary"
      size="sm"
      onItemClick={item => null}
      menuItems={menuItems}
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
  );
};
