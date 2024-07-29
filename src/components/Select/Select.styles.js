const getStyles = (mode) => ({
  select: {
    width: '100%',
    backgroundColor: mode === 'light' ? '#ffffff' : '#1E1E1E',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: mode === 'light' ? '#C4C4C4' : '#5a5a5a',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: mode === 'light' ? '#C4C4C4' : '#5a5a5a',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: mode === 'light' ? '#C4C4C4' : '#5a5a5a',
    },
    '.MuiSvgIcon-root ': {
      fill: `${mode === 'light' ? '#000000' : '#E2E2E2'} !important`,
    },
    '&.Mui-disabled': {
      color: mode === 'light' ? '#000000' : '#E2E2E2',
      WebkitTextFillColor: 'rgba(255, 255, 255, 0.38) !important', // doesnt work
      '&:hover': {
        borderColor: `${mode === 'light' ? '#C4C4C4' : '#5a5a5a'}`,
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: mode === 'light' ? '#C4C4C4' : '#5a5a5a',
      },
    },
  },
  loader: {
    marginBottom: '-3px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  selectDropdown: {
    backgroundColor: mode === 'light' ? '#ffffff' : '#2E2E2E',
    color: mode === 'light' ? '#000000' : '#ffffff',
  },
  selectDropdownMobile: {
    left: '8px !important',
    backgroundColor: mode === 'light' ? '#ffffff' : '#2E2E2E',
    color: mode === 'light' ? '#000000' : '#ffffff',
  },
  placeholder: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    '&.Mui-disabled': {
      WebkitTextFillColor: 'rgba(255, 255, 255, 0.38)', // doesnt work
    },
  },
});

export default getStyles;
