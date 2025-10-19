import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BACKGROUND_COLOR_PURE_LIGHT,
  BACKGROUND_COLOR_DARK_3,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    width: '50%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
    borderRadius: '4px',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  containerMobile: {
    width: '100%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
    borderRadius: '4px',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  barChart: {
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
      },
    },
  },
});

export default getStyles;
