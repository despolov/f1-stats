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
    padding: '40px',
    width: ' 100vw',
  },
  childrenContainerMobile: {
    padding: '0',
    width: ' 100vw',
  },
});

export default getStyles;
