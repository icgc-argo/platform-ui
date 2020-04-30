export enum EntityType {
  PRIMARY_DIAGNOSIS = 'primary_diagnosis',
  SPECIMEN = 'specimen',
  TREATMENT = 'treatment',
  FOLLOW_UP = 'follow_up',
}
export type Entity = { type: EntityType; id: string; description: string; interval: number };
export type HeaderTypes = {
  entityCounts: { [k in EntityType]: number };
  activeEntities: Array<EntityType>;
  setFilters: (e: Array<EntityType>) => void;
};
