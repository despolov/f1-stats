import React, { useMemo, useContext } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';
import { ColorModeContext } from '../ColorMode';
import getStyles from './RaceIntervals.styles';
import { useTheme } from '@mui/material/styles';

const RaceIntervals = ({ intervals, positions, driverNumber, teamColour }) => {
  const { mode } = useContext(ColorModeContext);
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
            Positions
          </Typography>

          <Grid container spacing={3} sx={styles.statsContainer}>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Start → Finish
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
                    Best Position
                  </Typography>
                  <Typography variant="h4" sx={{ color: chartColor }}>
                    P{stats.bestPosition}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={styles.chartTitle}>
            Position Changes Over Time
          </Typography>
          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: positionXAxisData,
                  label: 'Race Progress',
                  valueFormatter: (value) => `Point ${value}`,
                },
              ]}
              yAxis={[
                {
                  reverse: true,
                  min: 1,
                  max: 20,
                },
              ]}
              series={[
                {
                  data: positionData,
                  label: 'Position',
                  color: chartColor,
                  curve: 'stepAfter',
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
        </Box>
      )}

      {optimizedChartData.length > 0 && (
        <Box sx={styles.chartSection}>
          <Typography variant="h5" sx={styles.title}>
            Intervals
          </Typography>

          <Grid container spacing={3} sx={styles.statsContainer}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={styles.statCard}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Max Gap
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
                    Min Gap
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
                    Avg Gap
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
                    Chart Points
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
                      of {stats.totalDataPoints} total
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={styles.chartTitle}>
            Gap to Race Leader Over Time
          </Typography>
          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: xAxisData,
                  label: 'Time Progress',
                  valueFormatter: (value) => `Point ${value}`,
                },
              ]}
              series={[
                {
                  data: gapToLeaderData,
                  label: 'Gap to Leader (s)',
                  color: chartColor,
                  curve: 'linear',
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>

          <Typography variant="h6" sx={styles.chartTitle}>
            Interval to Car Ahead Over Time
          </Typography>
          <Box sx={styles.chartContainer}>
            <LineChart
              xAxis={[
                {
                  data: xAxisData,
                  label: 'Time Progress',
                  valueFormatter: (value) => `Point ${value}`,
                },
              ]}
              series={[
                {
                  data: intervalData,
                  label: 'Interval (s)',
                  color: chartColor,
                  curve: 'linear',
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
