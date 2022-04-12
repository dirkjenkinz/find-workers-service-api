const { createLogger, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  transports:
    [
      new transports.Console(),
      new transports.File(
        { filename: 'app.log' },
      ),
    ],
});

const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getTimeStamp = () => {
  const ts = Date.now();
  const dateObj = new Date(ts);
  let date = dateObj.getDate();
  const month = MONTH[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  date = `${date}-${month}-${year}`;
  let hour = dateObj.getHours();
  hour = (hour < 10 ? '0' : '') + hour;
  let min = dateObj.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  let sec = dateObj.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;
  const time = `${hour}:${min}:${sec}`;
  return [date, time];
};

module.exports = { getTimeStamp, logger };
