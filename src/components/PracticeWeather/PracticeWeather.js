import React from 'react';
import getStyles from './PracticeWeather.styles';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { GiTireTracks } from 'react-icons/gi';
import { BsCloudRainFill } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { LuWind } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import moment from 'moment';

const styles = getStyles();

const PracticeWeather = (props) => {
  const { practiceWeather } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      {practiceWeather.map((singlePracticeWeather) => {
        const {
          date,
          air_temperature,
          rainfall,
          track_temperature,
          wind_speed,
          humidity,
        } = singlePracticeWeather;

        return (
          <Box
            key={date}
            sx={isDesktop ? styles.subTitleH5 : styles.subTitleH5Mobile}
          >
            <IconContext.Provider value={{ style: styles.icons }}>
              <Box sx={styles.weatherValue}>
                <IoTimeOutline />
                {moment(`${date.split('.')[0]}.000Z`).format('HH:mm')}
              </Box>

              <Box sx={styles.weatherValue}>
                <FaTemperatureHalf /> {air_temperature}
              </Box>

              <Box sx={styles.weatherValue}>
                <GiTireTracks /> <FaTemperatureHalf /> {track_temperature}
              </Box>

              <Box sx={styles.weatherValue}>
                <BsCloudRainFill /> {rainfall}
              </Box>

              <Box sx={styles.weatherValue}>
                <WiHumidity /> {humidity}
              </Box>

              <Box sx={styles.weatherValue}>
                <LuWind /> {wind_speed}
              </Box>
            </IconContext.Provider>
          </Box>
        );
      })}
    </Box>
  );
};

export default PracticeWeather;
