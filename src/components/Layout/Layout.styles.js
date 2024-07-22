const getStyles = () => ({
  mainContainer: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column wrap',
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: '#f7f4f1',
    letterSpacing: '0.7px',
  },
  childrenContainer: {
    padding: '16px',
    width: ' 100%',
  },
  childrenContainerMobile: {
    padding: '0',
    width: ' 100%',
  },
  childrenContainerFullScreen: {
    padding: '0',
    width: ' 100%',
  },
});

export default getStyles;
