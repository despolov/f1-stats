import { useEffect, useContext, useRef } from 'react';
import { useIntl } from 'react-intl';
import { SnackbarContext } from './SnackbarContext';
import { ColorModeContext } from '../ColorMode';

const DarkModeNotificationTrigger = () => {
  const { showInfo } = useContext(SnackbarContext);
  const { autoDarkModeDetected } = useContext(ColorModeContext);
  const intl = useIntl();
  const hasShown = useRef(false);

  useEffect(() => {
    if (autoDarkModeDetected && !hasShown.current) {
      hasShown.current = true;
      showInfo(
        <div>
          <p>
            {intl.formatMessage({ id: 'header.darkModeNotificationFirstRow' })}
          </p>
          <p>
            {intl.formatMessage({ id: 'header.darkModeNotificationSecondRow' })}
          </p>
        </div>,
        {
          duration: 8000,
        },
      );
    }
  }, [autoDarkModeDetected, showInfo, intl]);

  return null;
};

export default DarkModeNotificationTrigger;
