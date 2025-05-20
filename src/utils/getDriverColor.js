const getDriverColor = (driver) => {
  switch (driver) {
    case 'GAS':
    case 'DOO':
    case 'COL':
      return '#00A1E8';

    case 'ALO':
    case 'STR':
      return '#229971';

    case 'LEC':
    case 'HAM':
      return '#ED1131';

    case 'OCO':
    case 'BEA':
      return '#9C9FA2';

    case 'BOR':
    case 'HUL':
      return '#01C00E';

    case 'NOR':
    case 'PIA':
      return '#F47600';

    case 'HAD':
    case 'LAW':
      return '#6C98FF';

    case 'VER':
    case 'TSU':
      return '#4781D7';

    case 'RUS':
    case 'ANT':
      return '#00D7B6';

    case 'ALB':
    case 'SAI':
      return '#1868DB';

    default:
      return '#000000';
  }
};

export default getDriverColor;
