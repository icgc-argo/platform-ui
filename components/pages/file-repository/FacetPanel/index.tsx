import React from 'react';
import Facet from 'uikit/Facet';
import { MenuItem } from 'uikit/SubMenu';
import mockFacetData from './mockFacetData';
import { capitalize } from 'global/utils/stringUtils';
import { Input } from 'uikit/form';
import FileSelectButton from 'uikit/FileSelectButton';
import { SubMenu } from 'uikit/SubMenu';
import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import { Collapsible } from 'uikit/PageLayout';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey_2};
  justify-content: space-between;
`;

const presetFacets = [
  'program',
  'primary site',
  'age at diagnosis',
  'vital status',
  'gender',
  'experimental strategy',
  'data type',
];

const FacetContainer = styled('div')`
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 58px);
  max-height: calc(100vh - 58px);
  overflow-y: auto;
`;

export default () => {
  const [selectedFacets, setSelectedFacets] = React.useState(presetFacets);
  const uploadDisabled = false; // TODO: implement correctly
  const theme = useTheme();

  return (
    <FacetContainer>
      <SubMenu>
        <FacetRow>
          <Typography
            css={css`
              font-size: 16px;
              padding-left: 12px;
            `}
            color={theme.colors.primary}
          >
            Filters
          </Typography>
        </FacetRow>
        <FacetRow>
          <MenuItem
            css={css`
              flex: 1;
            `}
            content={'Search Files by ID'}
            chevronOnLeftSide
          >
            <Input
              css={css`
                margin: 8px;
              `}
              aria-label={'Search'}
              placeholder="e.g. FL9998, DO9898..."
              preset="search"
            />
            <div
              css={css`
                display: flex;
                margin: 8px;
              `}
            >
              <FileSelectButton
                onFilesSelect={() => null} // TODO: implement upload action
                variant={BUTTON_VARIANTS.SECONDARY}
                size={BUTTON_SIZES.SM}
              >
                <Icon
                  name="upload"
                  height="12px"
                  fill={uploadDisabled ? 'white' : 'accent2_dark'}
                />
                {' Upload a list of ids'}
              </FileSelectButton>
            </div>
          </MenuItem>
        </FacetRow>
        {presetFacets.map(type => {
          return (
            <FacetRow key={type}>
              <Facet
                onClick={e => {
                  if (selectedFacets.includes(type)) {
                    setSelectedFacets(selectedFacets.filter(facet => facet !== type));
                  } else {
                    setSelectedFacets(selectedFacets.concat(type));
                  }
                }}
                isSelected={selectedFacets.includes(type)}
                subMenuName={capitalize(type)}
                options={mockFacetData[type]}
              />
            </FacetRow>
          );
        })}
      </SubMenu>
      <Collapsible />
    </FacetContainer>
  );
};
