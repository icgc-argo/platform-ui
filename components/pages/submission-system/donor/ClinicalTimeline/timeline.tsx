import React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { getTimelineStyles } from './util';
import useTheme from 'uikit/utils/useTheme';
import VerticalTabs from 'uikit/VerticalTabs';
import { Entity, EntityType } from './types';

const DayCount = ({ days }: { days: number }) => (
  <div
    css={css`
      height: 46px;
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
      {days}
    </Typography>
  </div>
);

type TimeLineItemProps = {
  id: string;
  description: string;
  type: string;
  onClick?: () => void;
  disabled?: boolean;
  active: boolean;
};

const TimelineItem = ({ id, description, type, active, onClick, disabled }: TimeLineItemProps) => {
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);
  const { backgroundColor, borderColor } = timelineStyles[type];

  return (
    <div
      onClick={() => !disabled && onClick()}
      css={css`
        height: 46px;
        display: flex;
        align-items: center;
        width: 100%;
        ${active
          ? css`
              border: 1px solid ${borderColor};
              margin: -1px;
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
        <div>
          <Typography variant="caption" as="div">
            {id}
          </Typography>
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
        </div>
      </VerticalTabs.Item>
    </div>
  );
};

const Timeline = ({
  entities,
  onClickTab,
}: {
  entities: Array<Entity>;
  onClickTab: (number) => void;
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
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
          border: 1px solid grey;
          width: 350px;
        `}
      >
        {entities.map(({ id, description, type }, i) => (
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <TimelineItem
              type={type}
              id={id}
              description={description}
              disabled={type === EntityType.DECEASED}
              active={activeTab === i}
              onClick={() => {
                setActiveTab(i);
                onClickTab(i);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
