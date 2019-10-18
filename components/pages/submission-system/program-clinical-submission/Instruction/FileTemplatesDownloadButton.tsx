import * as React from 'react';
import Typography from 'uikit/Typography';
import Button, { BUTTON_SIZES } from 'uikit/Button';
import Icon from 'uikit/Icon';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
} from '../../common';
import { css } from 'uikit';
import useClickAway from 'uikit/utils/useClickAway';
import { useTheme } from 'uikit/ThemeProvider';

export default ({ clinicalTypes }: { clinicalTypes: string[] }) => {
  const [schemaListShown, setSchemaListShown] = React.useState(false);
  const theme = useTheme();

  const menuRef = React.createRef<HTMLDivElement>();
  useClickAway({
    domElementRef: menuRef,
    onClickAway: () => setSchemaListShown(false),
    onElementClick: () => {
      setSchemaListShown(false);
    },
  });

  const onSchemaClick = (clinicalType: string) => e => {
    console.log('clinicalType: ', clinicalType);
  };

  const onDownloadAllClick = () => {
    console.log('onDownloadAllClick');
  };

  const MenuItem: typeof Typography = props => (
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

  return (
    <Button
      onClick={e => setSchemaListShown(true)}
      css={css`
        ${instructionBoxButtonStyle}
        position: relative;
      `}
      variant="secondary"
      size={BUTTON_SIZES.SM}
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
      {schemaListShown && (
        <div
          ref={menuRef}
          css={css`
            position: absolute;
            top: 100%;
            left: 10px;
            right: 10px;
            background: white;
            z-index: 1000;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
            border: solid 1px ${theme.colors.grey_1};
            background-color: ${theme.colors.white};
            text-transform: none;
            text-align: left;
            color: ${theme.colors.black};
          `}
        >
          <MenuItem onClick={onDownloadAllClick}>Download All</MenuItem>
          {clinicalTypes.map(type => (
            <MenuItem key={type} onClick={onSchemaClick(type)}>
              {type}
            </MenuItem>
          ))}
        </div>
      )}
    </Button>
  );
};
