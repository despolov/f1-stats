const getStyles = () => ({
  link: {
    margin: '0 24px 0 0',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  header: {
    background: '#E10600',
    height: '68px',
  },
  headerGrid: {
    padding: '0 16px 0 16px',
    height: '68px',
  },
  headerGridItem: {
    height: '68px',
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 400,
    color: '#ffffff',
  },
  buttonTextActive: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 700,
    color: '#ffffff',
  },
  buttonActive: {
    borderBottom: '1px solid white',
    borderRight: '1px solid white',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '0',
    borderTopRightRadius: '0',
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
