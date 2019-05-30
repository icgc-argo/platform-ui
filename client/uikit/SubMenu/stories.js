import { storiesOf } from '@storybook/react';
import React from 'react';
import SubMenu from '.';

console.log('SubMenu.Item: ', <SubMenu.Item />);
console.log('SubMenu: ', <SubMenu />);

const SubMenuStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <SubMenu>
    <SubMenu.Item>Yo</SubMenu.Item>
    <SubMenu.Item>Yo</SubMenu.Item>
  </SubMenu>
));

export default SubMenuStories;
