import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import getStyles from './AggregatedPracticeTable.styles';
import getDriverColor from '../../utils/getDriverColor';
import { ColorModeContext } from '../ColorMode';

const StyledTableRow = styled(TableRow)(({ mode, styles }) => ({
  backgroundColor: mode === 'light' ? '#ffffff' : '#626262',
  '&:nth-of-type(odd)':
    mode === 'light' ? styles.tableRowOdd : styles.tableRowOddDark,
  '&:last-child td, &:last-child th': styles.tableRowLast,
}));

const AggregatedPracticeTable = (props) => {
  const { data, title } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <TableContainer sx={styles.tableContainer} component={Paper}>
      {title && (
        <Box sx={styles.titleContainer}>
          <Typography component="h5" sx={styles.tableTitle}>
            {title}
          </Typography>
        </Box>
      )}

      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableCellHeader} align="left">
              Pos
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Driver
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Sector 1
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Sector 2
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Sector 3
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Time
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Gap
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              Gap To #1
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((value, index) => {
            const {
              driver,
              aggregatedLap,
              sector1,
              sector2,
              sector3,
              gap,
              gapToFirst,
            } = value;

            return (
              <StyledTableRow key={driver} mode={mode} styles={styles}>
                <TableCell sx={styles.tableCellBody} align="left">
                  {(index += 1)}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  <Box sx={styles.driverCellContainer}>
                    <Box
                      sx={[
                        { borderLeft: `5px solid ${getDriverColor(driver)}` },
                        styles.driverCellColor,
                      ]}
                    />

                    {driver}
                  </Box>
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {sector1.duration
                    ? `${sector1.duration} in lap ${sector1.lapNumber}`
                    : null}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {sector2.duration
                    ? `${sector2.duration} in lap ${sector2.lapNumber} `
                    : null}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {sector3.duration
                    ? `${sector3.duration} in lap ${sector3.lapNumber}`
                    : null}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {aggregatedLap ? aggregatedLap : 'No time set'}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {gap ? `+${gap}s` : ''}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {gapToFirst ? `+${gapToFirst}s` : ''}
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AggregatedPracticeTable;
