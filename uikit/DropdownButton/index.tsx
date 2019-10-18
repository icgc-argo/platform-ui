import * as React from 'react';
import Typography from 'uikit/Typography';
import Button, { BUTTON_SIZES } from 'uikit/Button';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import useClickAway from 'uikit/utils/useClickAway';
import { useTheme } from 'uikit/ThemeProvider';

const MenuItem: typeof Typography = props => {
  const theme = useTheme();
  return (
    <Typography
      variant="default"
      as="div"
      css={css`
        padding: 5px;
        &:hover {
          background: ${theme.colors.secondary_4};
        }
      `}
      {...props}
    />
  );
};

type DropdownButtonItemConfig = {
  value: string;
  display: React.ReactNode;
};
const DropdownButton = ({
  children,
  onItemClick,
  menuItems,
  onClick = e => {},
  menuShown: controlledMenuShowState,
  ...rest
}: {
  onItemClick: (item: DropdownButtonItemConfig) => void;
  menuItems: Array<DropdownButtonItemConfig>;
  menuShown?: boolean;
} & React.ComponentProps<typeof Button>) => {
  const [menuShown, setMenuShown] = React.useState(false);
  const theme = useTheme();

  const menuRef = React.createRef<HTMLDivElement>();
  useClickAway({
    domElementRef: menuRef,
    onClickAway: () => setMenuShown(false),
    onElementClick: () => {
      setMenuShown(false);
    },
  });

  return (
    <Button
      onClick={e => {
        setMenuShown(true);
        onClick(e);
      }}
      css={css`
        position: relative;
      `}
      {...rest}
    >
      {children}
      {(menuShown || controlledMenuShowState === true) && ( // explicit check because undefined is falsy
        <div
          ref={menuRef}
          css={css`
            position: absolute;
            top: 100%;
            left: 10px;
            right: 10px;
            background: white;
            z-index: 1000;
            border-radius: 4px;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
            border: solid 1px ${theme.colors.grey_1};
            background-color: ${theme.colors.white};
            text-transform: none;
            text-align: left;
            color: ${theme.colors.black};
          `}
        >
          {menuItems.map(item => (
            <MenuItem key={item.value} onClick={() => onItemClick(item)}>
              {item.display}
            </MenuItem>
          ))}
        </div>
      )}
    </Button>
  );
};

export default DropdownButton;
