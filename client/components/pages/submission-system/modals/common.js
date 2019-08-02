// @flow
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
  role: RoleDisplayName.COLLABORATOR,
};
