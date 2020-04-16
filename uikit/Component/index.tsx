import React from 'react';
import Typography from 'uikit/Typography';
import Container from 'uikit/Container';
import Checkbox from 'uikit/form/Checkbox';
import { css } from 'uikit';
import useTheme from '../utils/useTheme';

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

const Timeline = data => <div>Timeline</div>;

type ComponentProps = {};
const Component: React.ComponentType<ComponentProps> = () => {
  const theme = useTheme();

  const [activeEntities, setActiveEntities] = React.useState([]);

  return (
    <Container
      css={css`
        padding: 12px 14px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid ${theme.colors.grey_2};
          padding-bottom: 9px;
          margin-bottom: 15px;
        `}
      >
        <Typography variant="default">Clinical Timeline</Typography>
        <div
          css={css`
            display: flex;
            ${css(theme.typography.data as any)};
          `}
        >
          Show:
          {Object.keys(mock).map(type => {
            const { title, color } = TIMELINE_TYPES[type];

            return (
              <div
                css={css`
                  margin-left: 3px;
                  display: flex;
                `}
              >
                <Checkbox
                  value={title}
                  checked={activeEntities.includes(type)}
                  onChange={() =>
                    setActiveEntities(
                      activeEntities.includes(type)
                        ? activeEntities.filter(e => e !== type)
                        : [...activeEntities, type],
                    )
                  }
                  aria-label={title}
                  color={color}
                />
                <label
                  css={css`
                    margin-left: 8px;
                  `}
                >
                  {title}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Timeline entities={null} />
      </div>
    </Container>
  );
};

export default Component;
