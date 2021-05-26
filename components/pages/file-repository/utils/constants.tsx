import { css } from 'uikit';
import { FileCentricDocumentField, FileRepositoryTSVColumn } from '../types';

export const tooltipContent: { [key: string]: React.ReactNode } = {
  'Release Stage': (
    <div
      css={css`
        margin: 5px;
      `}
    >
      Indicates what stage a file is in during the release cycle:
      <ul
        css={css`
          padding-left: 14px;
          margin: 0;
        `}
      >
        <li>A file is first accessible to its program members.</li>
        <li>After 12 months: accessible to full membership programs. </li>
        <li>After 6 months: accessible to associate membership programs. </li>
        <li>After 6 months: queued for public release (~ every 4 months).</li>
      </ul>
    </div>
  ),
};

enum ReleaseStageDisplayNames {
  OWN_PROGRAM = 'My Program Access',
  FULL_PROGRAMS = 'Full Member Access',
  ASSOCIATE_PROGRAMS = 'Associate Member Access',
  PUBLIC_QUEUE = 'Queued for Release',
  PUBLIC = 'Released to the Public',
}

// enums are real objects at runtime
export const facetDisplayNames: { [key: string]: {} } = {
  [FileCentricDocumentField.release_stage]: ReleaseStageDisplayNames,
};

export const fileRepoTableTSVColumns: FileRepositoryTSVColumn[] = [
  // 'getter' is used as the path in a lodash get()
  // when platform-api receives the request for a TSV
  {
    header: 'Object ID',
    getter: 'object_id',
  },
  {
    // an analysis in song can have multiple donors,
    // but that's not a use case in argo, so
    // use the first donor
    header: 'Donor ID',
    getter: 'donors[0].donor_id',
  },
  {
    // an analysis in song can have multiple donors,
    // but that's not a use case in argo, so
    // use the first donor
    header: 'Submitter Donor ID',
    getter: 'donors[0].submitter_donor_id',
  },
  {
    header: 'Program ID',
    getter: 'study_id',
  },
  {
    header: 'Data Type',
    getter: 'data_type',
  },
  {
    header: 'Experimental Strategy',
    getter: 'analysis.experiment.experimental_strategy',
  },
  {
    header: 'File Type',
    getter: 'file_type',
  },
  {
    header: 'Size',
    getter: 'file.size',
  },
];
