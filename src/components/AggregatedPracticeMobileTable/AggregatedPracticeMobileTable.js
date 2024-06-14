import React from 'react';
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
  Tooltip,
  Typography,
} from '@mui/material';
import getStyles from './AggregatedPracticeMobileTable.styles';
import getDriverColor from '../../utils/getDriverColor';
import { FaCircleInfo } from 'react-icons/fa6';

const styles = getStyles();

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': styles.tableRowOdd,
  '&:last-child td, &:last-child th': styles.tableRowLast,
}));

const TitleContainer = styled('div')(() => styles.titleContainer);

const TableTitle = styled('h5')(() => styles.tableTitle);

const DriverCellContainer = styled('div')(() => styles.driverCellContainer);

const AggregatedPracticeTable = (props) => {
  const { data, title } = props;

  return (
    <TableContainer sx={styles.tableContainer} component={Paper}>
      {title && (
        <TitleContainer>
          <TableTitle>{title}</TableTitle>
        </TitleContainer>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={styles.tableCellHeader}>
              Pos
            </TableCell>

            <TableCell align="center" sx={styles.tableCellHeader}>
              Driver
            </TableCell>

            <TableCell align="center" sx={styles.tableCellHeader}>
              Time
            </TableCell>

            <TableCell sx={styles.emptyHeaderCell}></TableCell>
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
              <StyledTableRow key={driver}>
                <TableCell align="center" sx={styles.tableCellBody}>
                  <Typography sx={styles.tableCellBodyText}>
                    {(index += 1)}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={styles.tableCellBody}>
                  <DriverCellContainer>
                    <Box
                      sx={[
                        { borderLeft: `5px solid ${getDriverColor(driver)}` },
                        styles.driverCellColor,
                      ]}
                    />

                    <Typography sx={styles.tableCellBodyText}>
                      {driver}
                    </Typography>
                  </DriverCellContainer>
                </TableCell>

                <TableCell align="center" sx={styles.tableCellBody}>
                  <Typography sx={styles.tableCellBodyText}>
                    {aggregatedLap ? aggregatedLap : 'N/A'}
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={styles.tableCellBody}>
                  <Tooltip
                    title={
                      <Box>
                        <Typography sx={styles.tooltipText}>
                          Sec 1: {sector1.duration} in lap {sector1.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Sec 2: {sector2.duration} in lap {sector2.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Sec 3: {sector3.duration} in lap {sector3.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Gap: {gap ? `+${gap}s` : ''}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Gap To #1: {gapToFirst ? `+${gapToFirst}s` : ''}
                        </Typography>
                      </Box>
                    }
                    placement="top"
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={5000}
                  >
                    <Box sx={styles.iconContainer}>
                      {aggregatedLap ? <FaCircleInfo /> : null}
                    </Box>
                  </Tooltip>
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
