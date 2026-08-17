import React, { createContext, useContext } from 'react';

const FontsLoadedContext = createContext(false);

export function FontsLoadedProvider({ value, children }) {
  return (
    <FontsLoadedContext.Provider value={value}>
      {children}
    </FontsLoadedContext.Provider>
  );
}

export function useFontsLoaded() {
  return useContext(FontsLoadedContext);
}
