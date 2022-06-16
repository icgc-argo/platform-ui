import React from 'react';
import { ThemeColorNames } from 'uikit/theme/types';
import Icon from 'uikit/Icon';
import { TooltipProps } from 'uikit/Tooltip';
declare type InteractiveIconProps = React.ComponentProps<typeof Icon> &
  TooltipProps & {
    disabled?: boolean;
    hoverFill?: keyof ThemeColorNames | string;
  };
declare const InteractiveIcon: {
  ({
    disabled,
    onClick,
    name,
    className,
    title,
    width,
    height,
    fill,
    hoverFill,
    outline,
    ...props
  }: InteractiveIconProps): JSX.Element;
  propTypes: React.WeakValidationMap<
    {
      name:
        | 'rdpc'
        | 'download'
        | 'dna_locked'
        | 'workflow'
        | 'article'
        | 'calendar'
        | 'brackets'
        | 'testtube'
        | 'question'
        | 'question_circle'
        | 'success'
        | 'form'
        | 'filter'
        | 'warning'
        | 'spinner'
        | 'chevron_up'
        | 'chevron_down'
        | 'chevron_left'
        | 'chevron_right'
        | 'dashboard'
        | 'programs'
        | 'slash'
        | 'search'
        | 'times'
        | 'times_circle'
        | 'asterisk'
        | 'users'
        | 'edit'
        | 'checkmark'
        | 'info'
        | 'info_transparent'
        | 'warning_transparent'
        | 'mail'
        | 'trash'
        | 'google'
        | 'plus_circle'
        | 'minus_circle'
        | 'key'
        | 'user'
        | 'ellipses'
        | 'exclamation'
        | 'star'
        | 'upload'
        | 'lock'
        | 'dash'
        | 'file'
        | 'arrow_left'
        | 'filesize'
        | 'crosshairs'
        | 'person_admin'
        | 'person_collaborator'
        | 'person_submitter'
        | 'reset'
        | 'hamburger'
        | 'hamburger_close'
        | 'bug';
      className?: string;
      title?: string;
      width?: string;
      height?: string;
      fill?: string;
      outline?: import('..').Outline;
    } & React.SVGAttributes<SVGElement>
  >;
};
export default InteractiveIcon;
