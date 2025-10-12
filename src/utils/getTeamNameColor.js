const getTeamNameColor = (teamName) => {
  switch (teamName) {
    case 'Alpine':
      return '#0093CC';

    case 'Aston Martin':
      return '#229971';

    case 'Ferrari':
      return '#E80020';

    case 'Haas F1 Team':
      return '#B6BABD';

    case 'Alfa Romeo':
      return '#C92D4B';

    case 'Kick Sauber':
      return '#52E252';

    case 'McLaren':
      return '#FF8000';

    case 'AlphaTauri':
      return '#5E8FAA';

    case 'RB':
    case 'Racing Bulls':
      return '#6692FF';

    case 'Red Bull Racing':
      return '#3671C6';

    case 'Mercedes':
      return '#27F4D2';

    case 'Williams':
      return '#64C4FF';

    default:
      return '#000000';
  }
};

export default getTeamNameColor;
