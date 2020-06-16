import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { IdSearchQueryData } from './types';
import { useTheme } from 'uikit/ThemeProvider';

const getDropdownStyle = (theme) => `
  position: absolute;
  top: 32px;
  left: 0px;
  background-color: white;
  width: 254px;
  padding: 15px 0px 0px;
  border: 1px solid ${theme.colors.primary_4};
  border-top: 0px;
  border-radius: 0px 0px 8px 8px;
  z-index: 2;
`;

const SearchResultsMenu = ({
  isLoading,
  searchData,
  onSelect,
}: {
  isLoading: boolean;
  searchData: IdSearchQueryData;
  onSelect: Function;
}) => {
  const theme = useTheme();
  if (isLoading || !searchData) {
    return (
      <div
        css={css`
          ${getDropdownStyle(theme)}
        `}
      >
        <Typography
          css={css`
            font-style: italic;
            display: flex;
            align-items: center;
            margin: 0;
          `}
        >
          <Icon
            name="spinner"
            css={css`
              margin-right: 10px;
            `}
          />
          Loading results...
        </Typography>
      </div>
    );
  } else {
    if (searchData.file.hits.total === 0) {
      return (
        <div
          css={css`
            ${getDropdownStyle(theme)}
          `}
        >
          <Typography
            css={css`
              font-style: italic;
            `}
          >
            No results found
          </Typography>
        </div>
      );
    }
    return (
      <>
        <div
          css={css`
            background: transparent;
            border-right: 1px solid lightgray;
            border-left: 1px solid lightgray;
            height: 10px;
            width: 254px;
            z-index: 0;
            position: absolute;
            top: 28px;
          `}
        />
        <div
          css={css`
            ${getDropdownStyle(theme)}
          `}
        >
          {searchData.file.hits.edges.slice(0, 5).map(({ node }) => {
            return (
              <div
                css={css`
                  cursor: pointer;
                  padding: 2px;
                  border-bottom: 1px solid ${theme.colors.primary_4};
                  &:hover {
                    background-color: ${theme.colors.secondary_4};
                  }
                  &:last-child {
                    border-bottom: 0px;
                  }
                `}
                onClick={() => onSelect(node.object_id)}
                key={node.object_id}
              >
                <Typography
                  css={css`
                    font-size: 11px;
                    font-weight: 500;
                    padding: 2px 3px;
                    margin: 0;
                    word-break: break-all;
                  `}
                >
                  {node.object_id}
                </Typography>
                <Typography
                  css={css`
                    font-size: 9px;
                    font-weight: 300;
                    word-break: break-all;
                    margin: 0;
                    padding: 2px 3px;
                  `}
                >
                  {node.file.name}
                </Typography>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default SearchResultsMenu;
