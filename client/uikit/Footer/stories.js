import { storiesOf } from '@storybook/react';
import React from 'react';
import Footer from '.';
import Container from '../Container';

const FooterStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => (
    <Container style={{ padding: '15px' }}>
      <Footer
        version="1.0.0"
        apiVersion="v1"
        commitHash="8e37309"
        links={[
          { displayName: 'Contact', href: '#' },
          { displayName: 'Documentation', href: '#' },
          { displayName: 'Privacy Policy', href: '#' },
          { displayName: 'Terms & Conditions', href: '#' },
          { displayName: 'Publication Policy', href: '#' },
        ]}
      />
    </Container>
  ),
  {
    info: {},
  },
);

export default FooterStories;
