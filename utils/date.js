import { DAYS } from './constants';

const NOW = new Date();

export const DAY = DAYS[NOW.getDay()];
export const MONTH = NOW.toLocaleString('default', { month: 'long' });
export const DATE = NOW.getDate();
