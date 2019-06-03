import { storiesOf } from '@storybook/react';
import React from 'react';
import { select } from '@storybook/addon-knobs';
import { Container, Row, Col } from 'react-grid-system';
import defaultTheme from '../theme/defaultTheme';

import Typography from '../Typography';
import icons from './icons';
import Icon from '.';

const createKnobs = () => {
  const fill = select('fill', [null, '#00f', ...Object.keys(defaultTheme.colors)], null);
  return {
    fill,
  };
};

const IconStories = storiesOf(`${__dirname}`, module)
  .add('Icons', () => {
    const name = select('name', Object.keys(icons), 'spinner');
    const { fill } = createKnobs();
    return (
      <div>
        <Icon name={name} fill={fill} />
      </div>
    );
  })
  .add('list', () => {
    const { fill } = createKnobs();
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
            <Icon name={iconName} fill={fill} />
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
