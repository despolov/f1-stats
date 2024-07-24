const getStyles = () => ({
  header: {
    background: '#E10600',
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
  drawerIcon: {
    color: 'white',
    height: '28px',
    width: '28px',
    margin: '6px 0 0 0',
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
  iconContainer: {
    height: '68px',
    alignContent: 'center',
  },
  icon: {
    color: 'white',
    width: '26px',
    height: '26px',
  },
});

export default getStyles;
