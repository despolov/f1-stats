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
} from '@mui/material';
import getStyles from './AggregatedPracticeTable.styles';
import getDriverColor from '../../utils/getDriverColor';

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
              <StyledTableRow key={driver}>
                <TableCell sx={styles.tableCellBody} align="left">
                  {(index += 1)}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  <DriverCellContainer>
                    <Box
                      sx={[
                        { borderLeft: `5px solid ${getDriverColor(driver)}` },
                        styles.driverCellColor,
                      ]}
                    />

                    {driver}
                  </DriverCellContainer>
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
