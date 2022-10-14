/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, Icon, Tag, Typography, useTheme, VerticalTabs } from '@icgc-argo/uikit';
import * as React from 'react';
import { Entity, EntityType } from '../types';
import { InvalidIcon } from './common';
import { getDonorAge, getTimelineStyles } from './util';

const DayCount = ({
  days,
  format = (days) => days.toLocaleString(),
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
        font-weight: 600;
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
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: 1px solid ${theme.colors.grey_2};
        border-left: 3px solid black;
        margin-left: -1px;
        margin-right: -1px;
        cursor: pointer;

        &::before {
          content: '';
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 25px;
          background-color: ${timelineStyles[type].borderColor};
          position: absolute;
          right: 98%;
          z-index: 2;
        }

        ${active
          ? css`
              border-color: ${borderColor};
            `
          : `overflow: hidden;
            :hover {
              background-color: #F2F2F8;
            }`};
      `}
    >
      <VerticalTabs.Item
        disabled={disabled}
        tabStyle={{ border: borderColor, background: backgroundColor }}
        css={css`
          height: 100%;
          width: 100%;
          border: 0;
          color: black;
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
            <Typography variant="caption" as="div" bold={true}>
              {id}
            </Typography>
            {invalid ? (
              <InvalidIcon
                css={css`
                  margin-right: 5px;
                `}
              />
            ) : null}
            {type === EntityType.SPECIMEN && (
              <Icon name="testtube" fill={theme.colors.accent3_dark} width="15px" height="15px" />
            )}
          </div>
          <Typography
            variant="data"
            as="div"
            css={css`
              color: ${type === EntityType.DECEASED ? theme.colors.grey : 'initial'};
            `}
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
  onClickTab: (props: { entity: Entity; idx: number }) => void;
}) => {
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  const donorAgeDisplay = (type: EntityType, data) => {
    const age =
      type === EntityType.PRIMARY_DIAGNOSIS
        ? getDonorAge(data).ageAtDiagnosis
        : `~ ${getDonorAge(data).ageAtDeath}`;

    return age >= 90 ? `age: >= 90` : `age: ${age}`;
  };

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
      `}
    >
      <div>
        {entities.map(({ type, interval, data }, i) => (
          <div
            key={`${type}-${i}`}
            css={css`
              display: flex;
              width: 70px; /* Approx width for 5 digits which is approximately 270 years */
              height: 46px;
              align-items: center;
              position: relative;
              justify-content: flex-end;
            `}
          >
            <DayCount days={interval} />
            {data && (type === EntityType.PRIMARY_DIAGNOSIS || type === EntityType.DECEASED) && (
              <Tag
                css={css`
                  padding: 1px 3px;
                  position: absolute;
                  top: 33px;
                  right: 3px;
                `}
                variant="DISABLED"
              >
                {donorAgeDisplay(type, data)}
              </Tag>
            )}
          </div>
        ))}
      </div>
      <div
        css={css`
          flex: 1;
          border: 1px solid ${theme.colors.grey_1};
          width: 215px;
        `}
      >
        {entities.map((entity, i) => (
          <div
            css={css`
              display: flex;
              align-items: center;
              position: relative;
            `}
            key={`${entity.id}-${i}`}
          >
            <TimelineItem
              item={entity}
              disabled={entity.type === EntityType.DECEASED}
              active={activeTab === i}
              onClick={() => onClickTab({ entity, idx: i })}
            />
          </div>
        ))}
        <div
          css={css`
            display: inline-block;
            transform: rotate(-90deg);
            position: relative;
            left: -8px;
            top: -15px;
          `}
        >
          <Icon name="arrow_left" fill={theme.colors.black} width="23px" height="23px" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
