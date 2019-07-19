import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from 'uikit';
import clsx from 'clsx';
import useTheme from '../utils/useTheme';

const TabsContext = React.createContext();

export const Button = styled('button')`
  ${({ theme }) => css(theme.typography.label)};
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey_2};
  background-color: transparent;
  padding: 14px 51px;
  cursor: pointer;
  user-select: none;
  outline: none;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.grey_1};
  }

  &.active {
    border-bottom-color: ${({ theme }) => theme.colors.accent1};
    color: ${({ theme }) => theme.colors.accent1_dark};
  }
`;

export function Tab({ label, value, empty, children, className, ...otherProps }) {
  const theme = useTheme();

  const { onChange, value: currentValue } = React.useContext(TabsContext);

  return empty ? (
    <Button
      className={className}
      as="div"
      css={css`
        cursor: auto;
        flex-grow: 1;
        &:hover {
          border-bottom-color: ${theme.colors.grey_2};
        }
      `}
      {...otherProps}
    >
      {children}
    </Button>
  ) : (
    <Button
      className={clsx({ active: currentValue === value }, className)}
      onClick={e => onChange(e, value)}
      {...otherProps}
    >
      {label}
    </Button>
  );
}

const Container = styled('div')`
  display: flex;
`;

function Tabs({ value, onChange, children: childrenProp }) {
  const children = React.Children.map(childrenProp, child => {
    return React.cloneElement(child, {
      active: child.props.value == value,
    });
  });

  const context = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={context}>
      <Container>{children}</Container>
    </TabsContext.Provider>
  );
}

Tabs.propTypes = {
  /* The value of the currently selected Tab.  */
  value: PropTypes.any.isRequired,

  /* Callback fired when the value changes. */
  onChange: PropTypes.any.isRequired,

  children: PropTypes.node.isRequired,
};

export default Tabs;
