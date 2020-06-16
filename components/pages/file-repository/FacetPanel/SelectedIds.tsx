import { css } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';

const SelectedIds = ({
  ids = [],
  onRemove,
}: {
  ids: string[];
  onRemove?: (id: string) => void;
}) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        padding-inline-start: 0px;
        margin: 0 0 5px;
      `}
    >
      {ids.map((id) => (
        <li
          key={id}
          css={css`
            list-style-type: none;
          `}
        >
          <Typography
            color={theme.colors.secondary}
            css={css`
              font-size: 11px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin: 2px 0;
            `}
          >
            {onRemove && (
              <Icon
                name="times"
                fill={theme.colors.secondary}
                title="Remove"
                css={css`
                  padding-right: 5px;
                  padding-bottom: 1px;
                  width: 8px;
                  height: 8px;
                  cursor: pointer;
                `}
                onClick={() => onRemove(id)}
              />
            )}

            {id}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default SelectedIds;
