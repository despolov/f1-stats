const getStyles = (mode) => ({
  header: {
    background: mode === 'light' ? '#E10600' : '#870400',
    height: '68px',
  },
  leftGridContainer: {
    gap: '20px',
  },
  rightGridContainer: {
    justifyContent: 'end',
  },
  headerGrid: {
    padding: '0 16px 0 16px',
    height: '68px',
  },
  headerGridItem: {
    height: '68px',
    minWidth: '140px',
  },
  headerGridButtonItem: {
    height: '68px',
    alignContent: 'center',
  },
  buttonText: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 400,
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
  },
  buttonTextActive: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 700,
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
  },
  buttonActive: {
    borderBottom: `1px solid ${mode === 'light' ? '#ffffff' : '#E2E2E2'}`,
    borderRight: `1px solid ${mode === 'light' ? '#ffffff' : '#E2E2E2'}`,
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  drawerIcon: {
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
    height: '28px',
    width: '28px',
  },
  drawerListContainer: {
    width: 250,
    background: mode === 'light' ? '#E10600' : '#870400',
    height: '100%',
  },
  drawerList: {
    margin: 0,
    padding: 0,
  },
  iconContainer: {
    height: '68px',
    alignContent: 'center',
  },
  icon: {
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
    width: '26px',
    height: '26px',

    '&:hover': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  modeIconContainer: {
    padding: 0,
  },
  modeIconContainerWithMargin: {
    padding: 0,
    margin: '0 10px 0 0',
    minWidth: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    padding: '8px',
  },
  modeIconContainerMobile: {
    padding: 0,
    margin: '0 10px 0 0',
  },
  headerGridButtonsItem: {
    justifyContent: 'end',
    display: 'flex',
    alignItems: 'center',
  },
  countryIcon: {
    width: '20px',
    height: '20px',
  },
  countryIconWithMargin: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  modeIconLanguageContainerMobile: {
    padding: 0,
    margin: '0 10px 0 0',
    minWidth: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
});

export default getStyles;
