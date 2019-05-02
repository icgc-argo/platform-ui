export const ENVIRONMENTS = new Proxy(
  {
    development: "development",
    production: "production"
  },
  {
    get: (obj, prop) => {
      if (obj[prop]) {
        return obj[prop];
      } else {
        const error = new Error(`${prop} is not a valid environment`);
        console.error(error);
        throw error;
      }
    }
  }
);

export const PORT = process.env.PORT || 8080;
export const API_ROOT = process.env.API_ROOT || `http://localhost:9000`;

export const EGO_API_ROOT = process.env.EGO_API_ROOT;
export const EGO_CLIENT_ID = process.env.EGO_CLIENT_ID;

export const NODE_ENV = process.env.NODE_ENV || ENVIRONMENTS.development;

/* checks for EGO_API_ROOT */
if (!EGO_API_ROOT) {
  console.warn("EGO_API must be specified");
}

/* checks for EGO_CLIENT_ID */
if (!EGO_CLIENT_ID) {
  console.warn("EGO_CLIENT_ID must be specified");
}

/* checks for NODE_ENV */
if (!process.env.NODE_ENV) {
  console.warn(`NODE_ENV not set, defaulting to ${ENVIRONMENTS.development}`);
}
if (!ENVIRONMENTS[NODE_ENV]) {
  throw new Error(`${NODE_ENV} is not a valid NODE_ENV configuration`);
}
