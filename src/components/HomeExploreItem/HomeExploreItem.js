import React from 'react';
import { Box, Typography } from '@mui/material';
import getStyles from './HomeExploreItem.styles';
import { IconContext } from 'react-icons';

const styles = getStyles();

const HomeExploreItem = (props) => {
  const { title, icon, description, onClick } = props;

  return (
    <Box onClick={onClick} sx={styles.container}>
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
