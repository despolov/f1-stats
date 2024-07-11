const getStyles = () => ({
  parentContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  parentContainerMobile: {
    padding: '8px 8px 24px 8px',
  },
  parentContainerError: {
    textAlign: 'center',
  },
  parentContainerMobileError: {
    padding: '8px 8px 24px 8px',
  },
  errorMessage: {
    marginBottom: '20px',
  },
  progressLoader: {
    marginTop: '20px',
  },
  title: {
    margin: '0 0 10px 0',
  },
  subTitle: {
    margin: '0 0 5px 0',
  },
  divider: {
    borderBottom: '3px solid #f7f4f1',
    margin: '20px 0',
  },
  subDivider: {
    borderBottom: '1px solid #f7f4f1',
    margin: '20px 0',
  },
  goBackButton: {
    minWidth: '250px',
  },
  stintsContainer: {
    margin: '10px 0 20px 0',
    // padding: '10px 0 15px 0',
  },
  stintsGraphContainer: {
    display: 'flex',
    width: '100%',
    margin: '10px 0 0 0',
    gap: '2px',
  },
  singleStintOutterContainer: {
    // margin: '10px 0 20px 0',
    borderRadius: '50%',
    position: 'relative',
    width: '350px',
    height: '350px',
    backgroundColor: '#2F2D2B',
    textAlign: 'center',
    boxShadow: '0 0 10px #2F2D2B',
  },
  singleStintInnerContainer: {
    borderRadius: '50%',
    position: 'absolute',
    width: '280px',
    height: '280px',
    backgroundColor: '#ffffff',
    color: '#000000',
    top: '50%',
    left: '50%',
    margin: '-140px 0px 0px -140px',
    alignContent: 'center',
    boxShadow: '0 0 10px white',
  },
  singleStintTitle: {
    fontSize: '18px',
    margin: '6px 0 0 0',
  },
});

export default getStyles;
