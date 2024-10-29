const getRaceCountryCode = (country) => {
  if (!country) {
    return '';
  }

  switch (country) {
    case 'Bahrain': {
      return 'BH';
    }
    case 'Saudi Arabia': {
      return 'SA';
    }
    case 'Australia': {
      return 'AU';
    }
    case 'Japan': {
      return 'JP';
    }
    case 'China': {
      return 'CN';
    }
    case 'United States': {
      return 'US';
    }
    case 'Italy': {
      return 'IT';
    }
    case 'Monaco': {
      return 'MC';
    }
    case 'Canada': {
      return 'CA';
    }
    case 'Spain': {
      return 'ES';
    }
    case 'Austria': {
      return 'AT';
    }
    case 'Great Britain': {
      return 'GB';
    }
    case 'Hungary': {
      return 'HU';
    }
    case 'Belgium': {
      return 'BE';
    }
    case 'Netherlands': {
      return 'NL';
    }
    case 'Azerbaijan': {
      return 'AZ';
    }
    case 'Singapore': {
      return 'SG';
    }
    case 'Mexico': {
      return 'MX';
    }
    case 'Brazil': {
      return 'BR';
    }
    case 'Qatar': {
      return 'QA';
    }
    case 'United Arab Emirates': {
      return 'AE';
    }

    default:
      return '';
  }
};

export default getRaceCountryCode;
