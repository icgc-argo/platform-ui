type EntityType = 'primary_diagnosis' | 'specimen' | 'treatment' | 'follow_up';
type Entity = { type: EntityType; id: string; description: string };
type HeaderTypes = {
  entityCounts: { [k in EntityType]: number };
  activeEntities: Array<EntityType>;
  setFilters: (e: Array<EntityType>) => void;
};
