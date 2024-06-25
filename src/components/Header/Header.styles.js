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
  mainButton: {
    fontSize: '14px',
    lineHeight: '26px',
    color: '#ffffff',
  },
  mainButtonActive: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 600,
    color: '#000000',
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
