import React from 'react';

// persist state between page navigations

export const PersistentContext = React.createContext({});

export function usePersistentContext() {
  return React.useContext(PersistentContext);
}

// Just like React.useState, but the state returned by this function is persistent across page refreshes
export default function usePersistState(key, defaultValue) {
  const { getItem, setItem } = usePersistentContext();
  const [persistState, setPersistState] = React.useState(getItem(key, defaultValue));

  return [
    persistState,
    val => {
      setPersistState(val);
      setItem(key, val);
    },
  ];
}
