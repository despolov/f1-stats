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
import getStyles from './ActualPracticeMobileTable.styles';
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

const ActualPracticeMobileTable = (props) => {
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
            <TableCell sx={styles.tableCellHeader} align="center">
              Pos
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="center">
              Driver
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="center">
              Time
            </TableCell>

            <TableCell sx={styles.emptyHeaderCell}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((value, index) => {
            const {
              driver,
              lapDuration,
              sector1,
              sector2,
              sector3,
              lapNumber,
              gap,
              gapToFirst,
            } = value;

            return (
              <StyledTableRow key={driver}>
                <TableCell sx={styles.tableCellBody} align="center">
                  <Typography sx={styles.tableCellBodyText}>
                    {(index += 1)}
                  </Typography>
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="center">
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

                <TableCell sx={styles.tableCellBody} align="center">
                  <Typography sx={styles.tableCellBodyText}>
                    {lapDuration ? lapDuration : 'N/A'}
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={styles.tableCellBody}>
                  <Tooltip
                    title={
                      <Box>
                        <Typography sx={styles.tooltipText}>
                          Sec 1: {sector1} in lap {lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Sec 2: {sector2} in lap {lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Sec 3: {sector3} in lap {lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Gap: {gap ? `+${gap}s` : ''}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          Gap To #1: {gapToFirst ? `+${gapToFirst}s` : ''}
                        </Typography>
                      </Box>
                    }
                    placement="left"
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={5000}
                  >
                    <Box sx={styles.iconContainer}>
                      {lapDuration ? <FaCircleInfo /> : null}
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

export default ActualPracticeMobileTable;
