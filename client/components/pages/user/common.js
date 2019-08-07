//@flow
import * as React from 'react';
import { css, styled } from 'uikit';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';

export const Box = (props: { children: React.Node, title: React.Node }) => {
  return (
    <ContentBox
      css={css`
        width: 100%;
        box-sizing: border-box;
        padding: 24px;
        min-height: 150px;
        height: 100%;
      `}
    >
      <div>
        <Typography variant="subtitle" color="primary" component="span">
          <span
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Icon
              name="programs"
              color="primary"
              height="20px"
              width="20px"
              css={css`
                margin-right: 5px;
              `}
            />
            {props.title}
          </span>
        </Typography>
      </div>
      <Typography variant="default">{props.children}</Typography>
    </ContentBox>
  );
};
