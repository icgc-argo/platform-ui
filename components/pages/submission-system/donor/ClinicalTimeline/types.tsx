export enum EntityType {
  PRIMARY_DIAGNOSIS = 'primary_diagnosis',
  SPECIMEN = 'specimen',
  TREATMENT = 'treatment',
  FOLLOW_UP = 'follow_up',
  DECEASED = 'deceased',
}
export type Entity = { type: EntityType; id: string; description: string; interval: number };
