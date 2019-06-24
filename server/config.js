export const PORT = Number(process.env.PORT) || 9000;
export const NODE_ENV = String(process.env.NODE_ENV || 'development').toLowerCase();

// Arranger configs
export const ARRANGER_ROOT = process.env.ARRANGER_ROOT || 'http://localhost:5050';
export const ARRANGER_PROJECT_ID = process.env.ARRANGER_PROJECT_ID || 'test';

// Ego config
export const EGO_ROOT_REST = process.env.EGO_ROOT_REST || 'http://localhost:8081';
export const EGO_ROOT_GRPC = process.env.EGO_ROOT_GRPC || 'localhost:50051';
export const EGO_JWT_SECRET = process.env.EGO_JWT_SECRET;
export const EGO_APPLICATION_ID = process.env.EGO_APPLICATION_ID;
export const EGO_APPLICATION_SECRET = process.env.EGO_APPLICATION_SECRET;

export const PROGRAM_SERVICE_ROOT = process.env.PROGRAM_SERVICE_ROOT || 'localhost:50052';
