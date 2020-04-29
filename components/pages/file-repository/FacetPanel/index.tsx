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
import NumberRangeFacet from 'uikit/Facet/NumberRangeFacet';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type FacetDetails = {
  name: string;
  variant: 'Basic' | 'Number';
};

const presetFacets: Array<FacetDetails> = [
  { name: 'program', variant: 'Basic' },
  { name: 'primary site', variant: 'Basic' },
  { name: 'age at diagnosis', variant: 'Number' },
  { name: 'vital status', variant: 'Basic' },
  { name: 'gender', variant: 'Basic' },
  { name: 'experimental strategy', variant: 'Basic' },
  { name: 'data type', variant: 'Basic' },
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

  const clickHander = (targetFacet: FacetDetails) => {
    if (selectedFacets.includes(targetFacet)) {
      setSelectedFacets(selectedFacets.filter(facet => facet !== targetFacet));
    } else {
      setSelectedFacets(selectedFacets.concat(targetFacet));
    }
  };

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
          const props = {
            onClick: e => {
              clickHander(type);
            },
            isSelected: selectedFacets.includes(type),
            subMenuName: capitalize(type.name),
          };
          return (
            <FacetRow key={type.name}>
              {type.variant === 'Basic' && <Facet {...props} options={mockFacetData[type.name]} />}
              {type.variant === 'Number' && <NumberRangeFacet {...props} />}
            </FacetRow>
          );
        })}
      </SubMenu>
      <Collapsible />
    </FacetContainer>
  );
};
