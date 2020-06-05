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
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { getTimelineStyles } from './util';
import useTheme from 'uikit/utils/useTheme';
import VerticalTabs from 'uikit/VerticalTabs';
import { Entity, EntityType } from './types';
import { InvalidIcon } from './common';

const DayCount = ({
  days,
  format = days => days.toLocaleString(),
}: {
  days: number;
  format?: (number) => string;
}) => (
  <div
    css={css`
      height: 48px;
      display: flex;
      align-items: center;
    `}
  >
    <Typography
      variant="data"
      css={css`
        margin-right: 12px;
        text-align: right;
      `}
    >
      {format(days)}
    </Typography>
  </div>
);

type TimeLineItemProps = {
  item: Pick<Entity, 'id' | 'description' | 'type' | 'invalid'>;
  onClick?: () => void;
  disabled?: boolean;
  active: boolean;
};

const TimelineItem = ({ item, active, onClick, disabled }: TimeLineItemProps) => {
  const { type, description, id, invalid } = item;
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);
  const { backgroundColor, borderColor } = timelineStyles[type];

  return (
    <div
      className="timelineItem"
      onClick={() => !disabled && onClick()}
      css={css`
        height: 46px;
        display: flex;
        align-items: center;
        width: 100%;
        border: 1px solid transparent;
        margin-left: -1px;
        margin-right: -1px;

        ${active
          ? css`
              border-color: ${borderColor};
            `
          : null};
      `}
    >
      <VerticalTabs.Item
        tabStyle={{ border: borderColor, background: backgroundColor }}
        css={css`
          height: 100%;
          width: 100%;
          border: 0;
          color: black;

          &:focus {
            ${disabled
              ? css`
                  box-shadow: none;
                `
              : null};
          }
          &:hover {
            ${disabled
              ? css`
                  background: white;
                  cursor: default;
                `
              : null}
          }
        `}
        active={active}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <Typography variant="caption" as="div">
              {id}
            </Typography>
            {invalid ? (
              <InvalidIcon
                css={css`
                  margin-right: 5px;
                `}
              />
            ) : null}
          </div>
          <Typography
            variant="data"
            as="div"
            css={css`
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
            bold={type !== EntityType.DECEASED}
          >
            {description}
          </Typography>
        </div>{' '}
      </VerticalTabs.Item>
    </div>
  );
};

const Timeline = ({
  entities,
  onClickTab,
  activeTab,
}: {
  entities: Array<Entity>;
  activeTab: number;
  onClickTab: ({ entity: Entity, idx: number }) => void;
}) => {
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
      `}
    >
      <div>
        {entities.map(({ type, interval }, i) => (
          <div
            css={css`
              display: flex;
              width: 70px; /* Approx width for 5 digits which is approximately 270 years */
              align-items: center;
              justify-content: flex-end;

              &::after {
                content: '';
                display: inline-block;
                width: 7px;
                height: 7px;
                border-radius: 25px;
                background-color: ${timelineStyles[type].borderColor};
                position: relative;
                left: 4px;
                z-index: 2;
              }
            `}
          >
            <DayCount days={interval} />
          </div>
        ))}
      </div>
      <div
        css={css`
          flex: 1;
          border: 1px solid ${theme.colors.grey_1};
          width: 350px;
        `}
      >
        {entities.map((entity, i) => (
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <TimelineItem
              item={entity}
              disabled={entity.type === EntityType.DECEASED}
              active={activeTab === i}
              onClick={() => onClickTab({ entity, idx: i })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
