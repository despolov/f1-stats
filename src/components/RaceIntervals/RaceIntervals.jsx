import React, { useMemo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { ColorModeContext } from '../ColorMode';
import getStyles from './RaceIntervals.styles';

const RaceIntervals = ({ intervals, positions, driverNumber, teamColour }) => {
  const { mode } = useContext(ColorModeContext);
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(mode);
  const optimizedChartData = useMemo(() => {
    const rawData = intervals
      .map((interval, index) => ({
        time: moment(interval.date).format('HH:mm:ss'),
        timestamp: new Date(interval.date).getTime(),
        gapToLeader:
          interval.gap_to_leader === null
            ? 0
            : typeof interval.gap_to_leader === 'string' &&
              interval.gap_to_leader.includes('LAP')
            ? null
            : parseFloat(interval.gap_to_leader),
        intervalToNext:
          interval.interval === null
            ? 0
            : typeof interval.interval === 'string' &&
              interval.interval.includes('LAP')
            ? null
            : parseFloat(interval.interval),
        index: index + 1,
        originalIndex: index,
      }))
      .filter((item) => item.gapToLeader !== null);

    if (rawData.length === 0) return [];

    // Smart filtering: keep points with significant changes + sampling
    const filteredData = [];
    const SIGNIFICANT_GAP_CHANGE = 0.2; // seconds
    const SIGNIFICANT_INTERVAL_CHANGE = 0.1; // seconds
    const MAX_POINTS = 300; // Target maximum points for performance

    // Always keep first point
    filteredData.push(rawData[0]);

    for (let i = 1; i < rawData.length - 1; i++) {
      const current = rawData[i];
      const previous = rawData[i - 1];

      // Keep points with significant gap changes (overtakes, pit stops, etc.)
      const gapChange = Math.abs(current.gapToLeader - previous.gapToLeader);
      const intervalChange = Math.abs(
        current.intervalToNext - previous.intervalToNext,
      );

      const isSignificantChange =
        gapChange >= SIGNIFICANT_GAP_CHANGE ||
        intervalChange >= SIGNIFICANT_INTERVAL_CHANGE;

      if (isSignificantChange) {
        filteredData.push(current);
      }
    }

    // Always keep last point
    if (rawData.length > 1) {
      filteredData.push(rawData[rawData.length - 1]);
    }

    // If still too many points, apply sampling
    if (filteredData.length > MAX_POINTS) {
      const samplingRate = Math.ceil(filteredData.length / MAX_POINTS);
      const sampledData = [];

      // Always keep first point
      sampledData.push(filteredData[0]);

      // Sample middle points
      for (
        let i = samplingRate;
        i < filteredData.length - 1;
        i += samplingRate
      ) {
        sampledData.push(filteredData[i]);
      }

      // Always keep last point
      if (filteredData.length > 1) {
        sampledData.push(filteredData[filteredData.length - 1]);
      }

      return sampledData;
    }

    return filteredData;
  }, [intervals]);
  const optimizedPositionData = useMemo(() => {
    if (!positions || positions.length === 0) return [];

    const rawData = positions
      .map((position, index) => ({
        time: moment(position.date).format('HH:mm:ss'),
        timestamp: new Date(position.date).getTime(),
        position: position.position,
        index: index + 1,
        originalIndex: index,
      }))
      .filter((item) => item.position !== null);

    if (rawData.length === 0) return [];

    // Smart filtering for position changes
    const filteredData = [];
    const SIGNIFICANT_POSITION_CHANGE = 1; // position changes
    const MAX_POINTS = 300;

    // Always keep first point
    filteredData.push(rawData[0]);

    for (let i = 1; i < rawData.length - 1; i++) {
      const current = rawData[i];
      const previous = rawData[i - 1];

      // Keep points with position changes
      const positionChange = Math.abs(current.position - previous.position);

      if (positionChange >= SIGNIFICANT_POSITION_CHANGE) {
        filteredData.push(current);
      }
    }

    // Always keep last point
    if (rawData.length > 1) {
      filteredData.push(rawData[rawData.length - 1]);
    }

    // Apply sampling if still too many points
    if (filteredData.length > MAX_POINTS) {
      const samplingRate = Math.ceil(filteredData.length / MAX_POINTS);
      const sampledData = [];

      sampledData.push(filteredData[0]);

      for (
        let i = samplingRate;
        i < filteredData.length - 1;
        i += samplingRate
      ) {
        sampledData.push(filteredData[i]);
      }

      if (filteredData.length > 1) {
        sampledData.push(filteredData[filteredData.length - 1]);
      }

      return sampledData;
    }

    return filteredData;
  }, [positions]);
  const stats = useMemo(() => {
    const validGaps = optimizedChartData.filter((d) => d.gapToLeader !== null);
    const validPositions = optimizedPositionData.filter(
      (d) => d.position !== null,
    );

    const gapStats =
      validGaps.length > 0
        ? {
            maxGap: Math.max(...validGaps.map((d) => d.gapToLeader)).toFixed(3),
            minGap: Math.min(...validGaps.map((d) => d.gapToLeader)).toFixed(3),
            avgGap: (
              validGaps.reduce((sum, d) => sum + d.gapToLeader, 0) /
              validGaps.length
            ).toFixed(3),
          }
        : {};

    const positionStats =
      validPositions.length > 0
        ? {
            startPosition: validPositions[0]?.position,
            finishPosition: validPositions[validPositions.length - 1]?.position,
            bestPosition: Math.min(...validPositions.map((d) => d.position)),
            worstPosition: Math.max(...validPositions.map((d) => d.position)),
          }
        : {};

    return {
      ...gapStats,
      ...positionStats,
      totalDataPoints: intervals.length + positions.length,
      optimizedPoints: optimizedChartData.length + optimizedPositionData.length,
    };
  }, [optimizedChartData, optimizedPositionData, intervals, positions]);

  const chartColor = teamColour
    ? `#${teamColour}`
    : mode === 'light'
    ? '#1976d2'
    : '#90caf9';

  const xAxisData = optimizedChartData.map((d) => d.index);
  const gapToLeaderData = optimizedChartData.map((d) => d.gapToLeader);
  const intervalData = optimizedChartData.map((d) => d.intervalToNext);
  const positionXAxisData = optimizedPositionData.map((d) => d.index);
  const positionData = optimizedPositionData.map((d) => d.position);

  return (
    <Box>
      {optimizedPositionData.length > 0 && (
        <Box sx={styles.chartSection}>
          <Typography variant="h5" sx={styles.title}>
            {intl.formatMessage({ id: 'raceIntervals.positions' })}
          </Typography>

          <Grid container spacing={3} sx={styles.statsContainer}>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.startFinish' })}
                  </Typography>

                  <Typography variant="h4" sx={{ color: chartColor }}>
                    P{stats.startPosition} → P{stats.finishPosition}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.bestPosition' })}
                  </Typography>

                  <Typography variant="h4" sx={{ color: chartColor }}>
                    P{stats.bestPosition}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={styles.chartTitle}>
            {intl.formatMessage({ id: 'raceIntervals.positionChanges' })}
          </Typography>

          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: positionXAxisData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.raceProgress',
                  }),
                  valueFormatter: (value) =>
                    intl.formatMessage(
                      { id: 'raceIntervals.pointLabel' },
                      { value },
                    ),
                },
              ]}
              yAxis={[
                {
                  id: 'left-axis',
                  reverse: true,
                  min: 0,
                  max: 21,
                  tickNumber: 22,
                  tickMinStep: 1,
                  valueFormatter: (value) => {
                    if (value === 0 || value === 21) return '🚦';
                    return `P${value}`;
                  },
                },
                {
                  id: 'right-axis',
                  reverse: true,
                  min: 0,
                  max: 21,
                  tickNumber: 22,
                  tickMinStep: 1,
                  position: 'right',
                  valueFormatter: (value) => {
                    if (value === 0 || value === 21) return '🏁';
                    return `P${value}`;
                  },
                },
              ]}
              series={[
                {
                  data: positionData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.positionLabel',
                  }),
                  color: chartColor,
                  curve: 'stepAfter',
                  yAxisKey: 'left-axis',
                  highlightScope: {
                    highlighted: 'series',
                    faded: 'global',
                  },
                  showMark: false,
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
              tooltip={{
                trigger: 'item',
              }}
              disableAxisListener
              slotProps={{
                mark: {
                  style: { display: 'none' },
                },
                line: {
                  style: { strokeWidth: 5 },
                },
              }}
              rightAxis="right-axis"
            />
          </Box>
        </Box>
      )}

      {optimizedChartData.length > 0 && (
        <Box sx={styles.chartSection}>
          <Typography variant="h5" sx={styles.title}>
            {intl.formatMessage({ id: 'raceIntervals.intervals' })}
          </Typography>

          <Grid container spacing={3} sx={styles.statsContainer}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.maxGap' })}
                  </Typography>

                  <Typography variant="h4" sx={{ color: chartColor }}>
                    {stats.maxGap}s
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.minGap' })}
                  </Typography>

                  <Typography variant="h4" sx={{ color: chartColor }}>
                    {stats.minGap}s
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.avgGap' })}
                  </Typography>

                  <Typography variant="h4" sx={{ color: chartColor }}>
                    {stats.avgGap}s
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {intl.formatMessage({ id: 'raceIntervals.chartPoints' })}
                  </Typography>

                  <Box sx={styles.chartPointsContainer}>
                    <Typography variant="h4" sx={{ color: chartColor }}>
                      {stats.optimizedPoints}
                    </Typography>

                    <Typography
                      variant="caption"
                      component="div"
                      sx={styles.totalDataPoints}
                    >
                      {intl.formatMessage(
                        { id: 'raceIntervals.totalDataPoints' },
                        { total: stats.totalDataPoints },
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={styles.chartTitle}>
            {intl.formatMessage({ id: 'raceIntervals.gapToLeader' })}
          </Typography>

          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: xAxisData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.timeProgress',
                  }),
                  valueFormatter: (value) =>
                    intl.formatMessage(
                      { id: 'raceIntervals.pointLabel' },
                      { value },
                    ),
                },
              ]}
              series={[
                {
                  data: gapToLeaderData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.gapToLeaderLabel',
                  }),
                  color: chartColor,
                  curve: 'linear',
                  showMark: false,
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>

          <Typography variant="h6" sx={styles.chartTitle}>
            {intl.formatMessage({ id: 'raceIntervals.intervalToNext' })}
          </Typography>

          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: xAxisData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.timeProgress',
                  }),
                  valueFormatter: (value) =>
                    intl.formatMessage(
                      { id: 'raceIntervals.pointLabel' },
                      { value },
                    ),
                },
              ]}
              series={[
                {
                  data: intervalData,
                  label: intl.formatMessage({
                    id: 'raceIntervals.intervalLabel',
                  }),
                  color: chartColor,
                  curve: 'linear',
                  showMark: false,
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RaceIntervals;
