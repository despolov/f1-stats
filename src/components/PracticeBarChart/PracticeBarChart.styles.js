import { axisClasses } from '@mui/x-charts/ChartsAxis';

const getStyles = (mode) => ({
  container: {
    width: '50%',
    backgroundColor: mode === 'light' ? '#ffffff' : '#2E2E2E',
    borderRadius: '4px',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  containerMobile: {
    width: '100%',
    backgroundColor: mode === 'light' ? '#ffffff' : '#2E2E2E',
    borderRadius: '4px',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  barChart: {
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: mode === 'light' ? '#000000' : '#E2E2E2',
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: mode === 'light' ? '#000000' : '#E2E2E2',
      },
    },
  },
});

export default getStyles;
