import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@icgc-argo/uikit/Container';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import {
  background,
  titleParent,
  boldText,
  clearFilter,
  rightSideGroup,
  filterParent,
  dropdown,
  downArrow,
  searchBarParent,
  inputField,
  filterButton,
  filterIcon,
  downloadIcon,
} from './common';
import Icon from '@icgc-argo/uikit/Icon';
import { Input } from '@icgc-argo/uikit/form';
import Button from '@icgc-argo/uikit/Button';

import { css } from '@icgc-argo/uikit';
import { DownloadIcon } from 'components/pages/file-entity/common';

export default function SearchBar({ noData }: { noData: boolean }) {
  const theme = useTheme();

  const [keyword, setKeyword] = useState('');
  useEffect(() => {}, []);

  return (
    <Container css={background}>
      {/* First Item - title */}
      <div css={titleParent}>
        Clincial Data for: <b css={boldText}>{keyword ? ` ${keyword}` : ` All Donors`}</b>
        {keyword && (
          <Button
            onClick={() => {
              setKeyword('');
            }}
            css={clearFilter}
            variant="secondary"
          >
            <u>Clear Filters</u>
          </Button>
        )}
      </div>

      {/* Grouping second to forth item together */}
      <div css={rightSideGroup}>
        {/* Second item - filter */}
        <div css={filterParent}>
          Quick Filters:
          <DropdownButton
            css={dropdown}
            variant="secondary"
            size="sm"
            onItemClick={() => {}}
            menuItems={[
              {
                display: 'Show all donors',
                value: 'all',
              },
              {
                display: 'Show invalid donors',
                value: 'all',
              },
              {
                display: 'Show clinically complete donors',
                value: 'all',
              },
              {
                display: 'Show clinically incomplete donors',
                value: 'all',
              },
            ]}
          >
            - select an option -
            <Icon name="chevron_down" fill="accent2_dark" css={downArrow} />
          </DropdownButton>
        </div>

        {/* Third item - search bar */}
        <div css={searchBarParent}>
          <Input
            aria-label="search-for-files"
            size="sm"
            placeholder={'Donor ID/Submitter Donor ID'}
            preset="search"
            showClear={true}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            getOverrideCss={() => inputField}
          ></Input>
          <Button variant="secondary" css={filterButton}>
            <Icon name="filter" fill="accent2_dark" css={filterIcon}></Icon>
            List
          </Button>
        </div>
        {/* Forth item - download button*/}

        <Button
          css={css`
            margin: 5px 10px 5px 10px;
            height: fit-content;
            :disabled {
              background: #f6f6f7;
              color: ${theme.colors.grey_1};
            }
          `}
          variant="secondary"
          disabled={noData}
        >
          <Icon
            css={downloadIcon}
            name="download"
            fill={noData ? 'grey_1' : 'accent2_dark'}
            height="12px"
          />
          Clinical Data
        </Button>
      </div>
    </Container>
  );
}
