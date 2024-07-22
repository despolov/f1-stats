import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import getStyles from './HomeExploreItem.styles';
import { IconContext } from 'react-icons';

const styles = getStyles();

const HomeExploreItem = (props) => {
  const { title, icon, description, onClick } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      onClick={onClick}
      sx={isDesktop ? styles.container : styles.containerMobile}
    >
      <Typography sx={styles.title}>
        <IconContext.Provider value={{ style: styles.icon }}>
          {icon}
        </IconContext.Provider>
        {title}
      </Typography>

      <Typography sx={styles.description}>{description}</Typography>
    </Box>
  );
};

export default HomeExploreItem;
