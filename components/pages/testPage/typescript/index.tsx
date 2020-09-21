import React from 'react';

export default () => {
  React.useEffect(() => {
    const onInputChange = (e) => {
      console.log('e: ', e);
    };
    document.querySelector('#countInput').addEventListener('change', onInputChange);

    return () => {
      document.querySelector('#countInput').removeEventListener('change', onInputChange);
    };
  }, []);

  return (
    <main>
      <input id="countInput" type="number" />
      <div>there are things</div>
      <div>
        <span />
      </div>
    </main>
  );
};
