import jwtDecode from "jwt-decode";
import { get } from "lodash";

const PERMISSIONS = {
  READ: "READ",
  WRITE: "WRITE",
  ADMIN: "ADMIN",
  DENY: "DENY"
};
const DCC_PREFIX = "DCC_";
const RDPC_PREFIX = "RDPC_PREFIX_";
const PROGRAM_PREFIX = "PROGRAM_";
const PROGRAM_DATA_PREFIX = "PROGRAM_DATA_";

export const isValidJwt = jwt => {
  try {
    const { exp } = jwtDecode(jwt);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

export const isDccMember = egoJwt => {
  try {
    const data = jwtDecode(egoJwt);
    const permissions = get(data, "context.user.permissions", []);
    const dccPermissions = permissions.filter(p => {
      const policy = p.split(".")[0];
      return policy.indexOf(DCC_PREFIX) === 0;
    });
    const isMember =
      dccPermissions.some(p =>
        [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(
          p.split(".")[1]
        )
      ) &&
      !dccPermissions.some(p => [PERMISSIONS.DENY].includes(p.split(".")[1]));
    return isMember;
  } catch (err) {
    return false;
  }
};

export const isRdpcMember = egoJwt => {
  try {
    const data = jwtDecode(egoJwt);
    const permissions = get(data, "context.user.permissions", []);
    const rdpcPermissions = permissions.filter(p => {
      const policy = p.split(".")[0];
      return policy.indexOf(RDPC_PREFIX) === 0;
    });
    const isMember =
      rdpcPermissions.some(p =>
        [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(
          p.split(".")[1]
        )
      ) &&
      !rdpcPermissions.some(p => [PERMISSIONS.DENY].includes(p.split(".")[1]));
    return isMember;
  } catch (err) {
    return false;
  }
};

export const getAuthorizedProgramPolicies = egoJwt => {
  const data = jwtDecode(egoJwt);
  const permissions = get(data, "context.user.permissions", []);
  const programPermissions = permissions.filter(p => {
    const policy = p.split(".")[0];
    const output =
      policy.indexOf(PROGRAM_PREFIX) === 0 &&
      policy.indexOf(PROGRAM_DATA_PREFIX) !== 0;
    return output;
  });
  return programPermissions.reduce((acc, p) => {
    const permission = p.split(".")[1];
    const policy = p.split(".")[0];
    if (
      [(PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN)].includes(
        permission
      ) &&
      ![PERMISSIONS.DENY].includes(permission)
    ) {
      acc.push(policy);
    }
    return acc;
  }, []);
};
