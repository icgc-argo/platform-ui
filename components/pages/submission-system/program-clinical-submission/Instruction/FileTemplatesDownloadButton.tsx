import * as React from 'react';
import Icon from 'uikit/Icon';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
  downloadTsvFileTemplate,
} from '../../common';
import { css } from 'uikit';
import DropdownButton from 'uikit/DropdownButton';
import { capitalize } from 'global/utils/stringUtils';

export default ({ clinicalTypes }: { clinicalTypes: string[] }) => {
  const onItemClick: React.ComponentProps<typeof DropdownButton>['onItemClick'] = item => {
    if (item.value === 'all') {
      downloadTsvFileTemplate(`all.zip`);
    } else {
      downloadTsvFileTemplate(`${item.value}.tsv`);
    }
  };

  return (
    <DropdownButton
      css={instructionBoxButtonStyle}
      variant="secondary"
      size="sm"
      onItemClick={onItemClick}
      menuItems={[
        {
          display: 'Download All',
          value: 'all',
        },
        ...clinicalTypes.map(clinicalType => ({
          value: clinicalType,
          display: capitalize(clinicalType.split('_').join(' ')),
        })),
      ]}
    >
      <span css={instructionBoxButtonContentStyle}>
        <Icon
          name="download"
          fill="accent2_dark"
          height="12px"
          css={instructionBoxButtonIconStyle}
        />
        File Templates
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
