import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const SnackbarContext = createContext({
  showSnackbar: () => {},
  showSuccess: () => {},
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
});

const SnackbarProvider = (props) => {
  const { children } = props;
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSnackbar, setCurrentSnackbar] = useState(null);

  const processQueue = useCallback(() => {
    if (snackbarQueue.length > 0 && !open) {
      const nextSnackbar = snackbarQueue[0];

      setCurrentSnackbar(nextSnackbar);
      setSnackbarQueue((prev) => prev.slice(1));
      setOpen(true);
    }
  }, [snackbarQueue, open]);

  useEffect(() => {
    processQueue();
  }, [processQueue]);

  const showSnackbar = useCallback(
    ({
      message,
      severity = 'info',
      duration = 6000,
      anchorOrigin = { vertical: 'top', horizontal: 'center' },
    }) => {
      const newSnackbar = {
        message,
        severity,
        duration,
        anchorOrigin,
        key: new Date().getTime(),
      };

      setSnackbarQueue((prev) => [...prev, newSnackbar]);
    },
    [],
  );

  const showSuccess = useCallback(
    (message, options = {}) => {
      showSnackbar({ message, severity: 'success', ...options });
    },
    [showSnackbar],
  );

  const showError = useCallback(
    (message, options = {}) => {
      showSnackbar({ message, severity: 'error', ...options });
    },
    [showSnackbar],
  );

  const showWarning = useCallback(
    (message, options = {}) => {
      showSnackbar({ message, severity: 'warning', ...options });
    },
    [showSnackbar],
  );

  const showInfo = useCallback(
    (message, options = {}) => {
      showSnackbar({ message, severity: 'info', ...options });
    },
    [showSnackbar],
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentSnackbar(null);
  };

  const contextValue = {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}

      {currentSnackbar && (
        <Snackbar
          key={currentSnackbar.key}
          open={open}
          autoHideDuration={currentSnackbar.duration}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          anchorOrigin={currentSnackbar.anchorOrigin}
        >
          <Alert
            onClose={handleClose}
            severity={currentSnackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {currentSnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
