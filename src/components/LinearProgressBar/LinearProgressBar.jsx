import React, { useContext } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import getStyles from './LinearProgressBar.styles';
import { ColorModeContext } from '../ColorMode';

const LinearProgressBar = (props) => {
  const { value, title } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const progressValue = Math.round(value);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.progressLabelContainer}>
        <Typography component="h3" sx={styles.progressTitle}>
          {title}
        </Typography>

        <Typography component="h3" sx={styles.progressValue}>
          {progressValue}%
        </Typography>
      </Box>

      <LinearProgress variant="determinate" color="secondary" value={value} />
    </Box>
  );
};

export default LinearProgressBar;
