const {createLogger, transports} = require('winston');
const logger = createLogger({
    level: "debug",
    transports:
    [
        new transports.Console(),
        new transports.File({'filename': 'app.log'})
    ]
});

const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getTimeStamp = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = MONTH[date_ob.getMonth()];
    let year = date_ob.getFullYear();
    date = `${date}-${month}-${year}`;
    let hour = date_ob.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min = date_ob.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let sec = date_ob.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    let time = `${hour}:${min}:${sec}`;
    return [date, time];
}

module.exports = {getTimeStamp, logger};