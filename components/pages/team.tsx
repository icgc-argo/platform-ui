import React from 'react';
import { css } from 'uikit';
import DefaultLayout from './DefaultLayout';
import Typography from 'uikit/Typography';
import TitleBorder from 'uikit/TitleBorder';
import { ThemeColorNames } from 'uikit/theme/types';
import { Row, Col } from 'react-grid-system';
import chunk from 'lodash/chunk';

type Member = { name: string; title?: string };
type Team = { title: string; members: Array<Member>; color: keyof ThemeColorNames };

const teamData: Array<Team> = [
  {
    title: 'Leaders',
    members: [
      { name: 'Christina Yung', title: 'Director of Genome Informatics, OICR' },
      { name: 'Lincoln Stein', title: 'Head of Adaptive Oncology, OICR' },
    ],
    color: 'accent1',
  },
  {
    title: 'Bioinformatics and Data Curation',
    members: [
      { name: 'Junjun Zhang', title: 'Lead Bioinformatician' },
      { name: 'Hardeep Nahal' },
      { name: 'Linda Xiang' },
    ],
    color: 'accent3',
  },
  {
    title: 'Software Engineering',
    members: [
      { name: 'Atul Kachru', title: 'Senior Project Manager' },
      { name: 'Dusan Andric', title: 'Software Architect, Team Lead' },
      { name: 'Kim Cullion', title: 'Senior UX/UI Designer' },
      { name: 'Rosi Bajari', title: 'Senior Technical Business Analyst' },
      { name: 'Alex Lepsa' },
      { name: 'Alexis Li' },
      { name: 'Ann Catton' },
      { name: 'Bashar Allabadi' },
      { name: 'Ciaran Schutte' },
      { name: 'Henrich Feher' },
      { name: 'Jared Baker' },
      { name: 'Jaser Uddin' },
      { name: 'Jon Eubank' },
      { name: 'Kevin Hartmann' },
      { name: 'Minh Ha' },
      { name: 'Robert Tisma' },
      { name: 'Wajiha Shah' },
    ],
    color: 'accent4',
  },
  {
    title: 'Research IT',
    members: [
      { name: 'David Sutton', title: 'Director IT and Information Security Officer, OICR' },
      { name: 'Bob Gibson' },
      { name: 'Gino Yearwood' },
      { name: 'Miki Wong' },
    ],
    color: 'secondary',
  },
  {
    title: 'Alumni',
    members: [{ name: 'Aleks Pejovic' }, { name: 'Priyonto Saha' }, { name: 'Xu Deng' }],
    color: 'accent3',
  },
];

const SectionTitle = props => (
  <Typography
    css={css`
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
    `}
    variant="subtitle"
    {...props}
  />
);

export default function TeamPage() {
  return (
    <DefaultLayout>
      <div
        css={css`
          height: 140px;
          display: flex;
          align-items: center;
          background-image: url('/static/icgc-galaxy-bg.jpg');
          background-position: center;
          background-size: cover;
          margin-bottom: 36px;
          padding: 0 10vw;
        `}
      >
        <Typography variant="hero" color="white">
          {' '}
          The ICGC ARGO DCC Team
        </Typography>
      </div>

      <div
        css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          max-width: 875px;
          padding: 0 10vw;
        `}
      >
        {teamData.map(team => (
          <div>
            <SectionTitle>{team.title}</SectionTitle>
            <TitleBorder color={team.color} width="86px" />
            <Typography
              variant="paragraph"
              css={css`
                line-height: 1.71;
              `}
            >
              <Row>
                {chunk(team.members, 6).map(col => (
                  <Col sm={12} md={4}>
                    {col.map(member => (
                      <div>
                        {' '}
                        <Typography variant="paragraph2" bold>
                          {member.name}
                        </Typography>
                        {member['title'] ? `, ${member.title}` : null}
                      </div>
                    ))}
                  </Col>
                ))}
              </Row>
            </Typography>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
