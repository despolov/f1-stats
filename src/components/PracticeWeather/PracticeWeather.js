import React from 'react';
import { styled } from '@mui/material';
import getStyles from './PracticeWeather.styles';
import { Box } from '@mui/material';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { GiTireTracks } from 'react-icons/gi';
import { BsCloudRainFill } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { LuWind } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import moment from 'moment';

const styles = getStyles();

const SubTitleH5 = styled('h5')(() => styles.subTitleH5);

const Container = styled('div')(() => styles.container);

const PracticeWeather = (props) => {
  const { practiceWeather } = props;

  return (
    <Container>
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
          <SubTitleH5>
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
          </SubTitleH5>
        );
      })}
    </Container>
  );
};

export default PracticeWeather;
