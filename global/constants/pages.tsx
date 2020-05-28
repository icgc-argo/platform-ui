/*******************
 * @important
 * This file should only contain references to internal pages,
 * i.e, pages that are hosted by this app itself.
 *
 * For external pages, consider:
 * - make an environment config variable with a default, and/or
 * - create a new constant file in this directory.
 *******************/

export const LOGIN_PAGE_PATH = '/login';
export const USER_PAGE_PATH = '/user';
export const CONTACT_PAGE_PATH = '/contact';
export const PRIVACY_POLICY_PATH = '/privacy';

// submission paths
export const SUBMISSION_PATH = `/submission`;
const DCC_PATH = `${SUBMISSION_PATH}/dcc`;
export const DCC_DASHBOARD_PATH = `${DCC_PATH}/dashboard`;
export const PROGRAMS_LIST_PATH = `${SUBMISSION_PATH}/program`;
export const PROGRAM_SHORT_NAME_PATH = `[shortName]`;
export const CREATE_PROGRAM_PAGE_PATH = `${SUBMISSION_PATH}/program/create`;
export const PROGRAM_MANAGE_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/manage`;
export const PROGRAM_DASHBOARD_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/dashboard`;
export const PROGRAM_SAMPLE_REGISTRATION_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/sample-registration`;
export const PROGRAM_CLINICAL_SUBMISSION_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/clinical-submission`;
export const INVITE_ID = `[inviteId]`;
export const PROGRAM_JOIN_DETAILS_PATH = `${SUBMISSION_PATH}/program/join/details/${INVITE_ID}`;
export const PROGRAM_JOIN_LOGIN_PATH = `${SUBMISSION_PATH}/program/join/login/${INVITE_ID}`;

// rdpc path
export const RDPC_PATH = '/rdpc';

// file repository paths
export const FILE_REPOSITORY_PATH = `/repository`;

// team page
export const TEAM_PATH = '/team';
