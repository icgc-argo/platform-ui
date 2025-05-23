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
 * facetPath - used for UI visibility
 * esDocumentField - used for SQON filtering
 */
export const FACET_OPTIONS: FacetPanelOptions = [
  {
    name: 'General',
    contents: [
      {
        name: 'Gender',
        facetPath: 'gender',
        esDocumentField: 'gender',
      },
      {
        name: 'Vital Status',
        facetPath: 'vital_status',
        esDocumentField: 'vital_status',
      },
      {
        name: 'Cause of Death',
        facetPath: 'cause_of_death',
        esDocumentField: 'cause_of_death',
      },
      {
        name: 'Survival Time',
        facetPath: 'survival_time',
        esDocumentField: 'survival_time',
      },

      {
        name: 'Primary Site',
        facetPath: 'primary_site',
        esDocumentField: 'primary_site',
      },
      {
        name: 'Cancer Type Code',
        facetPath: 'primary_diagnosis__cancer_type_code',
        esDocumentField: ' primary_diagnosis.cancer_type_code',
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
      },
      {
        name: 'Tumour Normal Designation',
        facetPath: 'specimens__tumour_normal_designation',
        esDocumentField: 'specimens.tumour_normal_designation',
      },
      {
        name: 'Specimen Type',
        facetPath: 'specimens__specimen_type',
        esDocumentField: 'specimens.specimen_type',
      },
      {
        name: 'Sample Type',
        facetPath: 'specimens__samples__sample_type',
        esDocumentField: 'specimens.samples.sample_type',
      },
      {
        name: 'Pathological Tumour Staging System',
        facetPath: 'specimens__pathological_tumour_staging_system',
        esDocumentField: 'specimens.pathological_tumour_staging_system',
      },
      {
        name: 'Pathological T Category',
        facetPath: 'specimens__pathological_t_category',
        esDocumentField: 'specimens.pathological_t_category',
      },
      {
        name: 'Pathological N Category',
        facetPath: 'specimens__pathological_n_category',
        esDocumentField: 'specimens.pathological_n_category',
      },
      {
        name: 'Pathological M Category',
        facetPath: 'specimens__pathological_m_category',
        esDocumentField: 'specimens.pathological_m_category',
      },
      {
        name: 'Pathological Stage Group',
        facetPath: 'specimens__pathological_stage_group',
        esDocumentField: 'specimens.pathological_m_category',
      },
      {
        name: 'Specimen Acquisition Interval',
        facetPath: 'specimens__specimen_acquisition_interval',
        esDocumentField: 'specimens.specimen_acquisition_interval',
      },
      {
        name: 'Tumour Histological Type',
        facetPath: 'specimens__tumour_histological_type',
        esDocumentField: 'specimens.tumour_histological_type',
      },
      {
        name: 'Specimen Anatomic Location',
        facetPath: 'specimens__specimen_anatomic_location',
        esDocumentField: 'specimens.specimen_anatomic_location',
      },
      {
        name: 'Reference Pathology Confirmed',
        facetPath: 'specimens__reference_pathology_confirmed',
        esDocumentField: 'specimens.reference_pathology_confirmed',
      },
      {
        name: 'Tumour Grading System',
        facetPath: 'specimens__tumour_grading_system',
        esDocumentField: 'specimens.tumour_grading_system',
      },
      {
        name: 'Tumour Grade',
        facetPath: 'specimens__tumour_grade',
        esDocumentField: 'specimens.tumour_grade',
      },
      {
        name: 'Percent Tumour Cells',
        facetPath: 'specimens__percent_tumour_cells',
        esDocumentField: 'specimens.percent_tumour_cells',
      },
      {
        name: 'Percent Tumour Cells Measurement Method',
        facetPath: 'specimens__percent_tumour_cells_measurement_method',
        esDocumentField: 'specimens.percent_tumour_cells_measurement_method',
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
      },
      {
        name: 'Clinical Tumour Staging System',
        facetPath: 'primary_diagnosis__clinical_tumour_staging_system',
        esDocumentField: 'primary_diagnosis.clinical_tumour_staging_system',
      },
      {
        name: 'Clinical N Category',
        facetPath: 'primary_diagnosis__clinical_n_category',
        esDocumentField: 'primary_diagnosis.clinical_n_category',
      },
      {
        name: 'Clinical M Category',
        facetPath: 'primary_diagnosis__clinical_m_category',
        esDocumentField: 'primary_diagnosis.clinical_m_category',
      },
      {
        name: 'Clinical T Category',
        facetPath: 'primary_diagnosis__clinical_t_category',
        esDocumentField: 'primary_diagnosis.clinical_t_category',
      },
      {
        name: 'Clinical Stage Group',
        facetPath: 'primary_diagnosis__clinical_stage_group',
        esDocumentField: 'primary_diagnosis.clinical_stage_group',
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
      },
      {
        name: 'Is Primary Treatment',
        facetPath: 'treatments__is_primary_treatment',
        esDocumentField: 'treatments.is_primary_treatment',
      },
      {
        name: 'Treatment Intent',
        facetPath: 'treatments__treatment_intent',
        esDocumentField: 'treatments.treatment_intent',
      },
      {
        name: 'Treatment Setting',
        facetPath: 'treatments__treatment_setting',
        esDocumentField: 'treatments.treatment_setting',
      },
      {
        name: 'Response To Treatment Criteria Method',
        facetPath: 'treatments__response_to_treatment_criteria_method',
        esDocumentField: 'treatments.response_to_treatment_criteria_method',
      },
      {
        name: 'Response To Treatment',
        facetPath: 'treatments__response_to_treatment',
        esDocumentField: 'treatments.response_to_treatment',
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
      },
      {
        name: 'Disease Status at Followup',
        facetPath: 'follow_ups__disease_status_at_followup',
        esDocumentField: 'follow_ups.disease_status_at_followup',
      },
      {
        name: 'Relapse Type',
        facetPath: 'follow_ups__relapse_type',
        esDocumentField: 'follow_ups.relapse_type',
      },
      {
        name: 'Relapse Interval',
        facetPath: 'follow_ups__relapse_interval',
        esDocumentField: 'follow_ups.relapse_interval',
      },
      ,
      {
        name: 'Method of Progression Status',
        facetPath: 'follow_ups__method_of_progression_status',
        esDocumentField: 'follow_ups.method_of_progression_status',
      },
      ,
      {
        name: 'Atatomic Site Progression or Recurrences',
        facetPath: 'follow_ups__anatomic_site_progression_or_recurrences',
        esDocumentField: 'follow_ups.anatomic_site_progression_or_recurrences',
      },
    ],
  },
];
