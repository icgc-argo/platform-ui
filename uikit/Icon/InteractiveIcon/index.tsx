/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { css } from '../..';
import Icon from 'uikit/Icon';
import Tooltip, { TooltipProps } from 'uikit/Tooltip';
import { useTheme } from 'uikit/ThemeProvider';

// dims corresponding hex code for a 25% dim
const dimColour = (hex: string) => `${hex}BF`;

type IconProps = React.ComponentProps<typeof Icon>;
const InteractiveIcon = ({
  disabled,
  onClick,
  name,
  className,
  title,
  width,
  height,
  fill,
  outline,
  ...props
}: IconProps & TooltipProps & { disabled?: boolean }) => {
  const [hovered, setHovered] = React.useState(false);
  const theme = useTheme();

  const fillColour = (fill && theme.colors[fill]) || fill || theme.colors.accent2;

  return (
    <Tooltip hideOnClick={false} {...props} unmountHTMLWhenHide>
      <Icon
        css={css`
          ${disabled ? '' : 'cursor: pointer'};
        `}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => (!disabled ? onClick(e) : false)}
        fill={disabled ? 'grey_2' : hovered ? `${dimColour(fillColour)}` : `${fillColour}`}
        name={name}
        className={className}
        title={title}
        width={width}
        height={height}
        outline={outline}
      />
    </Tooltip>
  );
};
InteractiveIcon.propTypes = Icon.propTypes;

export default InteractiveIcon;
