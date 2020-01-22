import { storiesOf } from '@storybook/react';
import React from 'react';
import { text, color } from '@storybook/addon-knobs';
import ContentMenu from '.';

const ContentMenuStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const contentNames = ['Sample Registration', 'Specimen', 'Donor', 'Treatment'];
  const contents = contentNames.map((content, i) => ({
    name: content,
    disabled: i === 2 ? true : false, // set one as disabled
    contentRef: React.createRef<any>(),
  }));

  return (
    <div>
      <p>// NB: Jump to content only works on window level</p>
      <ContentMenu
        title={text('Title', 'Clinical Files')}
        contents={contents}
        color={color('Border', '#0774d3')}
      />
      <div style={{ marginTop: '20px', border: '1px solid blue' }}>
        {contents.map(({ name, contentRef }, i) => (
          <div ref={contentRef} key={i} style={{ height: '40px' }}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
});

export default ContentMenuStories;
