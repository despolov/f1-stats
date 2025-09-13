import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useTheme, useMediaQuery, Box, Typography } from '@mui/material';

import getStyles from './SessionTeamRadio.styles';
import { ColorModeContext } from '../ColorMode';
import AudioPlayer from '../AudioPlayer';

const SessionTeamRadio = (props) => {
  const { session, title, teamColour } = props;
  const intl = useIntl();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography component="h3" sx={styles.title}>
          {title}
        </Typography>
      </Box>

      {Object.keys(session).length === 0 ? (
        <Typography component="h4" sx={styles.subTitle}>
          {intl.formatMessage({ id: 'sessionTeamRadio.noRadioAvailable' })}
        </Typography>
      ) : null}

      <Box
        sx={
          isDesktop
            ? styles.stintsGraphContainer
            : styles.stintsGraphContainerMobile
        }
      >
        {session.map((sessionStint, index) => (
          <AudioPlayer
            key={index}
            audioUrl={sessionStint.recording_url}
            audioDate={sessionStint.date}
            teamColour={teamColour}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SessionTeamRadio;
