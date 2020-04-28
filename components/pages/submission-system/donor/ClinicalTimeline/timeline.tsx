import React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { getTimelineStyles } from './util';
import useTheme from 'uikit/utils/useTheme';
import VerticalTabs from 'uikit/VerticalTabs';

const DayCount = ({ days }) => (
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

const TimelineItem = ({ id, description, index, type, onClick, disabled }) => {
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
        ${index === 2
          ? css`
              border: 1px solid ${borderColor};
              margin: 0 -1px;
            `
          : null};
      `}
    >
      <VerticalTabs.Item
        tabStyle={{ border: borderColor, background: backgroundColor }}
        css={css`
          width: 100%;
          border: 0;
          color: black;
        `}
        active={index === 2}
      >
        <div>
          <Typography variant="caption" as="div">
            {id}
          </Typography>
          <Typography variant="data" as="div" bold>
            {description}
          </Typography>
        </div>
      </VerticalTabs.Item>
    </div>
  );
};

const Timeline = ({ entities }) => {
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
            <TimelineItem type={type} id={id} description={description} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
