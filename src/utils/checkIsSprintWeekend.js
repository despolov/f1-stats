const sprintWeekends = {
  2023: new Set([
    'Azerbaijan - Azerbaijan Grand Prix',
    'Austria - Austrian Grand Prix',
    'Belgium - Belgian Grand Prix',
    'Qatar - Qatar Grand Prix',
    'United States - United States Grand Prix',
    'Brazil - São Paulo Grand Prix',
  ]),
  2024: new Set([
    'China - Chinese Grand Prix',
    'United States - Miami Grand Prix',
    'Austria - Austrian Grand Prix',
    'United States - United States Grand Prix',
    'Brazil - São Paulo Grand Prix',
    'Qatar - Qatar Grand Prix',
  ]),
  2025: new Set([
    'China - Chinese Grand Prix',
    'United States - Miami Grand Prix',
    'Belgium - Belgian Grand Prix',
    'United States - United States Grand Prix',
    'Brazil - São Paulo Grand Prix',
    'Qatar - Qatar Grand Prix',
  ]),
};

const checkIsSprintWeekend = (year, country) =>
  sprintWeekends[year]?.has(country) || false;

export default checkIsSprintWeekend;
