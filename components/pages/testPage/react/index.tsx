import React from 'react';
import range from 'lodash/range';

const Item = ({ content }) => (
  <span
    style={{
      display: 'inline-block',
      marginLeft: '10px',
    }}
  >
    {content}
  </span>
);

export default () => {
  let [count, setCount] = React.useState(1000);
  const things = range(0, count);

  return (
    <div>
      <main
        style={{
          fontFamily: 'sans-serif',
          color: 'red',
        }}
      >
        <input
          type="number"
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
          value={count}
        />
        <div>there are {count} things</div>
        <div>
          {things.map((thing) => (
            <Item key={thing} content={thing} />
          ))}
        </div>
      </main>
    </div>
  );
};
