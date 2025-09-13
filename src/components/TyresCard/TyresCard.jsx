import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import getStyles from './TyresCard.styles';
import { IconContext } from 'react-icons';
import { FaCircleInfo } from 'react-icons/fa6';
import TyresCircle from '../TyresCircle';
import { ColorModeContext } from '../ColorMode';

const TyresCard = (props) => {
  const intl = useIntl();
  const {
    compound,
    tyresCount,
    practice1UsedTyres,
    practice2UsedTyres,
    practice3UsedTyres,
    sprintUsedTyres,
    qualiUsedTyres,
    totalTyresCount,
  } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <TyresCircle compound={compound} />

      <Typography>
        {intl.formatMessage({ id: 'tyresCard.used' }, { count: tyresCount })}
      </Typography>

      <Typography>
        {intl.formatMessage(
          { id: 'tyresCard.new' },
          { count: Math.max(0, totalTyresCount - tyresCount) },
        )}
      </Typography>

      <Tooltip
        title={
          <Box>
            {typeof practice1UsedTyres === 'number' ? (
              <Typography>
                {intl.formatMessage(
                  { id: 'tyresCard.practice1' },
                  { count: practice1UsedTyres },
                )}
              </Typography>
            ) : null}

            {typeof practice2UsedTyres === 'number' ? (
              <Typography>
                {intl.formatMessage(
                  { id: 'tyresCard.practice2' },
                  { count: practice2UsedTyres },
                )}
              </Typography>
            ) : null}

            {typeof practice3UsedTyres === 'number' ? (
              <Typography>
                {intl.formatMessage(
                  { id: 'tyresCard.practice3' },
                  { count: practice3UsedTyres },
                )}
              </Typography>
            ) : null}

            {typeof sprintUsedTyres === 'number' ? (
              <Typography>
                {intl.formatMessage(
                  { id: 'tyresCard.sprint' },
                  { count: sprintUsedTyres },
                )}
              </Typography>
            ) : null}

            {typeof qualiUsedTyres === 'number' ? (
              <Typography>
                {intl.formatMessage(
                  { id: 'tyresCard.qualification' },
                  { count: qualiUsedTyres },
                )}
              </Typography>
            ) : null}
          </Box>
        }
        arrow
        enterTouchDelay={0}
        leaveTouchDelay={5000}
      >
        <Box sx={styles.infoIconContainer}>
          <IconContext.Provider value={{ style: styles.icon }}>
            <FaCircleInfo />
          </IconContext.Provider>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default TyresCard;
