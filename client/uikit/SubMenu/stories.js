import { storiesOf } from '@storybook/react';
import React from 'react';
import SubMenu, { MenuItem } from '.';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';

const SubMenuStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <SubMenu>
    <MenuItem content="DCC Dashboard" />
    <MenuItem content="RDPCs" />
    <MenuItem content="Programs">
      <MenuItem
        content={
          <Button variant="secondary" size="sm">
            Click me!!
          </Button>
        }
      />
      <MenuItem content="BRCA-MX" />
      <MenuItem content="PACA-AU">
        <MenuItem content="Dashboard" />
        <MenuItem
          content={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              ID Registration:
              <Button variant="secondary" size="sm">
                Click me Tooo!!!
              </Button>
            </span>
          }
        />
        <MenuItem content="Clinical Submission" />
      </MenuItem>
    </MenuItem>
  </SubMenu>
));

export default SubMenuStories;
