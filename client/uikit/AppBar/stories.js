import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppBar, { Logo, MenuGroup, MenuItem, Section, UserBadge } from '.';

const AppBarStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const LinkToHome = props => (
    <a style={{ cursor: 'pointer' }} {...props} onClick={() => action('fake navigate')('/')} />
  );
  const LinkToExploration = props => (
    <a {...props} onClick={() => action('fake navigate')('/exploration')} />
  );
  const LinkToAnalysis = props => (
    <a {...props} onClick={() => action('fake navigate')('/analysis')} />
  );
  const LinkToFileRepo = props => (
    <a {...props} onClick={() => action('fake navigate')('/file_repo')} />
  );
  const LinkToSubmission = props => (
    <a {...props} onClick={() => action('fake navigate')('/submission')} />
  );
  const UserBadgeDom = props => <a {...props} onClick={action('user badge clicked')} />;
  return (
    <AppBar>
      <Section>
        <Logo DomComponent={LinkToHome} />
        <MenuGroup>
          <MenuItem DomComponent={LinkToExploration}>Exploration</MenuItem>
          <MenuItem DomComponent={LinkToAnalysis}>Analysis</MenuItem>
          <MenuItem DomComponent={LinkToFileRepo} active>
            File Repository
          </MenuItem>
        </MenuGroup>
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          <MenuItem DomComponent={LinkToSubmission} active>
            Submission System
          </MenuItem>
          <MenuItem DomComponent={UserBadgeDom}>
            <UserBadge
              firstName="Harvey"
              lastName="Specter"
              title="DCC Member"
              imageUrl={
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
              }
            />
          </MenuItem>
        </MenuGroup>
      </Section>
    </AppBar>
  );
});

export default AppBarStories;
