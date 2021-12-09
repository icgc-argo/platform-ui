const Adapter = require('enzyme-adapter-react-16');

require('enzyme').configure({ adapter: new Adapter() });

// mock window location, replace origin jsdom location object
const oldWindowLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  );
});
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldWindowLocation;
});
