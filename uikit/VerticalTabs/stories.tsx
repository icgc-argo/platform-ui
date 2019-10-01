import { storiesOf } from '@storybook/react';
import React from 'react';
import VerticalTabs from '.';
import { action } from '@storybook/addon-actions';
import Tag from 'uikit/Tag';
import { css } from 'uikit';

const VerticalTabsStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [activeItem, setActiveItem] = React.useState(0);
  const onClick = (num: number) => e => {
    setActiveItem(num);
    action('VerticalTabs.Item onClick')(e);
  };
  return (
    <div style={{ width: '50%' }}>
      <VerticalTabs>
        <VerticalTabs.Item onClick={onClick(0)} active={activeItem === 0}>
          Donor
          <VerticalTabs.Tag variant="INFO">12</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item onClick={onClick(1)} active={activeItem === 1}>
          Specimen
          <VerticalTabs.Tag variant="WARNING">23</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item onClick={onClick(2)} active={activeItem === 2}>
          Donor
          <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item onClick={onClick(3)} active={activeItem === 3}>
          Donor
          <VerticalTabs.Tag variant="SUCCESS">45</VerticalTabs.Tag>
        </VerticalTabs.Item>
        <VerticalTabs.Item onClick={onClick(4)} active={activeItem === 4}>
          Lorem ipsum dolor amet palo santo kombucha
          <VerticalTabs.Tag variant="SUCCESS">45</VerticalTabs.Tag>{' '}
        </VerticalTabs.Item>
      </VerticalTabs>
    </div>
  );
});

export default VerticalTabsStories;
