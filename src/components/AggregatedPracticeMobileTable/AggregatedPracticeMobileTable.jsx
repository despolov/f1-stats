import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
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
import getStyles from './AggregatedPracticeMobileTable.styles';
import getDriverColor from '../../utils/getDriverColor';
import { FaCircleInfo } from 'react-icons/fa6';
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
  const intl = useIntl();
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
            <TableCell align="center" sx={styles.tableCellHeader}>
              {intl.formatMessage({ id: 'practiceTable.pos' })}
            </TableCell>

            <TableCell align="center" sx={styles.tableCellHeader}>
              {intl.formatMessage({ id: 'practiceTable.driver' })}
            </TableCell>

            <TableCell align="center" sx={styles.tableCellHeader}>
              {intl.formatMessage({ id: 'practiceTable.time' })}
            </TableCell>

            <TableCell sx={styles.emptyHeaderCell}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((value, index) => {
            const {
              driver,
              driverFullName,
              aggregatedLap,
              sector1,
              sector2,
              sector3,
              gap,
              gapToFirst,
            } = value;

            return (
              <StyledTableRow key={driver} mode={mode} styles={styles}>
                <TableCell align="center" sx={styles.tableCellBody}>
                  <Typography sx={styles.tableCellBodyText}>
                    {(index += 1)}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={styles.tableCellBody}>
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

                <TableCell align="center" sx={styles.tableCellBody}>
                  <Typography sx={styles.tableCellBodyText}>
                    {aggregatedLap
                      ? aggregatedLap
                      : intl.formatMessage({
                          id: 'practiceTable.notAvailable',
                        })}
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={styles.tableCellBody}>
                  <Tooltip
                    title={
                      <Box>
                        <Typography sx={styles.tooltipText}>
                          {driverFullName}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          {intl.formatMessage({ id: 'practiceTable.sec1' })}:{' '}
                          {sector1.duration}{' '}
                          {intl.formatMessage({ id: 'practiceTable.inLap' })}{' '}
                          {sector1.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          {intl.formatMessage({ id: 'practiceTable.sec2' })}:{' '}
                          {sector2.duration}{' '}
                          {intl.formatMessage({ id: 'practiceTable.inLap' })}{' '}
                          {sector2.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          {intl.formatMessage({ id: 'practiceTable.sec3' })}:{' '}
                          {sector3.duration}{' '}
                          {intl.formatMessage({ id: 'practiceTable.inLap' })}{' '}
                          {sector3.lapNumber}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          {intl.formatMessage({ id: 'practiceTable.gap' })}:{' '}
                          {gap ? `+${gap}s` : ''}
                        </Typography>

                        <Typography sx={styles.tooltipText}>
                          {intl.formatMessage({
                            id: 'practiceTable.gapToFirst',
                          })}
                          : {gapToFirst ? `+${gapToFirst}s` : ''}
                        </Typography>
                      </Box>
                    }
                    placement="top"
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
