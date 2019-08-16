import { storiesOf } from '@storybook/react';
import React from 'react';
import Tabs, { Tab } from '.';
import Typography from '../Typography';
import { action } from '@storybook/addon-actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// forwardRef is used to display the source in storybook
const SimpleTabs = React.forwardRef(() => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    action('tab foucs changed')(event, newValue);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={0} label="Item One" />
        <Tab value={1} label="Item Two" />
        <Tab value={2} label="Item Three" />
        <Tab empty style={{ flexDirection: 'row-reverse' }}>
          <button>Child of empty tab</button>
        </Tab>
      </Tabs>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  );
});

const TabsStories = storiesOf(`${__dirname}`, module).add('Basic', () => <SimpleTabs />);

export default TabsStories;
