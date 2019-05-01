import jwtDecode from "jwt-decode";
import { get } from "lodash";

const PERMISSIONS = {
  READ: "READ",
  WRITE: "WRITE",
  ADMIN: "ADMIN",
  DENY: "DENY"
};
const DCC_PREFIX = "DCC_";

export const isValidJwt = jwt => {
  try {
    const { exp } = jwtDecode(jwt);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

export const isDccMember = egoJwt => {
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
};
