const NOW = new Date();

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DAY = DAYS[NOW.getDay()];
export const MONTH = NOW.toLocaleString('default', { month: 'long' });
export const DATE = NOW.getDate();
