import { css } from 'uikit';

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
  'Release Stage': ReleaseStageDisplayNames,
};
