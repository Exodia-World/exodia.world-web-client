import * as moment from 'moment';

const startDate = (new Date('2018-7-30')).toISOString();
export const STAKING_STARTDATE = moment(startDate);
export const FIRST_INTEREST_PERIOD_END_DATE = moment(startDate).add(3, 'years');
export const FIRST_INTEREST_SECOND_INTEREST_PERIOD_BETWEEN_DATE = '2020-11-15';
export const SECOND_INTEREST_PERIOD_BETWEEN_DATE = '2022-9-15';
export const FIRST_INTEREST_PERIOD_BETWEEN_DATE = '2018-9-15';
export const BEFORE_STAKING_STARTDATE = '2016-9-15';
export const AFTER_STAKING_STARTDATE_FIRST_INTEREST_PERIOD_BETWEEN_DATE = '2017-12-12';
