import yup from 'global/utils/validations';
import { firstName, lastName, email, role } from 'global/utils/form/validations';

export type RoleKey = 'ADMIN' | 'COLLABORATOR' | 'SUBMITTER';

export const RoleDisplayName: { [key in RoleKey]: string } = {
  ADMIN: 'Administrator',
  COLLABORATOR: 'Collaborator',
  SUBMITTER: 'Data Submitter',
};

export const UserModel = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};

export const userSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  role,
});
