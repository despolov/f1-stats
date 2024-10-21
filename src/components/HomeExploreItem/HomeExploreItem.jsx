import React, { useContext } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import getStyles from './HomeExploreItem.styles';
import { IconContext } from 'react-icons';
import { ColorModeContext } from '../ColorMode';

const HomeExploreItem = (props) => {
  const { title, icon, description, onClick } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <IconContext.Provider
        value={{ style: isDesktop ? styles.icon : styles.iconMobile }}
      >
        {icon}
      </IconContext.Provider>

      <Button onClick={onClick} sx={styles.cta}>
        {title}
      </Button>

      <Typography sx={styles.description}>{description}</Typography>
    </Box>
  );
};

export default HomeExploreItem;
