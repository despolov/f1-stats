const checkIsSprintWeekend = (year, country) => {
  if (year === 2023) {
    if (
      country === 'Azerbaijan - Azerbaijan Grand Prix' ||
      country === 'Austria - Austrian Grand Prix' ||
      country === 'Belgium - Belgian Grand Prix' ||
      country === 'Qatar - Qatar Grand Prix' ||
      country === 'United States - United States Grand Prix' ||
      country === 'Brazil - São Paulo Grand Prix'
    ) {
      return true;
    }
    return false;
  }

  if (year === 2024) {
    if (
      country === 'China - Chinese Grand Prix' ||
      country === 'United States - Miami Grand Prix' ||
      country === 'Austria - Austrian Grand Prix' ||
      country === 'United States - United States Grand Prix' ||
      country === 'Brazil - São Paulo Grand Prix' ||
      country === 'Qatar - Qatar Grand Prix'
    ) {
      return true;
    }
    return false;
  }

  return false;
};

export default checkIsSprintWeekend;
