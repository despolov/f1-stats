const getTeamLogoSrc = (team) => {
  if (!team) {
    return '';
  }

  switch (team) {
    case 'Alpine': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png';
    }
    case 'Aston Martin': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png';
    }
    case 'Ferrari': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png';
    }
    case 'Haas F1 Team': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png';
    }
    case 'Kick Sauber': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png';
    }
    case 'McLaren': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png';
    }
    case 'Mercedes': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png';
    }
    case 'RB': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png';
    }
    case 'Red Bull Racing': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png';
    }
    case 'Williams': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png';
    }

    default:
      return '';
  }
};

export default getTeamLogoSrc;
