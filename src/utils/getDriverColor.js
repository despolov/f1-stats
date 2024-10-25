const getDriverColor = (driver) => {
  switch (driver) {
    case 'RIC':
    case 'TSU':
    case 'LAW':
      return '#6692FF';

    case 'NOR':
    case 'PIA':
    case 'OWA':
      return '#FF8000';

    case 'ALO':
    case 'STR':
    case 'DRU':
      return '#229971';

    case 'VER':
    case 'PER':
      return '#3671C6';

    case 'RUS':
    case 'HAM':
    case 'ANT':
      return '#27F4D2';

    case 'BOT':
    case 'ZHO':
    case 'SHW':
      return '#52E252';

    case 'LEC':
    case 'SAI':
    case 'BEA':
      return '#E8002D';

    case 'ALB':
    case 'SAR':
    case 'COL':
      return '#64C4FF';

    case 'OCO':
    case 'GAS':
      return '#FF87BC';

    case 'MAG':
    case 'HUL':
      return '#B6BABD';

    default:
      return '#000000';
  }
};

export default getDriverColor;
