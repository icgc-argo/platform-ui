import TitleBar from '.';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ThemeProvider from '../ThemeProvider';

describe('TitleBar', () => {
  it('Render title bar correctly', () => {
    const wrapper = shallow(
      <ThemeProvider>
        <TitleBar>
          <a href="#">link in title</a>
        </TitleBar>
      </ThemeProvider>,
    );
    expect(wrapper.contains('link in titlebar '));
  });
});
