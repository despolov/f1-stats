const getStyles = () => ({
  mainContainer: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column wrap',
    flexGrow: 1,
    minHeight: '100vh',
    maxWidth: '100%',
    backgroundColor: '#f7f4f1',
    letterSpacing: '0.7px',
  },
  childrenContainer: {
    padding: '40px',
  },
  childrenContainerMobile: {
    padding: '0',
  },
});

export default getStyles;
