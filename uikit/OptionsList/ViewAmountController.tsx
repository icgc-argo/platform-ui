import HyperLink from 'uikit/Link';
import { css } from '@emotion/core';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';

// Working example lives inside the Facet Story

const ViewAmountController: React.ComponentType<{
  /** Function to handle what happens when the selectAll/DeselectAll button is clicked */
  selectAllHander: () => any;
  /** Function to handle what happens when more/less toggle is clicked */
  moreToggleHandler: () => any;
  /** whether or not selectAll has been triggered */
  selectAllState: boolean;
  /** whether or not there are more hidden options available to view */
  moreOptionsAvailable: boolean;
  /** what to set the visibility property of, for the more/less toggle  */
  toggleVisiblityCss?: string;
  /** the text for the more/less toggle  */
  toggleText?: string;
}> = ({
  selectAllHander,
  moreToggleHandler,
  selectAllState,
  moreOptionsAvailable,

  toggleVisiblityCss = 'visible',
  toggleText = 'More / Collapse',
}) => {
  const theme = useTheme();
  return (
    <div
      className=""
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 12px;
      `}
      onClick={e => e.stopPropagation()}
    >
      <HyperLink
        onClick={e => {
          selectAllHander();
        }}
      >
        {selectAllState ? 'Select all' : 'Deselect all'}
      </HyperLink>

      {/* The div containing the show more / show less toggler */}
      <div
        css={css`
          display: flex;
          align-content: center;
          align-items: center;
          visibility: ${toggleVisiblityCss};
        `}
      >
        <HyperLink
          css={css`
            display: flex;
            align-items: center;
          `}
          onClick={e => {
            moreToggleHandler();
          }}
        >
          <Icon
            name={moreOptionsAvailable ? 'plus_circle' : 'minus_circle'}
            css={css`
              margin-right: 6px;
            `}
            fill={theme.colors.accent2}
          />
          {toggleText}
        </HyperLink>
      </div>
    </div>
  );
};

export default ViewAmountController;
