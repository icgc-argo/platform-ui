export type FacetData = {
  name: string;
  facetPath: string;
  esDocumentField: string;
};

export type FacetDataWithState = FacetData & {
  isExpanded: boolean;
};

type FacetFolder = { name: string; contents: FacetData[] };

export type FacetPanelOptions = FacetFolder[];

/**
 * Static facets to use in Arranger query
 */
export const FACET_OPTIONS: FacetPanelOptions = [
  {
    name: 'General',
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
  {
    name: 'Demographic',
    contents: [
      { name: 'Analysis Tools', facetPath: 'analysis_tools', esDocumentField: 'analysis_tools' },
    ],
  },
  { name: 'Biospecimen', contents: [] },
  { name: 'Diagnosis', contents: [] },
  {
    name: 'Treatment',
    contents: [
      { name: 'Analysis Tools', facetPath: 'analysis_tools', esDocumentField: 'analysis_tools' },
    ],
  },
  { name: 'Assessment', contents: [] },
  { name: 'Molecular', contents: [] },
];
