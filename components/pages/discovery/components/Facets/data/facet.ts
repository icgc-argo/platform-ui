export type Facet = { name: string; facetPath: string; esDocumentField: string };
type FacetsFolder = { folder: string; contents: Facet[] };

export const FACET_OPTIONS: FacetsFolder[] = [
  {
    folder: 'General',
    contents: [
      {
        name: 'Experimental Strategy',
        facetPath: 'analysis__experiment__experimental_strategy',
        esDocumentField: 'analysis.experiment.experimental_strategy',
      },
      { name: 'File Type', facetPath: 'file_type', esDocumentField: 'file_type' },
      { name: 'Data Category', facetPath: 'data_category', esDocumentField: 'data_category' },
      {
        name: 'Workflow Name',
        facetPath: 'analysis__workflow__workflow_name',
        esDocumentField: 'analysis.workflow.workflow_name',
      },
      { name: 'Analysis Tools', facetPath: 'analysis_tools', esDocumentField: 'analysis_tools' },
    ],
  },
  { folder: 'Demographic', contents: [] },
  { folder: 'Biospecimen', contents: [] },
  { folder: 'Diagnosis', contents: [] },
  { folder: 'Treatment', contents: [] },
  { folder: 'Assessment', contents: [] },
  { folder: 'Molecular', contents: [] },
] as const;
