import React from 'react';
import Typography from '../Typography';
import { styled } from '../';

const Mail = styled('a')`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
`;

const MailTo = ({ children, link }) => (
  <Typography variant="data">
    <Mail href={`mailto:${link}`}>{children}</Mail>
  </Typography>
);

export default MailTo;
