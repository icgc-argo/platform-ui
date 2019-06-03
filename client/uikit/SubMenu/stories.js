import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';

import SubMenu from '.';
import Button from '../Button';
import Typography from '../Typography';
import readme from './readme.md';

//just a convenience component for using react hooks in storybook
const Hook = ({
  children = () => null,
  render = () => null,
  initialState,
  effect = () => {},
  watch,
}) => {
  const [state, setState] = React.useState(initialState);
  React.useEffect(effect, watch);
  return render ? render({ state, setState }) : children();
};

const SubMenuStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => (
    <SubMenu>
      <SubMenu.Item content="DCC Dashboard" selected={false} onClick={action('clicked')} />
      <SubMenu.Item content="RDPCs" selected={false} onClick={action('clicked')} />
      <SubMenu.Item content="Programs" selected>
        <SubMenu.Item
          level={1}
          selected={false}
          onClick={action('clicked')}
          content={"I'm nested in Programs but look like I'm not :D "}
        />
        <SubMenu.Item content="BRCA-MX" selected={false} onClick={action('clicked')} />
        <SubMenu.Item
          content={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              PACA-AU{' '}
              <Button onClick={() => {}} size="sm">
                Click me!! I'm not controlled
              </Button>
            </span>
          }
        >
          <Hook
            initialState={0}
            render={({ state: selectedItem, setState: setSelectedItem }) => (
              <>
                <SubMenu.Item
                  onClick={() => setSelectedItem(0)}
                  content="Dashboard"
                  selected={selectedItem === 0}
                />
                <SubMenu.Item
                  onClick={() => setSelectedItem(1)}
                  selected={selectedItem === 1}
                  content={'ID Registration'}
                />
                <SubMenu.Item
                  onClick={() => setSelectedItem(2)}
                  selected={selectedItem === 2}
                  content="Clinical Submission"
                />
              </>
            )}
          />
        </SubMenu.Item>
      </SubMenu.Item>
    </SubMenu>
  ),
  {
    info: {
      text: `${readme}`,
    },
  },
);

export default SubMenuStories;
