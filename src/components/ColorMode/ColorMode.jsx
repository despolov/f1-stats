import React, { createContext, useState, useEffect } from 'react';
import { getIpLocation } from '../../api';
import suncalc from 'suncalc';
import moment from 'moment';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
  autoDarkModeDetected: false,
});

const ColorModeProvider = (props) => {
  const { children } = props;
  const [mode, setMode] = useState('light');
  const [autoDarkModeDetected, setAutoDarkModeDetected] = useState(false);
  const colorMode = {
    mode,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    autoDarkModeDetected,
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
    const isModeLight = sunCalc
      ? moment(today).isBetween(
          moment(sunCalc?.sunrise),
          moment(sunCalc?.sunset),
        )
      : true;

    setMode(isModeLight ? 'light' : 'dark');

    if (!isModeLight) {
      setAutoDarkModeDetected(true);
    }
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
