const getStyles = (mode) => ({
  container: {
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 2,
    boxShadow: 1,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    mb: 1,
  },
  titleContainerMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    gap: 1,
    mb: 1,
  },
  title: {
    fontSize: '14px',
  },
  controlsContainer: {
    justifyContent: 'space-between',
    mb: 1,
    alignItems: 'center',
    display: 'flex',
    gap: 1,
  },
  controlButtonsContainer: {
    minWidth: '156px',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '156px',
  },
  volumeSlider: {
    marginRight: '16px',
    width: 100,
  },
  openExternalButton: {
    mr: 1,
  },
  durationContainer: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  durationCurrentTime: {
    width: 40,
    lineHeight: 0,
    textAlign: 'left',
  },
  durationTime: {
    width: 40,
    lineHeight: 0,
    textAlign: 'right',
  },
  seekContainer: {
    flex: 1,
    height: 8,
    bgcolor: 'action.disabledBackground',
    borderRadius: 4,
    cursor: 'pointer',
    position: 'relative',
  },
  seek: {
    height: '100%',
    bgcolor: 'primary.main',
    borderRadius: 4,
  },
});

export default getStyles;
