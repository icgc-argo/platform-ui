import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from '.';
import icons from './icons';
import { select } from '@storybook/addon-knobs';

import Typography from '../Typography';
import { Container, Row, Col } from 'react-grid-system';

const IconStories = storiesOf(`${__dirname}`, module)
  .add('Icons', () => {
    const name = select('name', Object.keys(icons), 'spinner');
    return (
      <div>
        <Icon name={name} />
      </div>
    );
  })
  .add('list', () => {
    const IconDisplay = ({ iconName }) => (
      <Col md={2}>
        <div
          style={{
            borderRadius: '10px',
            height: '100%',
            boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          <Typography>{iconName}</Typography>
          <div style={{ flex: 1 }}>
            <Icon name={iconName} />
          </div>
        </div>
      </Col>
    );
    return (
      <Row nogutter>
        {Object.keys(icons).map(iconName => (
          <IconDisplay iconName={iconName} />
        ))}
      </Row>
    );
  });

export default IconStories;
