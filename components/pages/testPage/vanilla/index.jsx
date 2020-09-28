import React from 'react';
import range from 'lodash/range';

export default () => {
  React.useEffect(() => {
    const initialValue = 100;
    const input = document.querySelector('#countInput');
    const listContainer = document.querySelector('#listContainer');
    const countContainer = document.querySelector('#countContainer');

    input.value = initialValue;

    const sync = () => {
      listContainer.innerHTML = range(0, input.value)
        .map(
          (num) => `
            <span id="itemSpan">
              ${num}
            </span>
          `,
        )
        .join('\n');
      countContainer.innerHTML = `there are ${input.value} things`;
    };

    sync();
    input.addEventListener('keyup', sync);
    return () => {
      input.removeEventListener('keyup', sync);
    };
  }, []);

  return (
    <main id="mainContainer">
      <style>{`
        #mainContainer {
          font-family: sans-serif; color: red;
        }
        #itemSpan {
          display: inline-block; margin-left: 10px;
        }
      `}</style>
      <input id="countInput" type="number" />
      <div id="countContainer"></div>
      <div id="listContainer"></div>
    </main>
  );
};
