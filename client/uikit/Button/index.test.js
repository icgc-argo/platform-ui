import Button from '.';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import defaultTheme from '../theme/defaultTheme';
import ThemeProvider from '../ThemeProvider';

describe('Button', () => {
  it('Render button correctly', () => {
    const wrapper = shallow(
      <ThemeProvider>
        <Button onClick={() => {}}>SomeButton</Button>
      </ThemeProvider>,
    );
    expect(wrapper.contains('SomeButton'));
  });
});
