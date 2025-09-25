export type FacetData = {
  name: string;
  facetPath: string;
  esDocumentField: string;
  variant: 'Aggregation' | 'NumericAggregation';
};

export type FacetDataWithState = FacetData & {
  isExpanded: boolean;
};

type FacetFolder = { name: string; contents: FacetData[] };

export type FacetPanelOptions = FacetFolder[];

/**
 * Static facets to use in Arranger query
 * facetPath - used for UI visibility
 * esDocumentField - used for SQON filtering
 */
export const discoveryFacets: FacetPanelOptions = [
  {
    name: 'General',
    contents: [
      {
        name: 'Program ID',
        facetPath: 'study_id',
        variant: 'Aggregation',
        esDocumentField: 'study_id',
      },
      {
        name: 'Gender',
        facetPath: 'gender',
        esDocumentField: 'gender',
        variant: 'Aggregation',
      },
      {
        name: 'Vital Status',
        facetPath: 'vital_status',
        esDocumentField: 'vital_status',
        variant: 'Aggregation',
      },
      {
        name: 'Cause of Death',
        facetPath: 'cause_of_death',
        esDocumentField: 'cause_of_death',
        variant: 'Aggregation',
      },
      {
        name: 'Survival Time',
        facetPath: 'survival_time',
        esDocumentField: 'survival_time',
        variant: 'NumericAggregation',
      },
      {
        name: 'Primary Site',
        facetPath: 'primary_site',
        esDocumentField: 'primary_site',
        variant: 'Aggregation',
      },
      {
        name: 'Cancer Type Code',
        facetPath: 'primary_diagnosis__cancer_type_code',
        esDocumentField: 'primary_diagnosis.cancer_type_code',
        variant: 'Aggregation',
      },
    ],
  },
  {
    name: 'Biospecimen',
    contents: [
      {
        name: 'Specimen Tissue Source',
        facetPath: 'specimens__specimen_tissue_source',
        esDocumentField: 'specimens.specimen_tissue_source',
        variant: 'Aggregation',
      },
      {
        name: 'Tumour Normal Designation',
        facetPath: 'specimens__tumour_normal_designation',
        esDocumentField: 'specimens.tumour_normal_designation',
        variant: 'Aggregation',
      },
      {
        name: 'Specimen Type',
        facetPath: 'specimens__specimen_type',
        esDocumentField: 'specimens.specimen_type',
        variant: 'Aggregation',
      },
      {
        name: 'Sample Type',
        facetPath: 'specimens__samples__sample_type',
        esDocumentField: 'specimens.samples.sample_type',
        variant: 'Aggregation',
      },
      {
        name: 'Pathological Tumour Staging System',
        facetPath: 'specimens__pathological_tumour_staging_system',
        esDocumentField: 'specimens.pathological_tumour_staging_system',
        variant: 'Aggregation',
      },
      {
        name: 'Pathological T Category',
        facetPath: 'specimens__pathological_t_category',
        esDocumentField: 'specimens.pathological_t_category',
        variant: 'Aggregation',
      },
      {
        name: 'Pathological N Category',
        facetPath: 'specimens__pathological_n_category',
        esDocumentField: 'specimens.pathological_n_category',
        variant: 'Aggregation',
      },
      {
        name: 'Pathological M Category',
        facetPath: 'specimens__pathological_m_category',
        esDocumentField: 'specimens.pathological_m_category',
        variant: 'Aggregation',
      },
      {
        name: 'Pathological Stage Group',
        facetPath: 'specimens__pathological_stage_group',
        esDocumentField: 'specimens.pathological_m_category',
        variant: 'Aggregation',
      },
      {
        name: 'Specimen Acquisition Interval',
        facetPath: 'specimens__specimen_acquisition_interval',
        esDocumentField: 'specimens.specimen_acquisition_interval',
        variant: 'NumericAggregation',
      },
      {
        name: 'Tumour Histological Type',
        facetPath: 'specimens__tumour_histological_type',
        esDocumentField: 'specimens.tumour_histological_type',
        variant: 'Aggregation',
      },
      {
        name: 'Specimen Anatomic Location',
        facetPath: 'specimens__specimen_anatomic_location',
        esDocumentField: 'specimens.specimen_anatomic_location',
        variant: 'Aggregation',
      },
      {
        name: 'Reference Pathology Confirmed',
        facetPath: 'specimens__reference_pathology_confirmed',
        esDocumentField: 'specimens.reference_pathology_confirmed',
        variant: 'Aggregation',
      },
      {
        name: 'Tumour Grading System',
        facetPath: 'specimens__tumour_grading_system',
        esDocumentField: 'specimens.tumour_grading_system',
        variant: 'Aggregation',
      },
      {
        name: 'Tumour Grade',
        facetPath: 'specimens__tumour_grade',
        esDocumentField: 'specimens.tumour_grade',
        variant: 'Aggregation',
      },
      {
        name: 'Percent Tumour Cells',
        facetPath: 'specimens__percent_tumour_cells',
        esDocumentField: 'specimens.percent_tumour_cells',
        variant: 'NumericAggregation',
      },
      {
        name: 'Percent Tumour Cells Measurement Method',
        facetPath: 'specimens__percent_tumour_cells_measurement_method',
        esDocumentField: 'specimens.percent_tumour_cells_measurement_method',
        variant: 'Aggregation',
      },
    ],
  },

  {
    name: 'Diagnosis',
    contents: [
      {
        name: 'Age at Diagnosis',
        facetPath: 'primary_diagnosis__age_at_diagnosis',
        esDocumentField: 'primary_diagnosis.age_at_diagnosis',
        variant: 'NumericAggregation',
      },
      {
        name: 'Clinical Tumour Staging System',
        facetPath: 'primary_diagnosis__clinical_tumour_staging_system',
        esDocumentField: 'primary_diagnosis.clinical_tumour_staging_system',
        variant: 'Aggregation',
      },
      {
        name: 'Clinical T Category',
        facetPath: 'primary_diagnosis__clinical_t_category',
        esDocumentField: 'primary_diagnosis.clinical_t_category',
        variant: 'Aggregation',
      },
      {
        name: 'Clinical N Category',
        facetPath: 'primary_diagnosis__clinical_n_category',
        esDocumentField: 'primary_diagnosis.clinical_n_category',
        variant: 'Aggregation',
      },
      {
        name: 'Clinical M Category',
        facetPath: 'primary_diagnosis__clinical_m_category',
        esDocumentField: 'primary_diagnosis.clinical_m_category',
        variant: 'Aggregation',
      },

      {
        name: 'Clinical Stage Group',
        facetPath: 'primary_diagnosis__clinical_stage_group',
        esDocumentField: 'primary_diagnosis.clinical_stage_group',
        variant: 'Aggregation',
      },
    ],
  },
  {
    name: 'Treatment',
    contents: [
      {
        name: 'Treatment Type',
        facetPath: 'treatments__treatment_type',
        esDocumentField: 'treatments.treatment_type',
        variant: 'Aggregation',
      },
      {
        name: 'Is Primary Treatment',
        facetPath: 'treatments__is_primary_treatment',
        esDocumentField: 'treatments.is_primary_treatment',
        variant: 'Aggregation',
      },
      {
        name: 'Treatment Intent',
        facetPath: 'treatments__treatment_intent',
        esDocumentField: 'treatments.treatment_intent',
        variant: 'Aggregation',
      },
      {
        name: 'Treatment Setting',
        facetPath: 'treatments__treatment_setting',
        esDocumentField: 'treatments.treatment_setting',
        variant: 'Aggregation',
      },
      {
        name: 'Response To Treatment Criteria Method',
        facetPath: 'treatments__response_to_treatment_criteria_method',
        esDocumentField: 'treatments.response_to_treatment_criteria_method',
        variant: 'Aggregation',
      },
      {
        name: 'Response To Treatment',
        facetPath: 'treatments__response_to_treatment',
        esDocumentField: 'treatments.response_to_treatment',
        variant: 'Aggregation',
      },
    ],
  },
  {
    name: 'Assessment',
    contents: [
      {
        name: 'Interval Of Followup',
        facetPath: 'follow_ups__interval_of_followup',
        esDocumentField: 'follow_ups.interval_of_followup',
        variant: 'NumericAggregation',
      },
      {
        name: 'Disease Status at Followup',
        facetPath: 'follow_ups__disease_status_at_followup',
        esDocumentField: 'follow_ups.disease_status_at_followup',
        variant: 'Aggregation',
      },
      {
        name: 'Relapse Type',
        facetPath: 'follow_ups__relapse_type',
        esDocumentField: 'follow_ups.relapse_type',
        variant: 'NumericAggregation',
      },
      {
        name: 'Relapse Interval',
        facetPath: 'follow_ups__relapse_interval',
        esDocumentField: 'follow_ups.relapse_interval',
        variant: 'NumericAggregation',
      },
      {
        name: 'Method of Progression Status',
        facetPath: 'follow_ups__method_of_progression_status',
        esDocumentField: 'follow_ups.method_of_progression_status',
        variant: 'Aggregation',
      },
      ,
      {
        name: 'Atatomic Site Progression or Recurrences',
        facetPath: 'follow_ups__anatomic_site_progression_or_recurrence',
        esDocumentField: 'follow_ups.anatomic_site_progression_or_recurrence',
        variant: 'Aggregation',
      },
    ],
  },
  {
    name: 'Molecular',
    contents: [
      {
        name: 'Program ID',
        facetPath: 'study_id',
        variant: 'Aggregation',
        esDocumentField: 'study_id',
      },
      {
        name: 'Experimental Strategy',
        facetPath: 'analyses__experiment__experimental_strategy',
        variant: 'Aggregation',
        esDocumentField: 'analysis.experiment.experimental_strategy',
      },
      {
        name: 'Data Category',
        facetPath: 'analyses__files__data_category',
        variant: 'Aggregation',
        esDocumentField: 'analyses.files.data_category',
      },
      {
        name: 'File Type',
        facetPath: 'analyses__files__file_type',
        variant: 'Aggregation',
        esDocumentField: 'analyses.files.file_type',
      },
      {
        name: 'File Access',
        facetPath: 'analyses__file_access',
        variant: 'Aggregation',
        esDocumentField: 'analyses.file_access',
      },
      {
        name: 'Workflow Name',
        facetPath: 'analyses__workflow__workflow_name',
        variant: 'Aggregation',
        esDocumentField: 'analyses.workflow.workflow_name',
      },
      {
        name: 'Analysis Tools',
        facetPath: 'analyses__files__analysis_tools',
        variant: 'Aggregation',
        esDocumentField: 'analyses.files.analysis_tools',
      },
    ],
  },
];
