export default () => ({
  log: (...stuff) => console.log(...stuff),
  time: (...stuff) => console.time(...stuff),
  timeEnd: (...stuff) => console.timeEnd(...stuff),
});
