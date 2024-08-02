import React, { createContext, useState, useEffect } from 'react';
import { getIpLocation } from '../../api';
import suncalc from 'suncalc';
import moment from 'moment';

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

  const determineColorMode = async () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const ipLocation = await getIpLocation(date);

    if (ipLocation.hasError) {
      return;
    }

    const sunCalc = suncalc.getTimes(
      today,
      ipLocation.latitude,
      ipLocation.longitude,
    );
    const isModeLight = moment(today).isBetween(
      moment(sunCalc?.sunrise),
      moment(sunCalc?.sunset),
    );

    setMode(isModeLight ? 'light' : 'dark');
  };

  useEffect(() => {
    determineColorMode();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
