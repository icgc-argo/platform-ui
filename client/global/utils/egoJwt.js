import jwtDecode from "jwt-decode";

export const isValidJwt = jwt => {
  try {
    const { exp } = jwtDecode(jwt);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};
