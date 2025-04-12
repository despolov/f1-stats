const getDriverColor = (driver) => {
  switch (driver) {
    case 'GAS':
    case 'DOO':
      return '#FF87BC';

    case 'ALO':
    case 'STR':
      return '#229971';

    case 'LEC':
    case 'HAM':
      return '#E8002D';

    case 'OCO':
    case 'BEA':
      return '#B6BABD';

    case 'BOR':
    case 'HUL':
      return '#52E252';

    case 'NOR':
    case 'PIA':
      return '#FF8000';

    case 'HAD':
    case 'LAW':
      return '#6692FF';

    case 'VER':
    case 'TSU':
      return '#3671C6';

    case 'RUS':
    case 'ANT':
      return '#27F4D2';

    case 'ALB':
    case 'SAI':
      return '#64C4FF';

    default:
      return '#000000';
  }
};

export default getDriverColor;
