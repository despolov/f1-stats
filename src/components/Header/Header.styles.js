const getStyles = () => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  header: {
    background: '#E10600',
    height: '71px',
  },
  headerGrid: {
    padding: '0 16px 0 16px',
    height: 'inherit',
  },
  appLabel: {
    fontSize: '28px',
    lineHeight: '71px',
    fontWeight: 600,
    color: '#ffffff',
  },
  appLabelLogoSmall: {
    fontSize: '14px',
    lineHeight: '71px',
    fontWeight: 600,
    color: '#ffffff',
  },
  mainButton: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 400,
    color: '#ffffff',
  },
  mainButtonActive: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 600,
    color: '#000000',
  },
  buttonLink: {
    margin: '0 24px 0 0',
  },
  companyButtonLink: {
    margin: '0 34px 0 0',
  },
  logoImg: {
    height: '35px',
    width: '35px',
    position: 'absolute',
    top: '10px',
    left: '85px',
  },
  icons: {
    color: 'white',
    height: '28px',
    width: '28px',
  },
  drawerListContainer: {
    width: 250,
    background: '#E10600',
    height: '100%',
  },
  drawerList: {
    margin: 0,
    padding: 0,
  },
});

export default getStyles;
