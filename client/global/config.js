export const PORT = process.env.PORT || 8080;
export const API_ROOT = process.env.API_ROOT || `http://localhost:9000`;

export const EGO_API_ROOT = process.env.EGO_API_ROOT;
export const EGO_CLIENT_ID = process.env.EGO_CLIENT_ID;

if (!EGO_API_ROOT) {
  console.warn("EGO_API must be specified");
}
if (!EGO_CLIENT_ID) {
  console.warn("EGO_CLIENT_ID must be specified");
}
