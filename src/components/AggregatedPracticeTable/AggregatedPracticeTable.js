import React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: styles.tableCellHeader,
  [`&.${tableCellClasses.body}`]: styles.tableCellBody,
}));

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
            <StyledTableCell align="left">Pos</StyledTableCell>

            <StyledTableCell align="left">Driver</StyledTableCell>

            <StyledTableCell align="left">Sector 1</StyledTableCell>

            <StyledTableCell align="left">Sector 2</StyledTableCell>

            <StyledTableCell align="left">Sector 3</StyledTableCell>

            <StyledTableCell align="left">Time</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((value, index) => {
            const { driver, aggregatedLap, sector1, sector2, sector3 } = value;

            return (
              <StyledTableRow key={driver}>
                <StyledTableCell align="left">{(index += 1)}</StyledTableCell>

                <StyledTableCell align="left">
                  <DriverCellContainer>
                    <Box
                      sx={[
                        { borderLeft: `5px solid ${getDriverColor(driver)}` },
                        styles.driverCellColor,
                      ]}
                    />

                    {driver}
                  </DriverCellContainer>
                </StyledTableCell>

                <StyledTableCell align="left">
                  {sector1.duration
                    ? `${sector1.duration} in lap ${sector1.lapNumber}`
                    : null}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {sector2.duration
                    ? `${sector2.duration} in lap ${sector2.lapNumber} `
                    : null}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {sector3.duration
                    ? `${sector3.duration} in lap ${sector3.lapNumber}`
                    : null}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {aggregatedLap ? aggregatedLap : 'No time set'}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AggregatedPracticeTable;
