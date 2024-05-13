import moment from 'moment';

export const DEFAULT_DATE_FORMAT = 'MMM DD, YYYY, HH:mm';
const DEFAULT_DATE_FORMAT_WITHOUT_TIME = 'MMM DD, YYYY';
export function formatDate(
  date: string,
  {
    hideTime,
  }: {
    hideTime: boolean;
  } = {
    hideTime: false,
  },
) {
  const result = moment(date)
    .utc()
    .format(hideTime ? DEFAULT_DATE_FORMAT_WITHOUT_TIME : DEFAULT_DATE_FORMAT);
  return result;
}

export function getSecondsDiffBetweenDates(from: string, to: string) {
  return moment(to).diff(moment(from), 'seconds');
}

export function stringifiedDateToTimestamp(date: string) {
  return moment(date).valueOf();
}

export function getLatestDate(dates: string[]) {
  return dates.reduce((latestDate, date) => {
    return moment(date).isAfter(latestDate) ? date : latestDate;
  }, dates[0]);
}
