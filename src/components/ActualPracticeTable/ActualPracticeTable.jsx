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
  Typography,
} from '@mui/material';
import getStyles from './ActualPracticeTable.styles';
import getDriverColor from '../../utils/getDriverColor';
import { ColorModeContext } from '../ColorMode';

const StyledTableRow = styled(TableRow)(({ mode, styles }) => ({
  backgroundColor: mode === 'light' ? '#ffffff' : '#626262',
  '&:nth-of-type(odd)':
    mode === 'light' ? styles.tableRowOdd : styles.tableRowOddDark,
  '&:last-child td, &:last-child th': styles.tableRowLast,
}));

const ActualPracticeTable = (props) => {
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

      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.pos' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.driver' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.sector1' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.sector2' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.sector3' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.lapNumber' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.time' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.gap' })}
            </TableCell>

            <TableCell sx={styles.tableCellHeader} align="left">
              {intl.formatMessage({ id: 'practiceTable.gapToFirst' })}
            </TableCell>
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
                  {sector1}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {sector2}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {sector3}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {lapNumber}
                </TableCell>

                <TableCell sx={styles.tableCellBody} align="left">
                  {lapDuration
                    ? lapDuration
                    : intl.formatMessage({ id: 'practiceTable.noTimeSet' })}
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

export default ActualPracticeTable;
