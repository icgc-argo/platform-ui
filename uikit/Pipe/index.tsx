import styled from '@emotion/styled';
import defaultTheme from 'uikit/theme/defaultTheme';

const PipeContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-family: ${({ theme }) => theme.typography.paragraph.fontFamily};
  font-size: 11px;
  font-weight: bold;
  line-height: 1.27;
  letter-spacing: normal;
  text-align: center;
  width: 100%;
  padding: 5px;
  height: 14px;
`;

const PipeItem = styled<'div', { fill: keyof typeof defaultTheme.colors }>('div')`
  flex-grow: 1;
  background-color: ${({ theme, fill }) => theme.colors[fill]};
  margin-right: 1px;

  &:only-child {
    margin: 0px;
    border-radius: 10px;
  }

  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type:not(:first-of-type) {
    margin: 0px;
    border-radius: 0 10px 10px 0;
  }
`;

const Pipe: React.ComponentType<{}> & { Item: typeof PipeItem } = ({ children }) => (
  <PipeContainer>{children}</PipeContainer>
);

Pipe.Item = PipeItem;

export default Pipe;
