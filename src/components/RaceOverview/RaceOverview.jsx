import React, { useMemo, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';
import { ColorModeContext } from '../ColorMode';
import getStyles from './RaceOverview.styles';
import { useTheme } from '@mui/material/styles';

const RaceOverview = ({ positions, allDriverData }) => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const styles = getStyles(mode);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const processedData = useMemo(() => {
    if (!positions || positions.length === 0 || !allDriverData)
      return { series: [], xAxisData: [] };

    // Group positions by driver
    const driverPositions = {};
    const allTimePoints = new Set();

    positions.forEach((pos) => {
      if (!driverPositions[pos.driver_number]) {
        driverPositions[pos.driver_number] = [];
      }
      driverPositions[pos.driver_number].push({
        time: moment(pos.date).format('HH:mm:ss'),
        timestamp: new Date(pos.date).getTime(),
        position: pos.position,
      });
      allTimePoints.add(new Date(pos.date).getTime());
    });

    // Filter each driver's positions to only include position changes
    Object.keys(driverPositions).forEach((driverNumber) => {
      const positions = driverPositions[driverNumber];
      const filteredPositions = [];

      // Always keep first position
      if (positions.length > 0) {
        filteredPositions.push(positions[0]);
      }

      // Only keep positions that are different from the previous one
      for (let i = 1; i < positions.length; i++) {
        if (positions[i].position !== positions[i - 1].position) {
          filteredPositions.push(positions[i]);
        }
      }

      // Always keep last position if it's different from the last filtered one
      if (positions.length > 1) {
        const lastPos = positions[positions.length - 1];
        const lastFilteredPos = filteredPositions[filteredPositions.length - 1];
        if (lastPos.timestamp !== lastFilteredPos.timestamp) {
          filteredPositions.push(lastPos);
        }
      }

      driverPositions[driverNumber] = filteredPositions;
    });

    // Create time axis from all unique timestamps
    const sortedTimePoints = Array.from(allTimePoints).sort((a, b) => a - b);
    const maxPoints = 200; // Increased since we're filtering more aggressively
    const samplingRate = Math.ceil(sortedTimePoints.length / maxPoints);
    const sampledTimePoints = sortedTimePoints.filter(
      (_, index) => index % samplingRate === 0,
    );

    // Create series for each driver
    const series = Object.entries(driverPositions)
      .map(([driverNumber, positions]) => {
        const driver = allDriverData.find(
          (d) => d.driver_number === parseInt(driverNumber),
        );
        return {
          driverNumber,
          positions,
          driver,
          teamName: driver?.team_name || 'Unknown Team',
          driverName: driver ? driver.name_acronym : `#${driverNumber}`,
        };
      })
      .sort((a, b) => {
        // First sort by team name, then by driver number within team
        if (a.teamName !== b.teamName) {
          return a.teamName.localeCompare(b.teamName);
        }
        return parseInt(a.driverNumber) - parseInt(b.driverNumber);
      })
      .map(({ driverNumber, positions, driver, driverName }, seriesIndex) => {
        const teamColor = driver?.team_colour
          ? `#${driver.team_colour}`
          : '#000000';

        // Group drivers by team to ensure teammates get different colors
        const teamDrivers = {};
        allDriverData.forEach((driver) => {
          if (!teamDrivers[driver.team_colour]) {
            teamDrivers[driver.team_colour] = [];
          }
          teamDrivers[driver.team_colour].push(driver.driver_number);
        });

        const driverTeammates = teamDrivers[driver?.team_colour] || [];
        const isSecondDriver =
          driverTeammates.length > 1 &&
          parseInt(driverNumber) === Math.max(...driverTeammates);

        // Create a darker version for the second driver
        let finalColor = teamColor;
        if (isSecondDriver) {
          // Convert hex to RGB, then darken for second driver
          const hex = teamColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);

          // Darken the color by 40%
          const darkenFactor = 0.6;
          const newR = Math.floor(r * darkenFactor);
          const newG = Math.floor(g * darkenFactor);
          const newB = Math.floor(b * darkenFactor);

          finalColor = `rgb(${newR}, ${newG}, ${newB})`;
        }

        // Create data points for this driver based on sampled time points
        const driverDataPoints = sampledTimePoints.map((timePoint) => {
          // Find the position at or before this time point
          let currentPosition = positions[0]?.position || 20;

          for (let i = 0; i < positions.length; i++) {
            if (positions[i].timestamp <= timePoint) {
              currentPosition = positions[i].position;
            } else {
              break;
            }
          }

          return currentPosition;
        });

        return {
          data: driverDataPoints,
          label: driverName,
          color: finalColor,
          curve: 'stepAfter',
          connectNulls: false,
        };
      });

    return {
      series,
      xAxisData: sampledTimePoints.map((_, index) => index + 1),
    };
  }, [positions, allDriverData]);

  const stats = useMemo(() => {
    if (!positions || positions.length === 0) return {};

    const totalDrivers = new Set(positions.map((p) => p.driver_number)).size;
    const totalDataPoints = positions.length;
    const raceStart = positions.length > 0 ? moment(positions[0].date) : null;
    const raceEnd =
      positions.length > 0
        ? moment(positions[positions.length - 1].date)
        : null;
    const raceDuration =
      raceStart && raceEnd ? moment.duration(raceEnd.diff(raceStart)) : null;

    return {
      totalDrivers,
      totalDataPoints,
      raceDuration: raceDuration
        ? `${Math.floor(raceDuration.asHours())}h ${raceDuration.minutes()}m`
        : 'N/A',
      sampledPoints: processedData.xAxisData.length,
    };
  }, [positions, processedData]);

  if (!positions || positions.length === 0) {
    return (
      <Box sx={styles.emptyState}>
        <Typography variant="h6" sx={styles.emptyStateText}>
          No race position data available for this meeting
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography variant="h5" sx={styles.title}>
          Race Overview - All Drivers
        </Typography>

        <Typography variant="h7" sx={styles.subTitle}>
          Select a specific driver above to see detailed interval analysis
        </Typography>
      </Box>

      <Grid container spacing={3} sx={styles.statsContainer}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statCard}>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Drivers
              </Typography>
              <Typography variant="h4" sx={styles.statValue}>
                {stats.totalDrivers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statCard}>
            <CardContent>
              <Typography variant="h6" component="div">
                Race Duration
              </Typography>
              <Typography variant="h4" sx={styles.statValue}>
                {stats.raceDuration}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statCard}>
            <CardContent>
              <Typography variant="h6" component="div">
                Position Changes
              </Typography>
              <Typography variant="h4" sx={styles.statValue}>
                {stats.totalDataPoints}
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
                <Typography variant="h4" sx={styles.statValue}>
                  {stats.sampledPoints}
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                  sx={styles.statCaption}
                >
                  per driver
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={styles.chartSection}>
        <Typography variant="h6" sx={styles.chartTitle}>
          All Driver Positions Throughout the Race
        </Typography>

        <Typography variant="body2" sx={styles.helpText}>
          This chart shows position changes for all drivers throughout the race.
          Each line represents a different driver, color-coded by their team.
        </Typography>

        <Typography variant="body2" sx={styles.helpText}>
          Hover over a line to see the driver's position changes.
        </Typography>

        {!isDesktop && (
          <Typography variant="body2">
            🚧 mobile version of the chart is under construction 🚧
          </Typography>
        )}

        <Box sx={styles.chartContainer}>
          <LineChart
            xAxis={[
              {
                data: processedData.xAxisData,
                label: 'Race Progress',
                valueFormatter: (value) => `Point ${value}`,
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
            series={processedData.series.map((series) => ({
              ...series,
              yAxisKey: 'left-axis',
              highlightScope: {
                highlighted: 'series',
                faded: 'global',
              },
              showMark: false,
            }))}
            height={600}
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
    </Box>
  );
};

export default RaceOverview;
