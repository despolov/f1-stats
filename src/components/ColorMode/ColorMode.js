import React, { createContext, useState } from 'react';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

const ColorModeProvider = (props) => {
  const { children } = props;
  const [mode, setMode] = useState('light');
  const colorMode = {
    mode,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
