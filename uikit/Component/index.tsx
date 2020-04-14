import React from 'react';
import Typography from 'uikit/Typography';
import Container from 'uikit/Container';
import Checkbox from 'uikit/form/Checkbox';

const TIMELINE_TYPES = {
  pd: {
    title: 'Primary Diagnosis',
    color: 'purple',
  },
  specimen: {
    title: 'Specimen',
    color: 'blue',
  },
  treatment: {
    title: 'Treatment',
    color: 'green',
  },
  followUp: {
    title: 'Follow Up',
    color: 'red',
  },
};

const mock = {
  pd: [
    {
      id: 'PRIMARY DIAGNOSIS PD1',
      description: 'Malignant neoplasm of pancreatic something something',
    },
  ],
  specimen: [
    { id: 'SPECIMEN SP0013', description: 'Normal' },
    { id: 'SPECIMEN SP0032', description: 'Tumour' },
    { id: 'SPECIMEN SP2123', description: 'Tumour' },
    { id: 'SPECIMEN SP0123', description: 'Tumour' },
  ],
  treatment: [
    { id: 'TREATMENT TR8982', description: 'Chemotherapy' },
    { id: 'TREATMENT TR8982', description: 'Ablation' },
  ],
  followUp: [
    { id: 'TREATMENT TR8982', description: 'Loco-regional progression' },
    { id: 'FOLLOW UP FO2123', description: 'Relapse' },
  ],
};

type ComponentProps = {};
const Component: React.ComponentType<ComponentProps> = () => (
  <Container>
    <div>
      <Typography variant="default">Component</Typography>
      <div>
        Show:
        {Object.keys(mock).map(type => {
          const { title, color } = TIMELINE_TYPES[type];
          console.log('title', title, 'color', color);
          return (
            <Checkbox value={title} checked onChange={x => x} aria-label={title} color={color} />
          );
        })}
      </div>
    </div>
  </Container>
);

export default Component;
