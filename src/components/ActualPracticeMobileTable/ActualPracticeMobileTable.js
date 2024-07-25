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
  Tooltip,
  Typography,
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import getStyles from './ActualPracticeMobileTable.styles';
import getDriverColor from '../../utils/getDriverColor';
import { FaCircleInfo } from 'react-icons/fa6';
import { ColorModeContext } from '../ColorMode';

const StyledTableRow = styled(TableRow)(({ mode, styles }) => ({
  backgroundColor: mode === 'light' ? '#ffffff' : '#626262',
  '&:nth-of-type(odd)':
    mode === 'light' ? styles.tableRowOdd : styles.tableRowOddDark,
  '&:last-child td, &:last-child th': styles.tableRowLast,
}));

const ActualPracticeMobileTable = (props) => {
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
              <StyledTableRow key={driver} mode={mode} styles={styles}>
                <TableCell sx={styles.tableCellBody} align="center">
                  <Typography sx={styles.tableCellBodyText}>
                    {(index += 1)}
                  </Typography>
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="center">
                  <Box sx={styles.driverCellContainer}>
                    <Box
                      sx={[
                        { borderLeft: `5px solid ${getDriverColor(driver)}` },
                        styles.driverCellColor,
                      ]}
                    />

                    <Typography sx={styles.tableCellBodyText}>
                      {driver}
                    </Typography>
                  </Box>
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
                    slotProps={{
                      popper: {
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                            { marginBottom: '8px' },
                        },
                      },
                    }}
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
