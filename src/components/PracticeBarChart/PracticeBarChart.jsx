import React, { useContext } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useIntl } from 'react-intl';
import getStyles from './PracticeBarChart.styles';
import getTeamNameColor from '../../utils/getTeamNameColor';
import { ColorModeContext } from '../ColorMode';

const PracticeBarChart = (props) => {
  const { data, title } = props;
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const intl = useIntl();
  const styles = getStyles(mode);
  const barColors = data.map((item) => getTeamNameColor(item.driverTeamName));

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <BarChart
        dataset={data}
        yAxis={[
          {
            id: 'left-axis',
            scaleType: 'band',
            dataKey: 'driver',
            colorMap: {
              type: 'ordinal',
              colors: barColors,
            },
          },
          {
            id: 'right-axis',
            scaleType: 'band',
            dataKey: 'driver',
            position: 'right',
            valueFormatter: (value) => {
              const driverData = data.find((item) => item.driver === value);

              return driverData?.gapToFirst || '';
            },
          },
        ]}
        series={[
          {
            dataKey: 'gapToFirst',
            label: title,
            valueFormatter: (v, { dataIndex }) => {
              const { gapToFirst } = data[dataIndex];

              return gapToFirst;
            },
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        height={500}
        margin={{ right: 60 }}
        rightAxis="right-axis"
        sx={() => ({
          ...styles.barChart,
          ...((!isDesktop && styles.barChartMobile) || {}),
        })}
        tooltip={{ trigger: 'none' }}
      />
    </Box>
  );
};

export default PracticeBarChart;
