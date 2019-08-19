// @flow

import * as yup from 'yup';
import { firstName, lastName, email, role } from 'global/utils/form/validations';

export type RoleKey = 'ADMIN' | 'CURATOR' | 'COLLABORATOR' | 'SUBMITTER';

export const RoleDisplayName: { [key: RoleKey]: string } = {
  ADMIN: 'Administrator',
  CURATOR: 'Curator',
  COLLABORATOR: 'Collaborator',
  SUBMITTER: 'Submitter',
};

export const UserModel = {
  firstName: '',
  lastName: '',
  email: '',
  role: ('COLLABORATOR': RoleKey),
};

export const userSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  role,
});
