//@flow
import {
  LOCAL_STORAGE_REDIRECT_KEY,
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH
} from "../constants";
import { isDccMember } from "./egoJwt";

export const getRedirectPathForUser = (egoJwt: string) => {
  if (isDccMember(egoJwt)) {
    return DCC_OVERVIEW_PATH;
  } else {
    return USER_PAGE_PATH;
  }
};
