import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';

const SearchResultsMenu = ({
  isLoading,
  searchData,
  onSelect,
}: {
  isLoading: boolean;
  searchData: any[];
  onSelect: Function;
}) => {
  if (isLoading) {
    return (
      <div
        css={css`
          position: absolute;
          top: 37px;
          left: 12px;
          background-color: white;
          width: 215px;
          padding: 5px 5px;
          border: 1px solid lightgray;
          border-radius: 8px;
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
    if (searchData && searchData.file.hits.total === 0) {
      return (
        <div>
          <Typography
            css={css`
              font-style: italic;
            `}
          >
            No results found
          </Typography>
        </div>
      );
    } else {
      return (
        <div
          css={css`
            position: absolute;
            top: 40px;
            left: 15px;
            z-index: 10;
            background-color: white;
            width: 225px;
            padding: 5px 5px;
          `}
        >
          {searchData &&
            searchData.file.hits.edges.slice(0, 5).map(({ node }) => {
              return (
                <div onClick={() => onSelect(node.object_id)} key={node.object_id}>
                  <Typography
                    bold
                    css={css`
                      font-size: 12px;
                      padding: 2px 3px;
                      margin: 0;
                    `}
                  >
                    {node.object_id}
                  </Typography>
                  <Typography
                    css={css`
                      font-size: 9px;
                      word-break: break-word;
                      margin: 0;
                    `}
                  >
                    {node.file.name}
                  </Typography>
                </div>
              );
            })}
        </div>
      );
    }
  }
};

export default SearchResultsMenu;
