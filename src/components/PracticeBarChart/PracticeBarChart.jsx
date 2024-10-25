import React, { useContext } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import getStyles from './PracticeBarChart.styles';
import getDriverColor from '../../utils/getDriverColor';
import { ColorModeContext } from '../ColorMode';

const PracticeBarChart = (props) => {
  const { data, title } = props;
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const styles = getStyles(mode);
  const barColors = data.map((item) => getDriverColor(item.driver));

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <BarChart
        dataset={data}
        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'driver',
            colorMap: {
              type: 'ordinal',
              colors: barColors,
            },
          },
        ]}
        series={[
          {
            dataKey: 'gapToFirst',
            label: (location) =>
              location === 'tooltip' ? 'Gap to first' : title,
            valueFormatter: (v, { dataIndex }) => {
              const { gapToFirst } = data[dataIndex];

              return gapToFirst;
            },
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        height={500}
        sx={() => styles.barChart}
      />
    </Box>
  );
};

export default PracticeBarChart;
