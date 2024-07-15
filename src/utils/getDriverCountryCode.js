const getDriverCountryCode = (country) => {
  if (!country) {
    return '';
  }

  switch (country) {
    case 'MON': {
      return 'MC';
    }
    case 'GER': {
      return 'DE';
    }
    case 'CHN': {
      return 'CN';
    }
    case 'NED': {
      return 'NL';
    }
    case 'DEN': {
      return 'DK';
    }
    case 'MEX': {
      return 'MX';
    }

    default:
      return country.slice(0, 2);
  }
};

export default getDriverCountryCode;
