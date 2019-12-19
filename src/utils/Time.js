import moment from 'moment';

export function formatUnixTimeStampToString(timestamp, format) {
  return moment(timestamp * 1000).format(format);
}
