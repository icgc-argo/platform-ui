import { css, Input } from '@icgc-argo/uikit';
import { ArrowToggle, commonStyle } from './common';

const filtersSearchBoxStyles = {
  folder: css({
    h2: { margin: 0, fontSize: '16px', fontWeight: 400 },
  }),
};

export const FiltersSearchBox = ({ title, onClick, isExpanded }) => {
  return (
    <div css={css([css({ height: '100px', margin: '10px 8px 8px 8px' })])}>
      <div css={css([commonStyle.header, filtersSearchBoxStyles.folder])}>
        <h2>{title}</h2>
        <div onClick={() => onClick()}>
          Expand All <ArrowToggle isOpen={isExpanded} />
        </div>
      </div>

      <Input
        size="sm"
        aria-label="search-for-files"
        placeholder={'try searcing for a filter'}
        preset="search"
        value={'1'}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        css={css({ marginTop: '12px' })}
      />
    </div>
  );
};
