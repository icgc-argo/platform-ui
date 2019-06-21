import { storiesOf } from '@storybook/react';
import React from 'react';
import Tabs, { Tab } from '.';
import Typography from '../Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const SimpleTabs = React.forwardRef(() => {
  const [value, setValue] = React.useState(0);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={0} label="Item One" />
        <Tab value={1} label="Item Two" />
        <Tab value={2} label="Item Three" />
        <Tab empty style={{ flexDirection: 'row-reverse' }}>
          Children of empty tab goes here
        </Tab>
      </Tabs>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  );
});

const SimpleTabs2 = React.forwardRef(() => {
  const [value, setValue] = React.useState(0);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={0} label="Item One" />
        <Tab value={1} label="Item Two" />
        <Tab empty />
        <Tab value={2} label="Item Three" />
      </Tabs>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  );
});

const TabsStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => <SimpleTabs />)
  .add('Empty tab in middle', () => <SimpleTabs2 />);

export default TabsStories;
