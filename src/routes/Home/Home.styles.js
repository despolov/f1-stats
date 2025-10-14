const getStyles = () => ({
  exploreItemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 100px 80px 100px',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  },
  exploreItemsContainerMobile: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 10px 20px 10px',
    gap: '35px',
  },
  exploreItemsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default getStyles;
