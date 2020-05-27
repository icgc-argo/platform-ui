import React from 'react';
import { css } from 'uikit';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from './DefaultLayout';
import Typography from 'uikit/Typography';
import TitleBorder from 'uikit/TitleBorder';
import { ThemeColorNames } from 'uikit/theme/types';

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
  const theme = useTheme();
  return (
    <DefaultLayout>
      <div
        css={css`
          display: flex;
          justify-content: center;
          padding: 0 20px;
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 875px;
            padding: 44px 0;
            & ul {
              padding-left: 18px;
              margin: 0;
            }
          `}
        >
          {teamData.map(team => (
            <>
              <SectionTitle>{team.title}</SectionTitle>
              <TitleBorder color={team.color} />
              <Typography>
                Any of your personal information which OICR collects via this Platform is subject to
                the OICR Privacy Policies, which is incorporated into these Terms and Conditions by
                reference.
                <br />
                <br />
                We are concerned about privacy and committed to your privacy while accessing the
                Platform and using its Content. The approach to communications on the Internet taken
                by OICR and the participants of the ICGC research projects is to respect, and
                protect your privacy rights. Our privacy policy outlines our Site information
                practices including our utilization of personal information we may learn about you
                when visiting our Site.
              </Typography>
            </>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
