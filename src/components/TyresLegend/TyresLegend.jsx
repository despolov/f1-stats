import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './TyresLegend.styles';
import allCompoundsImg from '../../assets/icons/allCompounds.png';
import { ColorModeContext } from '../ColorMode';

const TyresLegend = (props) => {
  const { isSprintWeekend, component } = props;
  const intl = useIntl();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  if (component === 'legend') {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.titleContainer}>
          <Typography sx={styles.title}>
            {intl.formatMessage({ id: 'tyresLegend.availableTyres' })}
          </Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="SOFT" size="45" />

          <Typography sx={styles.softLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 6 : 8 },
            )}
          </Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="MEDIUM" size="45" />

          <Typography sx={styles.mediumLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <TyresCircle compound="HARD" size="45" />

          <Typography sx={styles.hardLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="INTERMEDIATE" size="45" />

          <Typography sx={styles.intermediateLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <TyresCircle compound="WET" size="45" />

          <Typography sx={styles.wetLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (component === 'inline') {
    return isDesktop ? (
      <Box sx={styles.tyresRowInline}>
        <Typography sx={styles.title}>
          {intl.formatMessage({ id: 'tyresLegend.availableTyresColon' })}
        </Typography>

        <TyresCircle compound="SOFT" size="45" />

        <Typography sx={styles.softLabel}>
          {isSprintWeekend ? '6 sets' : '8 sets'}
        </Typography>

        <TyresCircle compound="MEDIUM" size="45" />

        <Typography sx={styles.mediumLabel}>
          {isSprintWeekend ? '4 sets' : '3 sets'}
        </Typography>

        <TyresCircle compound="HARD" size="45" />

        <Typography sx={styles.hardLabel}>
          {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
        </Typography>

        <TyresCircle compound="INTERMEDIATE" size="45" />

        <Typography sx={styles.intermediateLabel}>
          {isSprintWeekend ? '4 sets' : '3 sets'}
        </Typography>

        <TyresCircle compound="WET" size="45" />

        <Typography sx={styles.wetLabel}>
          {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
        </Typography>
      </Box>
    ) : (
      <>
        <Typography sx={styles.title}>
          {intl.formatMessage({ id: 'tyresLegend.availableTyresColon' })}
        </Typography>

        <Box sx={styles.tyresRowInline}>
          <TyresCircle compound="SOFT" size="45" />

          <Typography sx={styles.softLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 6 : 8 },
            )}
          </Typography>

          <TyresCircle compound="MEDIUM" size="45" />

          <Typography sx={styles.mediumLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <TyresCircle compound="HARD" size="45" />

          <Typography sx={styles.hardLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>

          <TyresCircle compound="INTERMEDIATE" size="45" />

          <Typography sx={styles.intermediateLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <TyresCircle compound="WET" size="45" />

          <Typography sx={styles.wetLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>
        </Box>
      </>
    );
  }

  if (component === 'image') {
    return isDesktop ? (
      <Box sx={styles.containerImage}>
        <Typography sx={styles.title}>
          {intl.formatMessage({ id: 'tyresLegend.availableTyres' })}
        </Typography>

        <Box
          component="img"
          src={allCompoundsImg}
          alt="allTyres"
          style={{
            ...styles.allTyresImg,
            width: `600px`,
            height: '180px',
          }}
        />

        <Box sx={styles.labelsContainerImage}>
          <Typography sx={styles.hardLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>

          <Typography sx={styles.mediumLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <Typography sx={styles.softLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 6 : 8 },
            )}
          </Typography>

          <Typography sx={styles.intermediateLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <Typography sx={styles.wetLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box sx={styles.containerImageMobile}>
        <Typography sx={styles.title}>
          {intl.formatMessage({ id: 'tyresLegend.availableTyres' })}
        </Typography>

        <Box
          component="img"
          src={allCompoundsImg}
          alt="allTyres"
          sx={{
            ...styles.allTyresImg,
            width: `${window.innerWidth - 16}px`,
            height: '100px',
          }}
        />

        <Box sx={styles.labelsContainerImageMobile}>
          <Typography sx={styles.hardLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>

          <Typography sx={styles.mediumLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <Typography sx={styles.softLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 6 : 8 },
            )}
          </Typography>

          <Typography sx={styles.intermediateLabel}>
            {intl.formatMessage(
              { id: 'tyresLegend.sets' },
              { count: isSprintWeekend ? 4 : 3 },
            )}
          </Typography>

          <Typography sx={styles.wetLabel}>
            {intl.formatMessage({ id: 'tyresLegend.sets' }, { count: 2 })}
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default TyresLegend;
