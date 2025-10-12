const getTeamLogoSrc = (team) => {
  if (!team) {
    return '';
  }

  switch (team) {
    case 'Alpine': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png';
    }
    case 'Aston Martin': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png';
    }
    case 'Ferrari': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png';
    }
    case 'Haas F1 Team': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png';
    }
    case 'Kick Sauber': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber-logo.png';
    }
    case 'McLaren': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png';
    }
    case 'Mercedes': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png';
    }
    case 'Racing Bulls': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls-logo.png';
    }
    case 'RB': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png';
    }
    case 'Red Bull Racing': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png';
    }
    case 'Williams': {
      return 'https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png';
    }

    default:
      return '';
  }
};

export default getTeamLogoSrc;
